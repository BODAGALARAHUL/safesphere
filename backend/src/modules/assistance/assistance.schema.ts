import { z } from 'zod';
import {
  AssistanceType,
  AssistancePriority,
  AssistanceStatus,
} from '@prisma/client';

export const createAssistanceSchema = z.object({
  body: z.object({
    type: z.nativeEnum(AssistanceType),
    priority: z.nativeEnum(AssistancePriority).default(AssistancePriority.STANDARD),
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format'),
    location: z.string().trim().min(5).max(300),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    details: z.string().trim().min(5).max(1000),
  }),
});

export const updateAssistanceStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid assistance request ID format'),
  }),
  body: z.object({
    status: z.nativeEnum(AssistanceStatus),
    assignedTeam: z.string().trim().max(100).optional().nullable(),
  }),
});

export const listAssistanceQuerySchema = z.object({
  query: z.object({
    type: z.nativeEnum(AssistanceType).optional(),
    priority: z.nativeEnum(AssistancePriority).optional(),
    status: z.nativeEnum(AssistanceStatus).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const assistanceIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid assistance request ID format'),
  }),
});

export type CreateAssistanceInput = z.infer<typeof createAssistanceSchema>['body'];
export type UpdateAssistanceStatusInput = z.infer<typeof updateAssistanceStatusSchema>['body'];
export type ListAssistanceQuery = z.infer<typeof listAssistanceQuerySchema>['query'];
