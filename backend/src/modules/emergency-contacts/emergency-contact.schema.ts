import { z } from 'zod';

export const createEmergencyContactSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format (E.164 standard)'),
    relationship: z.string().trim().max(50).optional().nullable(),
    priority: z.coerce.number().int().min(1).max(10).default(1),
    isPrimary: z.boolean().default(false),
  }),
});

export const updateEmergencyContactSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid emergency contact ID format'),
  }),
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),
    phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format').optional(),
    relationship: z.string().trim().max(50).optional().nullable(),
    priority: z.coerce.number().int().min(1).max(10).optional(),
    isPrimary: z.boolean().optional(),
  }),
});

export const contactIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid emergency contact ID format'),
  }),
});

export type CreateEmergencyContactInput = z.infer<typeof createEmergencyContactSchema>['body'];
export type UpdateEmergencyContactInput = z.infer<typeof updateEmergencyContactSchema>['body'];
