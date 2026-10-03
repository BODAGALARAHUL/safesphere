import { z } from 'zod';
import { DisasterType, AlertSeverity, AlertStatus } from '@prisma/client';

export const createAlertSchema = z.object({
  body: z.object({
    disasterId: z.string().uuid().optional().nullable(),
    disasterType: z.nativeEnum(DisasterType),
    severity: z.nativeEnum(AlertSeverity),
    riskColor: z.enum(['red', 'orange', 'yellow', 'green']).default('red'),
    title: z.string().trim().min(5, 'Title must be at least 5 characters').max(200),
    location: z.string().trim().min(2).max(200),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    affectedRadiusKm: z.number().positive().max(1000).optional().nullable(),
    summary: z.string().trim().min(10).max(1000),
    description: z.string().trim().max(5000).optional().nullable(),
    actions: z.array(z.string().trim().min(1)).min(1, 'At least one action step is required'),
    avoidItems: z.array(z.string().trim().min(1)).default([]),
    status: z.nativeEnum(AlertStatus).default(AlertStatus.ACTIVE),
    officialSource: z.string().trim().min(2).max(200),
    nearestSafeZoneId: z.string().uuid().optional().nullable(),
    expiresAt: z.string().datetime().optional().nullable(),
    translations: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const updateAlertSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid alert ID format'),
  }),
  body: z.object({
    disasterId: z.string().uuid().optional().nullable(),
    disasterType: z.nativeEnum(DisasterType).optional(),
    severity: z.nativeEnum(AlertSeverity).optional(),
    riskColor: z.enum(['red', 'orange', 'yellow', 'green']).optional(),
    title: z.string().trim().min(5).max(200).optional(),
    location: z.string().trim().min(2).max(200).optional(),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    affectedRadiusKm: z.number().positive().max(1000).optional().nullable(),
    summary: z.string().trim().min(10).max(1000).optional(),
    description: z.string().trim().max(5000).optional().nullable(),
    actions: z.array(z.string().trim()).optional(),
    avoidItems: z.array(z.string().trim()).optional(),
    status: z.nativeEnum(AlertStatus).optional(),
    officialSource: z.string().trim().min(2).max(200).optional(),
    nearestSafeZoneId: z.string().uuid().optional().nullable(),
    expiresAt: z.string().datetime().optional().nullable(),
    translations: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const listAlertsQuerySchema = z.object({
  query: z.object({
    disasterType: z.nativeEnum(DisasterType).optional(),
    severity: z.nativeEnum(AlertSeverity).optional(),
    status: z.nativeEnum(AlertStatus).optional(),
    location: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const alertIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid alert ID format'),
  }),
});

export type CreateAlertInput = z.infer<typeof createAlertSchema>['body'];
export type UpdateAlertInput = z.infer<typeof updateAlertSchema>['body'];
export type ListAlertsQuery = z.infer<typeof listAlertsQuerySchema>['query'];
