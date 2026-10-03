import { Router, Request, Response } from 'express';
import { env } from '../../config/env.js';
import { APP_METADATA } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';

import { checkDatabaseConnection } from '../../database/prisma.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const isDbConnected = await checkDatabaseConnection();

  const healthData = {
    status: 'ok',
    service: APP_METADATA.NAME,
    version: APP_METADATA.VERSION,
    environment: env.NODE_ENV,
    database: isDbConnected ? 'connected' : 'disconnected',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };

  sendSuccess(res, healthData, 'SafeSphere API is operational');
});

router.get('/ready', async (_req: Request, res: Response) => {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    res.status(503).json({
      success: false,
      message: 'Service unavailable: Database connection check failed',
      status: 'unready',
    });
    return;
  }

  sendSuccess(res, { status: 'ready', database: 'connected' }, 'SafeSphere API is ready to accept traffic');
});

export default router;
