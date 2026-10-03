import { prisma } from '../../database/prisma.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import { CreateDisasterInput, UpdateDisasterInput } from './disaster.schema.js';

export class DisasterService {
  static async listDisasters() {
    return prisma.disaster.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            alerts: { where: { status: 'ACTIVE', deletedAt: null } },
          },
        },
      },
    });
  }

  static async getDisasterById(id: string) {
    const disaster = await prisma.disaster.findUnique({
      where: { id },
      include: {
        guides: true,
        alerts: {
          where: { status: 'ACTIVE', deletedAt: null },
          orderBy: { issuedAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!disaster) {
      throw new NotFoundError('Disaster type not found');
    }

    return disaster;
  }

  static async createDisaster(
    input: CreateDisasterInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disaster.findUnique({
      where: { type: input.type },
    });

    if (existing) {
      throw new ConflictError(`Disaster classification '${input.type}' already exists`);
    }

    const disaster = await prisma.disaster.create({
      data: {
        type: input.type,
        name: input.name,
        description: input.description,
        iconName: input.iconName,
      },
    });

    await logAudit({
      userId,
      action: 'DISASTER_CREATED',
      resourceType: 'Disaster',
      resourceId: disaster.id,
      ipAddress,
      userAgent,
      metadata: { type: disaster.type },
    });

    return disaster;
  }

  static async updateDisaster(
    id: string,
    input: UpdateDisasterInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disaster.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Disaster type not found');
    }

    const updated = await prisma.disaster.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.iconName !== undefined && { iconName: input.iconName }),
      },
    });

    await logAudit({
      userId,
      action: 'DISASTER_UPDATED',
      resourceType: 'Disaster',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return updated;
  }

  static async deleteDisaster(
    id: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.disaster.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Disaster type not found');
    }

    const deleted = await prisma.disaster.delete({
      where: { id },
    });

    await logAudit({
      userId,
      action: 'DISASTER_DELETED',
      resourceType: 'Disaster',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
