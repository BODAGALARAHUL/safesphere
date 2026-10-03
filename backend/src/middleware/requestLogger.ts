import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { logger } from '../utils/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const existingRequestId = req.headers['x-request-id'];
  const requestId = typeof existingRequestId === 'string' && existingRequestId.trim() !== ''
    ? existingRequestId
    : `req_${randomUUID()}`;

  req.headers['x-request-id'] = requestId;
  res.setHeader('x-request-id', requestId);

  const startTime = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = ((seconds * 1000) + (nanoseconds / 1000000)).toFixed(2);

    logger.info(`${req.method} ${req.originalUrl || req.url} ${res.statusCode} - ${durationMs}ms`, {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: `${durationMs}ms`,
      ip: req.ip,
    });
  });

  next();
};
