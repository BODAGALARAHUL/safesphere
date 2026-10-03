import { z } from 'zod';
import { SafeZoneType, SafeZoneStatus } from '@prisma/client';

export const createSafeZoneSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3).max(150),
    type: z.nativeEnum(SafeZoneType),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    address: z.string().trim().min(5).max(300),
    area: z.string().trim().min(2).max(100),
    status: z.nativeEnum(SafeZoneStatus).default(SafeZoneStatus.AVAILABLE),
    capacityBeds: z.string().trim().max(100).optional().nullable(),
    facilities: z.array(z.string().trim()).default([]),
    contactNumber: z.string().trim().min(5).max(50),
    operatingHours: z.string().trim().default('24x7 Emergency Active'),
    googleMapsUrl: z.string().trim().url().optional().nullable(),
  }),
});

export const updateSafeZoneSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid safe zone ID format'),
  }),
  body: z.object({
    name: z.string().trim().min(3).max(150).optional(),
    type: z.nativeEnum(SafeZoneType).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    address: z.string().trim().min(5).max(300).optional(),
    area: z.string().trim().min(2).max(100).optional(),
    status: z.nativeEnum(SafeZoneStatus).optional(),
    capacityBeds: z.string().trim().max(100).optional().nullable(),
    facilities: z.array(z.string().trim()).optional(),
    contactNumber: z.string().trim().min(5).max(50).optional(),
    operatingHours: z.string().trim().optional(),
    googleMapsUrl: z.string().trim().url().optional().nullable(),
  }),
});

export const listSafeZonesQuerySchema = z.object({
  query: z.object({
    type: z.nativeEnum(SafeZoneType).optional(),
    status: z.nativeEnum(SafeZoneStatus).optional(),
    area: z.string().optional(),
    search: z.string().optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
    radiusKm: z.coerce.number().positive().max(500).default(20).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const safeZoneIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid safe zone ID format'),
  }),
});

export type CreateSafeZoneInput = z.infer<typeof createSafeZoneSchema>['body'];
export type UpdateSafeZoneInput = z.infer<typeof updateSafeZoneSchema>['body'];
export type ListSafeZonesQuery = z.infer<typeof listSafeZonesQuerySchema>['query'];
