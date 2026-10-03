import { Prisma, AlertStatus } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js';
import { logAudit } from '../../services/auditService.js';
import { CreateAlertInput, UpdateAlertInput, ListAlertsQuery } from './alert.schema.js';

export class AlertService {
  static async listAlerts(query: ListAlertsQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const where: Prisma.DisasterAlertWhereInput = {
      deletedAt: null,
      ...(query.disasterType && { disasterType: query.disasterType }),
      ...(query.severity && { severity: query.severity }),
      ...(query.status && { status: query.status }),
      ...(query.location && {
        location: { contains: query.location, mode: 'insensitive' },
      }),
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' } },
          { summary: { contains: query.search, mode: 'insensitive' } },
          { location: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const [items, totalItems] = await Promise.all([
      prisma.disasterAlert.findMany({
        where,
        skip,
        take,
        orderBy: [{ issuedAt: 'desc' }, { createdAt: 'desc' }],
        include: {
          disaster: {
            select: { id: true, type: true, name: true, iconName: true },
          },
        },
      }),
      prisma.disasterAlert.count({ where }),
    ]);

    return buildPaginatedResult(items, totalItems, page, limit);
  }

  static async getActiveAlerts() {
    return prisma.disasterAlert.findMany({
      where: {
        status: AlertStatus.ACTIVE,
        deletedAt: null,
      },
      orderBy: [{ issuedAt: 'desc' }],
      include: {
        disaster: {
          select: { id: true, type: true, name: true, iconName: true },
        },
      },
    });
  }

  static async getAlertById(id: string) {
    const alert = await prisma.disasterAlert.findUnique({
      where: { id },
      include: {
        disaster: true,
      },
    });

    if (!alert || alert.deletedAt !== null) {
      throw new NotFoundError('Disaster alert not found');
    }

    return alert;
  }

  static async createAlert(
    input: CreateAlertInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const alert = await prisma.$transaction(async (tx) => {
      const newAlert = await tx.disasterAlert.create({
        data: {
          disasterId: input.disasterId ?? null,
          disasterType: input.disasterType,
          severity: input.severity,
          riskColor: input.riskColor,
          title: input.title,
          location: input.location,
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,
          affectedRadiusKm: input.affectedRadiusKm ?? null,
          summary: input.summary,
          description: input.description ?? null,
          actions: input.actions as Prisma.InputJsonValue,
          avoidItems: input.avoidItems as Prisma.InputJsonValue,
          status: input.status,
          officialSource: input.officialSource,
          nearestSafeZoneId: input.nearestSafeZoneId ?? null,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
          translations: (input.translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        },
      });

      return newAlert;
    });

    await logAudit({
      userId,
      action: 'ALERT_CREATED',
      resourceType: 'DisasterAlert',
      resourceId: alert.id,
      ipAddress,
      userAgent,
      metadata: { title: alert.title, severity: alert.severity, disasterType: alert.disasterType },
    });

    return alert;
  }

  static async updateAlert(
    id: string,
    input: UpdateAlertInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterAlert.findUnique({ where: { id } });
    if (!existing || existing.deletedAt !== null) {
      throw new NotFoundError('Disaster alert not found');
    }

    const updated = await prisma.disasterAlert.update({
      where: { id },
      data: {
        ...(input.disasterId !== undefined && { disasterId: input.disasterId }),
        ...(input.disasterType !== undefined && { disasterType: input.disasterType }),
        ...(input.severity !== undefined && { severity: input.severity }),
        ...(input.riskColor !== undefined && { riskColor: input.riskColor }),
        ...(input.title !== undefined && { title: input.title }),
        ...(input.location !== undefined && { location: input.location }),
        ...(input.latitude !== undefined && { latitude: input.latitude }),
        ...(input.longitude !== undefined && { longitude: input.longitude }),
        ...(input.affectedRadiusKm !== undefined && { affectedRadiusKm: input.affectedRadiusKm }),
        ...(input.summary !== undefined && { summary: input.summary }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.actions !== undefined && { actions: input.actions as Prisma.InputJsonValue }),
        ...(input.avoidItems !== undefined && { avoidItems: input.avoidItems as Prisma.InputJsonValue }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.officialSource !== undefined && { officialSource: input.officialSource }),
        ...(input.nearestSafeZoneId !== undefined && { nearestSafeZoneId: input.nearestSafeZoneId }),
        ...(input.expiresAt !== undefined && {
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
        }),
        ...(input.translations !== undefined && {
          translations: (input.translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        }),
      },
    });

    await logAudit({
      userId,
      action: 'ALERT_UPDATED',
      resourceType: 'DisasterAlert',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return updated;
  }

  static async resolveAlert(
    id: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterAlert.findUnique({ where: { id } });
    if (!existing || existing.deletedAt !== null) {
      throw new NotFoundError('Disaster alert not found');
    }

    const resolved = await prisma.disasterAlert.update({
      where: { id },
      data: {
        status: AlertStatus.RESOLVED,
      },
    });

    await logAudit({
      userId,
      action: 'ALERT_RESOLVED',
      resourceType: 'DisasterAlert',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return resolved;
  }

  static async deleteAlert(
    id: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterAlert.findUnique({ where: { id } });
    if (!existing || existing.deletedAt !== null) {
      throw new NotFoundError('Disaster alert not found');
    }

    const deleted = await prisma.disasterAlert.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await logAudit({
      userId,
      action: 'ALERT_DELETED',
      resourceType: 'DisasterAlert',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
