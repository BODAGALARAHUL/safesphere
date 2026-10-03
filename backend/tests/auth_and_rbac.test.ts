import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './helpers.js';
import { generateAccessToken } from '../src/utils/token.js';
import { UserRole, UserStatus } from '@prisma/client';

describe('Authentication & RBAC Unit Tests', () => {
  const citizenToken = generateAccessToken({
    userId: '00000000-0000-0000-0000-000000000001',
    role: UserRole.CITIZEN,
    status: UserStatus.ACTIVE,
    email: 'test_citizen@safesphere.in',
  });

  const operatorToken = generateAccessToken({
    userId: '00000000-0000-0000-0000-000000000002',
    role: UserRole.DISASTER_OPERATOR,
    status: UserStatus.ACTIVE,
    email: 'test_operator@gsdma.gov.in',
  });

  it('Protected endpoint without Authorization header should reject with 401 UNAUTHORIZED', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('Protected endpoint with invalid bearer token should reject with 401 UNAUTHORIZED', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'Bearer invalid_fake_token');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('Admin endpoint accessed by Citizen should reject with 403 FORBIDDEN', async () => {
    const res = await request(app)
      .get('/api/v1/admin/system-stats')
      .set('Authorization', `Bearer ${citizenToken}`);
    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('Operator restricted emergency operations accessed by Citizen should reject with 403 FORBIDDEN', async () => {
    const res = await request(app)
      .get('/api/v1/emergency-events')
      .set('Authorization', `Bearer ${citizenToken}`);
    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('Registration validation rejects weak password or missing identifier', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'John Doe',
        password: 'weak',
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details.length).toBeGreaterThan(0);
  });
});
