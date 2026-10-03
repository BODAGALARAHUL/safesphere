import { UserRole, UserStatus } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../../utils/token.js';
import {
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import { RegisterInput, LoginInput } from './auth.schema.js';

export class AuthService {
  static async register(
    input: RegisterInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    // Check for existing user
    if (input.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existingEmail) {
        throw new ConflictError('An account with this email address already exists');
      }
    }

    if (input.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: input.phone },
      });
      if (existingPhone) {
        throw new ConflictError('An account with this phone number already exists');
      }
    }

    const passwordHash = await hashPassword(input.password);

    // Create User and UserProfile in transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email ?? null,
          phone: input.phone ?? null,
          passwordHash,
          role: UserRole.CITIZEN,
          status: UserStatus.ACTIVE,
          preferredLanguage: input.preferredLanguage,
          profile: {
            create: {
              name: input.name,
              preferredLanguage: input.preferredLanguage,
              location: input.location ?? null,
              latitude: input.latitude ?? null,
              longitude: input.longitude ?? null,
            },
          },
        },
        include: {
          profile: true,
        },
      });

      return user;
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: newUser.id,
      role: newUser.role,
      status: newUser.status,
      email: newUser.email,
      phone: newUser.phone,
    });

    const rawRefreshToken = generateRefreshToken();
    const tokenHash = hashToken(rawRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.refreshToken.create({
      data: {
        userId: newUser.id,
        tokenHash,
        expiresAt,
      },
    });

    await logAudit({
      userId: newUser.id,
      action: 'USER_REGISTERED',
      resourceType: 'User',
      resourceId: newUser.id,
      ipAddress,
      userAgent,
      metadata: { email: newUser.email, role: newUser.role },
    });

    const { passwordHash: _, ...safeUser } = newUser;

    return {
      user: safeUser,
      tokens: {
        accessToken,
        refreshToken: rawRefreshToken,
      },
    };
  }

  static async login(
    input: LoginInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    const isEmail = input.identifier.includes('@');
    const user = await prisma.user.findFirst({
      where: {
        OR: isEmail
          ? [{ email: input.identifier.toLowerCase() }]
          : [{ phone: input.identifier }],
        deletedAt: null,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      await logAudit({
        action: 'LOGIN_FAILED',
        resourceType: 'User',
        ipAddress,
        userAgent,
        metadata: { identifier: input.identifier, reason: 'User not found' },
      });
      throw new UnauthorizedError('Invalid email/phone or password');
    }

    const isPasswordValid = await comparePassword(input.password, user.passwordHash);
    if (!isPasswordValid) {
      await logAudit({
        userId: user.id,
        action: 'LOGIN_FAILED',
        resourceType: 'User',
        resourceId: user.id,
        ipAddress,
        userAgent,
        metadata: { identifier: input.identifier, reason: 'Invalid password' },
      });
      throw new UnauthorizedError('Invalid email/phone or password');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenError('Account is suspended. Please contact emergency administration.');
    }

    if (user.status === UserStatus.DEACTIVATED) {
      throw new ForbiddenError('Account has been deactivated.');
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
      status: user.status,
      email: user.email,
      phone: user.phone,
    });

    const rawRefreshToken = generateRefreshToken();
    const tokenHash = hashToken(rawRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    await logAudit({
      userId: user.id,
      action: 'LOGIN_SUCCESS',
      resourceType: 'User',
      resourceId: user.id,
      ipAddress,
      userAgent,
    });

    const { passwordHash: _, ...safeUser } = user;

    return {
      user: safeUser,
      tokens: {
        accessToken,
        refreshToken: rawRefreshToken,
      },
    };
  }

  static async refreshToken(
    rawRefreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const tokenHash = hashToken(rawRefreshToken);

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Reuse detection
    if (tokenRecord.isRevoked) {
      // Possible token theft: revoke all tokens for this user
      await prisma.refreshToken.updateMany({
        where: { userId: tokenRecord.userId },
        data: { isRevoked: true },
      });

      await logAudit({
        userId: tokenRecord.userId,
        action: 'REFRESH_TOKEN_REUSE_DETECTED',
        resourceType: 'RefreshToken',
        ipAddress,
        userAgent,
      });

      throw new UnauthorizedError('Security violation: Refresh token reuse detected. Please log in again.');
    }

    if (new Date() > tokenRecord.expiresAt) {
      throw new UnauthorizedError('Refresh token has expired. Please log in again.');
    }

    if (tokenRecord.user.status !== UserStatus.ACTIVE || tokenRecord.user.deletedAt !== null) {
      throw new ForbiddenError('User account is not active');
    }

    // Generate new token pair
    const newAccessToken = generateAccessToken({
      userId: tokenRecord.user.id,
      role: tokenRecord.user.role,
      status: tokenRecord.user.status,
      email: tokenRecord.user.email,
      phone: tokenRecord.user.phone,
    });

    const newRawRefreshToken = generateRefreshToken();
    const newTokenHash = hashToken(newRawRefreshToken);
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Rotate tokens in transaction
    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: {
          isRevoked: true,
          replacedByToken: newTokenHash,
        },
      }),
      prisma.refreshToken.create({
        data: {
          userId: tokenRecord.userId,
          tokenHash: newTokenHash,
          expiresAt: newExpiresAt,
        },
      }),
    ]);

    return {
      accessToken: newAccessToken,
      refreshToken: newRawRefreshToken,
    };
  }

  static async logout(
    userId: string,
    rawRefreshToken?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    if (rawRefreshToken) {
      const tokenHash = hashToken(rawRefreshToken);
      await prisma.refreshToken.updateMany({
        where: { userId, tokenHash },
        data: { isRevoked: true },
      });
    }

    await logAudit({
      userId,
      action: 'LOGOUT',
      resourceType: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    });
  }

  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        profile: true,
        emergencyContacts: {
          where: { deletedAt: null },
          orderBy: { priority: 'asc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}
