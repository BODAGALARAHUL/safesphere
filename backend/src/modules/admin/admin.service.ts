import { prisma } from '../../database/prisma.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js';
import { logAudit } from '../../services/auditService.js';
import {
  ListUsersQuery,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
  ListAuditLogsQuery,
} from './admin.schema.js';

export class AdminService {
  static async listUsers(query: ListUsersQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const where: Record<string, unknown> = {
      deletedAt: null,
      ...(query.role ? { role: query.role } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { email: { contains: query.search, mode: 'insensitive' } },
              { phone: { contains: query.search } },
              { profile: { name: { contains: query.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [users, totalItems] = await Promise.all([
      prisma.user.findMany({
        where: where as any,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          phone: true,
          role: true,
          status: true,
          preferredLanguage: true,
          lastLoginAt: true,
          createdAt: true,
          profile: true,
        },
      }),
      prisma.user.count({ where: where as any }),
    ]);

    return buildPaginatedResult(users, totalItems, page, limit);
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        preferredLanguage: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        emergencyContacts: { where: { deletedAt: null } },
        _count: {
          select: {
            emergencyEvents: true,
            assistanceRequests: true,
            preparednessProgress: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  static async updateUserRole(
    targetUserId: string,
    input: UpdateUserRoleInput,
    adminId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    if (targetUserId === adminId) {
      throw new BadRequestError('Administrators cannot alter their own role directly');
    }

    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      throw new NotFoundError('Target user not found');
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { role: input.role },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    await logAudit({
      userId: adminId,
      action: 'USER_ROLE_CHANGED',
      resourceType: 'User',
      resourceId: targetUserId,
      ipAddress,
      userAgent,
      metadata: { fromRole: targetUser.role, toRole: input.role },
    });

    return updated;
  }

  static async updateUserStatus(
    targetUserId: string,
    input: UpdateUserStatusInput,
    adminId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    if (targetUserId === adminId) {
      throw new BadRequestError('Administrators cannot suspend or deactivate their own account');
    }

    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      throw new NotFoundError('Target user not found');
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { status: input.status },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    // If suspended or deactivated, revoke all refresh tokens immediately
    if (input.status !== 'ACTIVE') {
      await prisma.refreshToken.updateMany({
        where: { userId: targetUserId },
        data: { isRevoked: true },
      });
    }

    await logAudit({
      userId: adminId,
      action: 'USER_STATUS_CHANGED',
      resourceType: 'User',
      resourceId: targetUserId,
      ipAddress,
      userAgent,
      metadata: {
        fromStatus: targetUser.status,
        toStatus: input.status,
        reason: input.reason,
      },
    });

    return updated;
  }

  static async listAuditLogs(query: ListAuditLogsQuery) {
    const { page, limit, skip, take } = parsePagination(query, 50, 100);

    const where: Record<string, unknown> = {
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.action ? { action: { contains: query.action, mode: 'insensitive' } } : {}),
      ...(query.resourceType ? { resourceType: query.resourceType } : {}),
    };

    const [logs, totalItems] = await Promise.all([
      prisma.auditLog.findMany({
        where: where as any,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, role: true },
          },
        },
      }),
      prisma.auditLog.count({ where: where as any }),
    ]);

    return buildPaginatedResult(logs, totalItems, page, limit);
  }

  static async getSystemStats() {
    const [
      totalUsers,
      activeAlerts,
      openEmergencies,
      pendingAssistance,
      availableSafeZones,
    ] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.disasterAlert.count({ where: { status: 'ACTIVE', deletedAt: null } }),
      prisma.emergencyEvent.count({
        where: {
          status: { in: ['RECEIVED', 'ACKNOWLEDGED', 'DISPATCHED', 'IN_PROGRESS'] },
        },
      }),
      prisma.assistanceRequest.count({
        where: {
          status: { in: ['RECEIVED', 'ASSIGNED', 'IN_PROGRESS'] },
        },
      }),
      prisma.safeZone.count({ where: { status: 'AVAILABLE', deletedAt: null } }),
    ]);

    return {
      totalCitizensAndOperators: totalUsers,
      activeDisasterAlerts: activeAlerts,
      ongoingEmergencyEvents: openEmergencies,
      pendingAssistanceRequests: pendingAssistance,
      openSafeZones: availableSafeZones,
      timestamp: new Date().toISOString(),
    };
  }
}
