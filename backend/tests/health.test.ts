import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './helpers.js';

describe('System Health & Security Foundation Tests', () => {
  it('GET /api/v1/health should return 200 OK with health metadata', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.service).toBe('SafeSphere API');
    expect(res.headers['x-request-id']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('GET /api/v1/ready should respond with readiness probe', async () => {
    const res = await request(app).get('/api/v1/ready');
    expect([200, 503]).toContain(res.status);
    expect(res.body).toBeDefined();
  });

  it('GET /unknown-route should return structured 404 NOT_FOUND error', async () => {
    const res = await request(app).get('/unknown-random-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.meta.requestId).toBeDefined();
  });

  it('Malformed JSON payload should return 400 BAD_REQUEST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send('{ "broken_json": ');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  });
});
