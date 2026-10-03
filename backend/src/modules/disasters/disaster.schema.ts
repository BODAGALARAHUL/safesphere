import { z } from 'zod';
import { DisasterType } from '@prisma/client';

export const createDisasterSchema = z.object({
  body: z.object({
    type: z.nativeEnum(DisasterType),
    name: z.string().trim().min(2).max(100),
    description: z.string().trim().min(5).max(1000),
    iconName: z.string().trim().min(1).max(50),
  }),
});

export const updateDisasterSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid disaster ID format'),
  }),
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),
    description: z.string().trim().min(5).max(1000).optional(),
    iconName: z.string().trim().min(1).max(50).optional(),
  }),
});

export const disasterIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid disaster ID format'),
  }),
});

export type CreateDisasterInput = z.infer<typeof createDisasterSchema>['body'];
export type UpdateDisasterInput = z.infer<typeof updateDisasterSchema>['body'];
