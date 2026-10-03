import express, { Express } from 'express';
import { env } from './config/env.js';
import { setupSecurityMiddleware } from './middleware/security.js';
import { requestLogger } from './middleware/requestLogger.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import v1Router from './routes/v1/index.js';

export const createApp = (): Express => {
  const app = express();

  // Trust proxy in production if behind reverse proxy
  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  // Correlation & Request Logging
  app.use(requestLogger);

  // Security (Helmet, CORS, Body Parsers)
  setupSecurityMiddleware(app);

  // Global Rate Limiting
  app.use(globalRateLimiter);

  // API v1 Routing
  app.use(env.API_PREFIX, v1Router);

  // 404 Route Catch-all
  app.use(notFoundHandler);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
