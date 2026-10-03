import { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import { CreateTemplateInput, UpdateProgressInput } from './preparedness.schema.js';

export class PreparednessService {
  static async getChecklistWithUserProgress(userId?: string) {
    const templates = await prisma.preparednessTemplate.findMany({
      orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }],
    });

    if (!userId) {
      return templates.map((t: { isDefault: boolean; [key: string]: unknown }) => ({
        ...t,
        isChecked: t.isDefault,
        checkedAt: null,
      }));
    }

    const userProgress = await prisma.userPreparednessProgress.findMany({
      where: { userId },
    });

    const progressMap = new Map<string, { isChecked: boolean; checkedAt: Date | null }>(
      userProgress.map((p) => [p.templateId, { isChecked: p.isChecked, checkedAt: p.checkedAt }])
    );

    return templates.map((t) => {
      const prog = progressMap.get(t.id);
      return {
        ...t,
        isChecked: prog ? prog.isChecked : false,
        checkedAt: prog ? prog.checkedAt : null,
      };
    });
  }

  static async getUserProgressSummary(userId: string) {
    const totalTemplates = await prisma.preparednessTemplate.count();
    const completedCount = await prisma.userPreparednessProgress.count({
      where: { userId, isChecked: true },
    });

    const percentage = totalTemplates > 0 ? Math.round((completedCount / totalTemplates) * 100) : 0;

    return {
      completedCount,
      totalCount: totalTemplates,
      percentage,
    };
  }

  static async updateProgress(
    userId: string,
    templateId: string,
    input: UpdateProgressInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    const template = await prisma.preparednessTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new NotFoundError('Preparedness checklist item not found');
    }

    const progress = await prisma.userPreparednessProgress.upsert({
      where: {
        userId_templateId: {
          userId,
          templateId,
        },
      },
      update: {
        isChecked: input.isChecked,
        checkedAt: input.isChecked ? new Date() : null,
      },
      create: {
        userId,
        templateId,
        isChecked: input.isChecked,
        checkedAt: input.isChecked ? new Date() : null,
      },
    });

    await logAudit({
      userId,
      action: 'PREPAREDNESS_ITEM_TOGGLED',
      resourceType: 'UserPreparednessProgress',
      resourceId: progress.id,
      ipAddress,
      userAgent,
      metadata: { templateId, isChecked: input.isChecked },
    });

    return progress;
  }

  static async createTemplate(
    input: CreateTemplateInput,
    adminId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const template = await prisma.preparednessTemplate.create({
      data: {
        category: input.category,
        title: input.title,
        description: input.description,
        iconName: input.iconName,
        isDefault: input.isDefault,
        orderIndex: input.orderIndex,
        translations: input.translations ? (input.translations as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });

    await logAudit({
      userId: adminId,
      action: 'PREPAREDNESS_TEMPLATE_CREATED',
      resourceType: 'PreparednessTemplate',
      resourceId: template.id,
      ipAddress,
      userAgent,
    });

    return template;
  }

  static async deleteTemplate(
    id: string,
    adminId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.preparednessTemplate.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Preparedness template not found');
    }

    const deleted = await prisma.preparednessTemplate.delete({ where: { id } });

    await logAudit({
      userId: adminId,
      action: 'PREPAREDNESS_TEMPLATE_DELETED',
      resourceType: 'PreparednessTemplate',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
