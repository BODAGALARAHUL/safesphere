import jwt, { SignOptions } from 'jsonwebtoken';
import { createHash, randomBytes } from 'node:crypto';
import { UserRole, UserStatus } from '@prisma/client';
import { env } from '../config/env.js';
import { UnauthorizedError } from './errors.js';

export interface JwtUserPayload {
  userId: string;
  role: UserRole;
  status: UserStatus;
  email?: string | null;
  phone?: string | null;
}

export const generateAccessToken = (payload: JwtUserPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    issuer: 'safesphere-api',
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const generateRefreshToken = (): string => {
  return randomBytes(40).toString('hex');
};

export const hashToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

export const verifyAccessToken = (token: string): JwtUserPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: 'safesphere-api',
    }) as JwtUserPayload & jwt.JwtPayload;

    return {
      userId: decoded.userId,
      role: decoded.role,
      status: decoded.status,
      email: decoded.email,
      phone: decoded.phone,
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Access token has expired');
    }
    throw new UnauthorizedError('Invalid or malformed access token');
  }
};
