import {
  Prisma,
  AssistanceStatus,
  UserRole,
  NotificationType,
  NotificationPriority,
} from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} from '../../utils/errors.js';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js';
import { logAudit } from '../../services/auditService.js';
import {
  CreateAssistanceInput,
  UpdateAssistanceStatusInput,
  ListAssistanceQuery,
} from './assistance.schema.js';

export class AssistanceService {
  static async createRequest(
    userId: string,
    input: CreateAssistanceInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    return prisma.$transaction(async (tx) => {
      const req = await tx.assistanceRequest.create({
        data: {
          userId,
          type: input.type,
          priority: input.priority,
          status: AssistanceStatus.RECEIVED,
          name: input.name,
          phone: input.phone,
          location: input.location,
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,
          details: input.details,
        },
      });

      await tx.auditLog.create({
        data: {
          userId,
          action: 'ASSISTANCE_REQUEST_CREATED',
          resourceType: 'AssistanceRequest',
          resourceId: req.id,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
          metadata: { type: req.type, priority: req.priority },
        },
      });

      await tx.notification.create({
        data: {
          recipientId: userId,
          type: NotificationType.ASSISTANCE_DISPATCH,
          title: 'Special Assistance Request Received',
          body: `Your request for ${input.type} assistance at ${input.location} is logged.`,
          priority: NotificationPriority.HIGH,
          relatedResourceType: 'AssistanceRequest',
          relatedResourceId: req.id,
        },
      });

      return req;
    });
  }

  static async getMyRequests(userId: string) {
    return prisma.assistanceRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getRequestById(
    requestId: string,
    userId: string,
    userRole: UserRole
  ) {
    const req = await prisma.assistanceRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: { id: true, email: true, phone: true },
        },
      },
    });

    if (!req) {
      throw new NotFoundError('Assistance request not found');
    }

    if (userRole === UserRole.CITIZEN && req.userId !== userId) {
      throw new ForbiddenError('Access to this assistance request is forbidden');
    }

    return req;
  }

  static async cancelRequest(
    requestId: string,
    userId: string,
    userRole: UserRole,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.assistanceRequest.findUnique({
      where: { id: requestId },
    });

    if (!existing) {
      throw new NotFoundError('Assistance request not found');
    }

    if (userRole === UserRole.CITIZEN && existing.userId !== userId) {
      throw new ForbiddenError('Access forbidden');
    }

    if (
      existing.status === AssistanceStatus.COMPLETED ||
      existing.status === AssistanceStatus.CANCELLED
    ) {
      throw new BadRequestError(`Cannot cancel a request that is already ${existing.status}`);
    }

    const cancelled = await prisma.assistanceRequest.update({
      where: { id: requestId },
      data: { status: AssistanceStatus.CANCELLED },
    });

    await logAudit({
      userId,
      action: 'ASSISTANCE_REQUEST_CANCELLED',
      resourceType: 'AssistanceRequest',
      resourceId: requestId,
      ipAddress,
      userAgent,
    });

    return cancelled;
  }

  static async listAllRequests(query: ListAssistanceQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const where: Prisma.AssistanceRequestWhereInput = {
      ...(query.type && { type: query.type }),
      ...(query.priority && { priority: query.priority }),
      ...(query.status && { status: query.status }),
    };

    const [items, totalItems] = await Promise.all([
      prisma.assistanceRequest.findMany({
        where,
        skip,
        take,
        orderBy: [{ createdAt: 'desc' }],
        include: {
          user: {
            select: { id: true, email: true, phone: true, profile: true },
          },
        },
      }),
      prisma.assistanceRequest.count({ where }),
    ]);

    return buildPaginatedResult(items, totalItems, page, limit);
  }

  static async updateRequestStatus(
    requestId: string,
    input: UpdateAssistanceStatusInput,
    operatorId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.assistanceRequest.findUnique({
      where: { id: requestId },
    });

    if (!existing) {
      throw new NotFoundError('Assistance request not found');
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.assistanceRequest.update({
        where: { id: requestId },
        data: {
          status: input.status,
          ...(input.assignedTeam !== undefined && { assignedTeam: input.assignedTeam }),
        },
      });

      await tx.auditLog.create({
        data: {
          userId: operatorId,
          action: 'ASSISTANCE_STATUS_CHANGED',
          resourceType: 'AssistanceRequest',
          resourceId: requestId,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
          metadata: {
            fromStatus: existing.status,
            toStatus: input.status,
            assignedTeam: input.assignedTeam,
          },
        },
      });

      if (existing.userId) {
        await tx.notification.create({
          data: {
            recipientId: existing.userId,
            type: NotificationType.ASSISTANCE_DISPATCH,
            title: `Assistance Request Status: ${input.status}`,
            body: input.assignedTeam
              ? `Assigned to team: ${input.assignedTeam}. Status is now ${input.status}.`
              : `Your assistance request status is now ${input.status}.`,
            priority: NotificationPriority.HIGH,
            relatedResourceType: 'AssistanceRequest',
            relatedResourceId: requestId,
          },
        });
      }

      return updated;
    });
  }
}
