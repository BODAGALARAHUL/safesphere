import { z } from 'zod';
import { PrepCategory } from '@prisma/client';

export const updateProgressSchema = z.object({
  params: z.object({
    templateId: z.string().uuid('Invalid template ID format'),
  }),
  body: z.object({
    isChecked: z.boolean(),
  }),
});

export const createTemplateSchema = z.object({
  body: z.object({
    category: z.nativeEnum(PrepCategory),
    title: z.string().trim().min(3).max(150),
    description: z.string().trim().min(5).max(500),
    iconName: z.string().trim().min(1).max(50),
    isDefault: z.boolean().default(true),
    orderIndex: z.number().int().default(0),
    translations: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const templateIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid template ID format'),
  }),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>['body'];
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>['body'];
