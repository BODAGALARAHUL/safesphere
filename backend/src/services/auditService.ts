import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import { logger } from '../utils/logger.js';

export interface AuditLogParams {
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown> | null;
}

export const logAudit = async (params: AuditLogParams): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        resourceType: params.resourceType,
        resourceId: params.resourceId ?? null,
        ipAddress: params.ipAddress ?? null,
        userAgent: params.userAgent ?? null,
        metadata: (params.metadata as Prisma.InputJsonValue) ?? Prisma.JsonNull,
      },
    });
  } catch (err) {
    logger.error('Failed to create audit log entry:', {
      action: params.action,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
