import http from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { APP_METADATA } from './config/constants.js';

import { disconnectDatabase } from './database/prisma.js';

const app = createApp();
const server = http.createServer(app);

const startServer = (): void => {
  server.listen(env.PORT, () => {
    logger.info(`🚀 ${APP_METADATA.NAME} v${APP_METADATA.VERSION} running on port ${env.PORT}`, {
      port: env.PORT,
      environment: env.NODE_ENV,
      apiPrefix: env.API_PREFIX,
      healthEndpoint: `http://localhost:${env.PORT}${env.API_PREFIX}/health`,
    });
  });
};

const handleGracefulShutdown = (signal: string): void => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  server.close(async (err) => {
    if (err) {
      logger.error('Error during server close:', { error: err.message });
      process.exit(1);
    }
    await disconnectDatabase();
    logger.info('HTTP server closed cleanly. Exiting process.');
    process.exit(0);
  });

  // Force close after 10s if graceful shutdown hangs
  setTimeout(() => {
    logger.error('Forcefully terminating process after shutdown timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception thrown:', { error: err.message, stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Promise Rejection:', { reason });
  process.exit(1);
});

startServer();
