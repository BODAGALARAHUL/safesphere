import { prisma } from '../../database/prisma.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';
import { logAudit } from '../../services/auditService.js';
import {
  CreateEmergencyContactInput,
  UpdateEmergencyContactInput,
} from './emergency-contact.schema.js';

export class EmergencyContactService {
  static async listContacts(userId: string) {
    return prisma.emergencyContact.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    });
  }

  static async getContactById(userId: string, contactId: string) {
    const contact = await prisma.emergencyContact.findUnique({
      where: { id: contactId },
    });

    if (!contact || contact.deletedAt !== null) {
      throw new NotFoundError('Emergency contact not found');
    }

    if (contact.userId !== userId) {
      throw new ForbiddenError('Access to this emergency contact is forbidden');
    }

    return contact;
  }

  static async createContact(
    userId: string,
    input: CreateEmergencyContactInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    return prisma.$transaction(async (tx) => {
      // If setting as primary, unset other primaries for this user
      if (input.isPrimary) {
        await tx.emergencyContact.updateMany({
          where: { userId, isPrimary: true },
          data: { isPrimary: false },
        });
      }

      const contact = await tx.emergencyContact.create({
        data: {
          userId,
          name: input.name,
          phone: input.phone,
          relationship: input.relationship ?? null,
          priority: input.priority,
          isPrimary: input.isPrimary,
        },
      });

      await logAudit({
        userId,
        action: 'EMERGENCY_CONTACT_CREATED',
        resourceType: 'EmergencyContact',
        resourceId: contact.id,
        ipAddress,
        userAgent,
      });

      return contact;
    });
  }

  static async updateContact(
    userId: string,
    contactId: string,
    input: UpdateEmergencyContactInput,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await this.getContactById(userId, contactId);

    return prisma.$transaction(async (tx) => {
      if (input.isPrimary) {
        await tx.emergencyContact.updateMany({
          where: { userId, isPrimary: true, NOT: { id: contactId } },
          data: { isPrimary: false },
        });
      }

      const updated = await tx.emergencyContact.update({
        where: { id: contactId },
        data: {
          ...(input.name !== undefined && { name: input.name }),
          ...(input.phone !== undefined && { phone: input.phone }),
          ...(input.relationship !== undefined && {
            relationship: input.relationship,
          }),
          ...(input.priority !== undefined && { priority: input.priority }),
          ...(input.isPrimary !== undefined && { isPrimary: input.isPrimary }),
        },
      });

      await logAudit({
        userId,
        action: 'EMERGENCY_CONTACT_UPDATED',
        resourceType: 'EmergencyContact',
        resourceId: existing.id,
        ipAddress,
        userAgent,
      });

      return updated;
    });
  }

  static async deleteContact(
    userId: string,
    contactId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await this.getContactById(userId, contactId);

    const deleted = await prisma.emergencyContact.update({
      where: { id: contactId },
      data: { deletedAt: new Date() },
    });

    await logAudit({
      userId,
      action: 'EMERGENCY_CONTACT_DELETED',
      resourceType: 'EmergencyContact',
      resourceId: existing.id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
