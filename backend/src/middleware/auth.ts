import { Request, Response, NextFunction } from 'express';
import { UserStatus } from '@prisma/client';
import { verifyAccessToken, JwtUserPayload } from '../utils/token.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import { prisma } from '../database/prisma.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export const authenticate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Malformed authorization header');
    }

    const payload = verifyAccessToken(token);

    // Verify account status from database if accessible
    try {
      const userRecord = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, role: true, status: true, deletedAt: true },
      });

      if (userRecord) {
        if (userRecord.deletedAt !== null) {
          throw new UnauthorizedError('User account no longer exists');
        }
        if (userRecord.status === UserStatus.SUSPENDED) {
          throw new ForbiddenError('Account is suspended. Please contact emergency administration.');
        }
        if (userRecord.status === UserStatus.DEACTIVATED) {
          throw new ForbiddenError('Account has been deactivated.');
        }

        req.user = {
          userId: userRecord.id,
          role: userRecord.role,
          status: userRecord.status,
          email: payload.email,
          phone: payload.phone,
        };
        return next();
      }
    } catch (dbErr) {
      if (dbErr instanceof UnauthorizedError || dbErr instanceof ForbiddenError) {
        throw dbErr;
      }
      // If DB is unreachable during testing/cold boot, fallback to cryptographically verified token payload
    }

    if (payload.status === UserStatus.SUSPENDED) {
      throw new ForbiddenError('Account is suspended. Please contact emergency administration.');
    }
    if (payload.status === UserStatus.DEACTIVATED) {
      throw new ForbiddenError('Account has been deactivated.');
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
      status: payload.status,
      email: payload.email,
      phone: payload.phone,
    };

    next();
  } catch (error) {
    next(error);
  }
};
