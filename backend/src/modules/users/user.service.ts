import { prisma } from '../../database/prisma.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import { UpdateUserInput, UpdateProfileInput } from './user.schema.js';

export class UserService {
  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  static async updateCurrentUser(
    userId: string,
    input: UpdateUserInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    if (input.email) {
      const existing = await prisma.user.findFirst({
        where: { email: input.email, NOT: { id: userId } },
      });
      if (existing) {
        throw new ConflictError('Email is already taken by another account');
      }
    }

    if (input.phone) {
      const existing = await prisma.user.findFirst({
        where: { phone: input.phone, NOT: { id: userId } },
      });
      if (existing) {
        throw new ConflictError('Phone number is already taken by another account');
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(input.email !== undefined && { email: input.email }),
        ...(input.phone !== undefined && { phone: input.phone }),
        ...(input.preferredLanguage !== undefined && {
          preferredLanguage: input.preferredLanguage,
        }),
      },
      include: {
        profile: true,
      },
    });

    await logAudit({
      userId,
      action: 'USER_UPDATED',
      resourceType: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
      metadata: { fieldsUpdated: Object.keys(input) },
    });

    const { passwordHash: _, ...safeUser } = updatedUser;
    return safeUser;
  }

  static async getProfile(userId: string) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    return profile;
  }

  static async updateProfile(
    userId: string,
    input: UpdateProfileInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.dateOfBirth !== undefined && {
          dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
        }),
        ...(input.preferredLanguage !== undefined && {
          preferredLanguage: input.preferredLanguage,
        }),
        ...(input.location !== undefined && { location: input.location }),
        ...(input.latitude !== undefined && { latitude: input.latitude }),
        ...(input.longitude !== undefined && { longitude: input.longitude }),
        ...(input.accessibilityNeeds !== undefined && {
          accessibilityNeeds: input.accessibilityNeeds,
        }),
        ...(input.medicalNotes !== undefined && {
          medicalNotes: input.medicalNotes,
        }),
      },
      create: {
        userId,
        name: input.name || 'Citizen',
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
        preferredLanguage: input.preferredLanguage || 'en',
        location: input.location ?? null,
        latitude: input.latitude ?? null,
        longitude: input.longitude ?? null,
        accessibilityNeeds: input.accessibilityNeeds ?? null,
        medicalNotes: input.medicalNotes ?? null,
      },
    });

    await logAudit({
      userId,
      action: 'PROFILE_UPDATED',
      resourceType: 'UserProfile',
      resourceId: profile.id,
      ipAddress,
      userAgent,
    });

    return profile;
  }
}
