import { Prisma, DisasterType } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import { CreateGuidanceInput, UpdateGuidanceInput } from './guidance.schema.js';

export class GuidanceService {
  static async listGuidance() {
    return prisma.disasterGuide.findMany({
      orderBy: { disasterType: 'asc' },
      include: {
        disaster: {
          select: { id: true, type: true, name: true, iconName: true },
        },
      },
    });
  }

  static async getGuidanceByType(disasterType: DisasterType) {
    const guide = await prisma.disasterGuide.findUnique({
      where: { disasterType },
      include: {
        disaster: true,
      },
    });

    if (!guide) {
      throw new NotFoundError(`Guidance for disaster type '${disasterType}' not found`);
    }

    return guide;
  }

  static async createGuidance(
    input: CreateGuidanceInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterGuide.findUnique({
      where: { disasterType: input.disasterType },
    });

    if (existing) {
      throw new ConflictError(`Guidance for '${input.disasterType}' already exists`);
    }

    const guide = await prisma.disasterGuide.create({
      data: {
        disasterId: input.disasterId ?? null,
        disasterType: input.disasterType,
        title: input.title,
        summary: input.summary,
        severityRisk: input.severityRisk,
        iconName: input.iconName,
        beforeSteps: input.beforeSteps as Prisma.InputJsonValue,
        duringSteps: input.duringSteps as Prisma.InputJsonValue,
        afterSteps: input.afterSteps as Prisma.InputJsonValue,
        avoidItems: input.avoidItems as Prisma.InputJsonValue,
        translations: (input.translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
      },
    });

    await logAudit({
      userId,
      action: 'GUIDANCE_CREATED',
      resourceType: 'DisasterGuide',
      resourceId: guide.id,
      ipAddress,
      userAgent,
      metadata: { disasterType: guide.disasterType },
    });

    return guide;
  }

  static async updateGuidance(
    id: string,
    input: UpdateGuidanceInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterGuide.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Disaster guide not found');
    }

    const updated = await prisma.disasterGuide.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.summary !== undefined && { summary: input.summary }),
        ...(input.severityRisk !== undefined && { severityRisk: input.severityRisk }),
        ...(input.iconName !== undefined && { iconName: input.iconName }),
        ...(input.beforeSteps !== undefined && { beforeSteps: input.beforeSteps as Prisma.InputJsonValue }),
        ...(input.duringSteps !== undefined && { duringSteps: input.duringSteps as Prisma.InputJsonValue }),
        ...(input.afterSteps !== undefined && { afterSteps: input.afterSteps as Prisma.InputJsonValue }),
        ...(input.avoidItems !== undefined && { avoidItems: input.avoidItems as Prisma.InputJsonValue }),
        ...(input.translations !== undefined && {
          translations: (input.translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        }),
      },
    });

    await logAudit({
      userId,
      action: 'GUIDANCE_UPDATED',
      resourceType: 'DisasterGuide',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return updated;
  }

  static async deleteGuidance(
    id: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disasterGuide.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Disaster guide not found');
    }

    const deleted = await prisma.disasterGuide.delete({ where: { id } });

    await logAudit({
      userId,
      action: 'GUIDANCE_DELETED',
      resourceType: 'DisasterGuide',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
