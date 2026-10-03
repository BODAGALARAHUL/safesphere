import { z } from 'zod';
import {
  EmergencyEventType,
  EmergencyEventStatus,
  EmergencyPriority,
} from '@prisma/client';

export const createEmergencyEventSchema = z.object({
  body: z.object({
    eventType: z.nativeEnum(EmergencyEventType).default(EmergencyEventType.SOS),
    priority: z.nativeEnum(EmergencyPriority).default(EmergencyPriority.CRITICAL),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    locationAddress: z.string().trim().max(300).optional().nullable(),
    description: z.string().trim().max(1000).optional().nullable(),
    idempotencyKey: z.string().trim().min(8).max(128),
  }),
});

export const updateEmergencyStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid emergency event ID format'),
  }),
  body: z.object({
    status: z.nativeEnum(EmergencyEventStatus),
    resolutionNotes: z.string().trim().max(1000).optional().nullable(),
  }),
});

export const listEmergencyEventsQuerySchema = z.object({
  query: z.object({
    status: z.nativeEnum(EmergencyEventStatus).optional(),
    priority: z.nativeEnum(EmergencyPriority).optional(),
    eventType: z.nativeEnum(EmergencyEventType).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const emergencyEventIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid emergency event ID format'),
  }),
});

export type CreateEmergencyEventInput = z.infer<typeof createEmergencyEventSchema>['body'];
export type UpdateEmergencyStatusInput = z.infer<typeof updateEmergencyStatusSchema>['body'];
export type ListEmergencyEventsQuery = z.infer<typeof listEmergencyEventsQuerySchema>['query'];
