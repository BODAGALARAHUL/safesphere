import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './helpers.js';
import { hashPassword, comparePassword } from '../src/utils/password.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyAccessToken,
} from '../src/utils/token.js';
import { parsePagination, buildPaginatedResult } from '../src/utils/pagination.js';
import { UserRole, UserStatus } from '@prisma/client';

describe('Domain Modules & Utility Logic Tests', () => {
  describe('Password Utility', () => {
    it('hashes password securely and verifies match', async () => {
      const password = 'StrongPassword123!';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash.startsWith('$2')).toBe(true);

      const isValid = await comparePassword(password, hash);
      expect(isValid).toBe(true);

      const isInvalid = await comparePassword('WrongPassword', hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('JWT & Refresh Token Utility', () => {
    it('signs and verifies JWT access token with payload claims', () => {
      const payload = {
        userId: 'user-uuid-12345',
        role: UserRole.CITIZEN,
        status: UserStatus.ACTIVE,
        email: 'citizen@safesphere.in',
      };

      const token = generateAccessToken(payload);
      expect(typeof token).toBe('string');

      const decoded = verifyAccessToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.role).toBe(UserRole.CITIZEN);
      expect(decoded.email).toBe(payload.email);
    });

    it('generates random hex refresh token and calculates SHA-256 hash', () => {
      const rawToken = generateRefreshToken();
      expect(rawToken.length).toBe(80); // 40 bytes = 80 hex chars

      const hash1 = hashToken(rawToken);
      const hash2 = hashToken(rawToken);
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(64); // SHA-256 hex string
    });
  });

  describe('Pagination Utility', () => {
    it('parses page and limit safely with clamping', () => {
      const res1 = parsePagination({ page: '2', limit: '10' });
      expect(res1.page).toBe(2);
      expect(res1.limit).toBe(10);
      expect(res1.skip).toBe(10);
      expect(res1.take).toBe(10);

      const res2 = parsePagination({ page: '-5', limit: '500' });
      expect(res2.page).toBe(1);
      expect(res2.limit).toBe(100); // Clamped to max limit
    });

    it('builds paginated metadata envelope', () => {
      const items = ['a', 'b', 'c'];
      const paginated = buildPaginatedResult(items, 25, 2, 10);
      expect(paginated.pagination.totalItems).toBe(25);
      expect(paginated.pagination.totalPages).toBe(3);
      expect(paginated.pagination.hasNextPage).toBe(true);
      expect(paginated.pagination.hasPrevPage).toBe(true);
    });
  });

  describe('Input Validation & Boundary Testing', () => {
    it('POST /api/v1/auth/register fails on invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Jane Doe',
          email: 'invalid-email-no-at',
          password: 'ValidPassword123!',
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('POST /api/v1/safe-zones fails without authentication', async () => {
      const res = await request(app)
        .post('/api/v1/safe-zones')
        .send({
          name: 'Paldi Safe House',
          type: 'SHELTER',
          latitude: 23.01,
          longitude: 72.56,
          address: 'Paldi',
          area: 'Paldi',
          contactNumber: '+91 9999999999',
        });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
