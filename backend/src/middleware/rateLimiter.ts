import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { ERROR_CODES, HTTP_STATUS } from '../config/constants.js';
import { sendError } from '../utils/response.js';

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.NODE_ENV === 'development' || env.NODE_ENV === 'test' ? 10000 : env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'development' && process.env.DISABLE_RATE_LIMIT === 'true',
  handler: (_req, res) => {
    sendError(
      res,
      'Too many requests from this IP, please try again later.',
      HTTP_STATUS.TOO_MANY_REQUESTS,
      ERROR_CODES.RATE_LIMIT_EXCEEDED,
      [],
      {
        retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000),
      }
    );
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.NODE_ENV === 'development' || env.NODE_ENV === 'test' ? 1000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(
      res,
      'Too many authentication attempts. Please try again in 15 minutes.',
      HTTP_STATUS.TOO_MANY_REQUESTS,
      ERROR_CODES.RATE_LIMIT_EXCEEDED,
      [],
      {
        retryAfter: 900,
      }
    );
  },
});
