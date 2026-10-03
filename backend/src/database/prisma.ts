import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const createPrismaClient = (): PrismaClient => {
  const client = new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'info' },
            { emit: 'event', level: 'warn' },
          ]
        : [{ emit: 'event', level: 'error' }],
  });

  if (env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client as any).$on('query', (e: { query: string; params: string; duration: number }) => {
      logger.debug(`Prisma Query: ${e.query} - ${e.duration}ms`);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client as any).$on('error', (e: { message: string }) => {
    logger.error(`Prisma Error: ${e.message}`);
  });

  return client;
};

export const prisma: PrismaClient = globalThis.prismaGlobal ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (err) {
    logger.warn('Database health probe failed:', {
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected successfully.');
  } catch (err) {
    logger.error('Error disconnecting Prisma client:', {
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
