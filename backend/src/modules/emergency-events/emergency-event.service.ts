import {
  Prisma,
  EmergencyEventStatus,
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
import {
  CreateEmergencyEventInput,
  UpdateEmergencyStatusInput,
  ListEmergencyEventsQuery,
} from './emergency-event.schema.js';

const VALID_STATUS_TRANSITIONS: Record<EmergencyEventStatus, EmergencyEventStatus[]> = {
  [EmergencyEventStatus.RECEIVED]: [
    EmergencyEventStatus.ACKNOWLEDGED,
    EmergencyEventStatus.DISPATCHED,
    EmergencyEventStatus.CANCELLED,
  ],
  [EmergencyEventStatus.ACKNOWLEDGED]: [
    EmergencyEventStatus.DISPATCHED,
    EmergencyEventStatus.IN_PROGRESS,
    EmergencyEventStatus.CANCELLED,
  ],
  [EmergencyEventStatus.DISPATCHED]: [
    EmergencyEventStatus.IN_PROGRESS,
    EmergencyEventStatus.COMPLETED,
    EmergencyEventStatus.CANCELLED,
  ],
  [EmergencyEventStatus.IN_PROGRESS]: [
    EmergencyEventStatus.COMPLETED,
    EmergencyEventStatus.CANCELLED,
  ],
  [EmergencyEventStatus.COMPLETED]: [],
  [EmergencyEventStatus.CANCELLED]: [],
};

export class EmergencyEventService {
  static async createEmergencyEvent(
    userId: string,
    input: CreateEmergencyEventInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    // Idempotency check: if request with this idempotency key already exists, return it
    const existing = await prisma.emergencyEvent.findUnique({
      where: { idempotencyKey: input.idempotencyKey },
    });

    if (existing) {
      return existing;
    }

    // Atomic transaction: Create EmergencyEvent + AuditLog + User Notification
    return prisma.$transaction(async (tx) => {
      const event = await tx.emergencyEvent.create({
        data: {
          userId,
          eventType: input.eventType,
          status: EmergencyEventStatus.RECEIVED,
          priority: input.priority,
          latitude: input.latitude,
          longitude: input.longitude,
          locationAddress: input.locationAddress ?? null,
          description: input.description ?? null,
          idempotencyKey: input.idempotencyKey,
        },
      });

      await tx.auditLog.create({
        data: {
          userId,
          action: 'EMERGENCY_SOS_TRIGGERED',
          resourceType: 'EmergencyEvent',
          resourceId: event.id,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
          metadata: {
            eventType: event.eventType,
            priority: event.priority,
            coordinates: [input.latitude, input.longitude],
          },
        },
      });

      await tx.notification.create({
        data: {
          recipientId: userId,
          type: NotificationType.EMERGENCY_UPDATE,
          title: 'SOS Emergency Signal Received',
          body: 'Your emergency broadcast has been logged and queued for emergency dispatch.',
          priority: NotificationPriority.URGENT,
          relatedResourceType: 'EmergencyEvent',
          relatedResourceId: event.id,
        },
      });

      return event;
    });
  }

  static async getEmergencyEventById(
    eventId: string,
    userId: string,
    userRole: UserRole
  ) {
    const event = await prisma.emergencyEvent.findUnique({
      where: { id: eventId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            profile: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundError('Emergency event record not found');
    }

    // Citizen authorization boundary: Citizens can ONLY view their own emergency events
    if (userRole === UserRole.CITIZEN && event.userId !== userId) {
      throw new ForbiddenError('Access to this emergency record is forbidden');
    }

    return event;
  }

  static async cancelEmergencyEvent(
    eventId: string,
    userId: string,
    userRole: UserRole,
    ipAddress?: string,
    userAgent?: string
  ) {
    const event = await prisma.emergencyEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundError('Emergency event not found');
    }

    if (userRole === UserRole.CITIZEN && event.userId !== userId) {
      throw new ForbiddenError('Access forbidden');
    }

    if (
      event.status === EmergencyEventStatus.COMPLETED ||
      event.status === EmergencyEventStatus.CANCELLED
    ) {
      throw new BadRequestError(`Cannot cancel an event that is already ${event.status}`);
    }

    return prisma.$transaction(async (tx) => {
      const cancelled = await tx.emergencyEvent.update({
        where: { id: eventId },
        data: {
          status: EmergencyEventStatus.CANCELLED,
          resolvedAt: new Date(),
          resolutionNotes: 'Cancelled by citizen or dispatcher.',
        },
      });

      await tx.auditLog.create({
        data: {
          userId,
          action: 'EMERGENCY_SOS_CANCELLED',
          resourceType: 'EmergencyEvent',
          resourceId: eventId,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
        },
      });

      if (event.userId) {
        await tx.notification.create({
          data: {
            recipientId: event.userId,
            type: NotificationType.EMERGENCY_UPDATE,
            title: 'SOS Emergency Signal Cancelled',
            body: 'The active SOS signal was successfully cancelled.',
            priority: NotificationPriority.HIGH,
            relatedResourceType: 'EmergencyEvent',
            relatedResourceId: eventId,
          },
        });
      }

      return cancelled;
    });
  }

  static async listAllEmergencyEvents(query: ListEmergencyEventsQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const where: Prisma.EmergencyEventWhereInput = {
      ...(query.status && { status: query.status }),
      ...(query.priority && { priority: query.priority }),
      ...(query.eventType && { eventType: query.eventType }),
    };

    const [items, totalItems] = await Promise.all([
      prisma.emergencyEvent.findMany({
        where,
        skip,
        take,
        orderBy: [{ createdAt: 'desc' }],
        include: {
          user: {
            select: {
              id: true,
              email: true,
              phone: true,
              profile: true,
            },
          },
        },
      }),
      prisma.emergencyEvent.count({ where }),
    ]);

    return buildPaginatedResult(items, totalItems, page, limit);
  }

  static async updateEventStatus(
    eventId: string,
    input: UpdateEmergencyStatusInput,
    operatorId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const event = await prisma.emergencyEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundError('Emergency event not found');
    }

    const allowedNextStatuses = VALID_STATUS_TRANSITIONS[event.status];
    if (!allowedNextStatuses.includes(input.status)) {
      throw new BadRequestError(
        `Invalid status transition from '${event.status}' to '${input.status}'. Allowed: ${allowedNextStatuses.join(', ') || 'None (Terminal state)'}`
      );
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.emergencyEvent.update({
        where: { id: eventId },
        data: {
          status: input.status,
          ...(input.resolutionNotes && { resolutionNotes: input.resolutionNotes }),
          ...(input.status === EmergencyEventStatus.COMPLETED && { resolvedAt: new Date() }),
        },
      });

      await tx.auditLog.create({
        data: {
          userId: operatorId,
          action: 'EMERGENCY_STATUS_CHANGED',
          resourceType: 'EmergencyEvent',
          resourceId: eventId,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
          metadata: {
            fromStatus: event.status,
            toStatus: input.status,
            notes: input.resolutionNotes,
          },
        },
      });

      if (event.userId) {
        await tx.notification.create({
          data: {
            recipientId: event.userId,
            type: NotificationType.EMERGENCY_UPDATE,
            title: `Emergency Status Update: ${input.status}`,
            body: input.resolutionNotes || `Your emergency event status is now: ${input.status}`,
            priority: NotificationPriority.URGENT,
            relatedResourceType: 'EmergencyEvent',
            relatedResourceId: eventId,
          },
        });
      }

      return updated;
    });
  }
}
