import { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js';
import { logAudit } from '../../services/auditService.js';
import {
  CreateSafeZoneInput,
  UpdateSafeZoneInput,
  ListSafeZonesQuery,
} from './safe-zone.schema.js';

// Haversine formula for distance in kilometers
const calculateDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

export class SafeZoneService {
  static async listSafeZones(query: ListSafeZonesQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const hasGeo = query.latitude !== undefined && query.longitude !== undefined;
    const radiusKm = query.radiusKm || 25;

    let boundingBoxWhere: Prisma.SafeZoneWhereInput = {};

    if (hasGeo) {
      // 1 deg latitude ~= 111 km
      const latDelta = radiusKm / 111;
      // 1 deg longitude ~= 111 * cos(lat) km
      const lngDelta = radiusKm / (111 * Math.cos((query.latitude! * Math.PI) / 180));

      boundingBoxWhere = {
        latitude: {
          gte: query.latitude! - latDelta,
          lte: query.latitude! + latDelta,
        },
        longitude: {
          gte: query.longitude! - lngDelta,
          lte: query.longitude! + lngDelta,
        },
      };
    }

    const where: Prisma.SafeZoneWhereInput = {
      deletedAt: null,
      ...(query.type && { type: query.type }),
      ...(query.status && { status: query.status }),
      ...(query.area && { area: { contains: query.area, mode: 'insensitive' } }),
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { address: { contains: query.search, mode: 'insensitive' } },
          { area: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
      ...boundingBoxWhere,
    };

    const [items, totalItems] = await Promise.all([
      prisma.safeZone.findMany({
        where,
        skip: hasGeo ? 0 : skip,
        take: hasGeo ? 200 : take,
        orderBy: [{ name: 'asc' }],
      }),
      prisma.safeZone.count({ where }),
    ]);

    // If coordinates were passed, calculate distance and sort
    if (hasGeo) {
      const mapped = items
        .map((zone) => ({
          ...zone,
          distanceKm: calculateDistanceKm(
            query.latitude!,
            query.longitude!,
            zone.latitude,
            zone.longitude
          ),
        }))
        .filter((zone) => zone.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm);

      const paginatedItems = mapped.slice(skip, skip + take);
      return buildPaginatedResult(paginatedItems, mapped.length, page, limit);
    }

    return buildPaginatedResult(items, totalItems, page, limit);
  }

  static async getSafeZoneById(id: string, userLat?: number, userLng?: number) {
    const zone = await prisma.safeZone.findUnique({
      where: { id },
    });

    if (!zone || zone.deletedAt !== null) {
      throw new NotFoundError('Safe zone not found');
    }

    if (userLat !== undefined && userLng !== undefined) {
      return {
        ...zone,
        distanceKm: calculateDistanceKm(userLat, userLng, zone.latitude, zone.longitude),
      };
    }

    return zone;
  }

  static async createSafeZone(
    input: CreateSafeZoneInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const zone = await prisma.safeZone.create({
      data: {
        name: input.name,
        type: input.type,
        latitude: input.latitude,
        longitude: input.longitude,
        address: input.address,
        area: input.area,
        status: input.status,
        capacityBeds: input.capacityBeds ?? null,
        facilities: input.facilities as Prisma.InputJsonValue,
        contactNumber: input.contactNumber,
        operatingHours: input.operatingHours,
        googleMapsUrl: input.googleMapsUrl ?? null,
      },
    });

    await logAudit({
      userId,
      action: 'SAFE_ZONE_CREATED',
      resourceType: 'SafeZone',
      resourceId: zone.id,
      ipAddress,
      userAgent,
      metadata: { name: zone.name, type: zone.type },
    });

    return zone;
  }

  static async updateSafeZone(
    id: string,
    input: UpdateSafeZoneInput,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.safeZone.findUnique({ where: { id } });
    if (!existing || existing.deletedAt !== null) {
      throw new NotFoundError('Safe zone not found');
    }

    const updated = await prisma.safeZone.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.type !== undefined && { type: input.type }),
        ...(input.latitude !== undefined && { latitude: input.latitude }),
        ...(input.longitude !== undefined && { longitude: input.longitude }),
        ...(input.address !== undefined && { address: input.address }),
        ...(input.area !== undefined && { area: input.area }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.capacityBeds !== undefined && { capacityBeds: input.capacityBeds }),
        ...(input.facilities !== undefined && {
          facilities: input.facilities as Prisma.InputJsonValue,
        }),
        ...(input.contactNumber !== undefined && { contactNumber: input.contactNumber }),
        ...(input.operatingHours !== undefined && { operatingHours: input.operatingHours }),
        ...(input.googleMapsUrl !== undefined && { googleMapsUrl: input.googleMapsUrl }),
      },
    });

    await logAudit({
      userId,
      action: 'SAFE_ZONE_UPDATED',
      resourceType: 'SafeZone',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return updated;
  }

  static async deleteSafeZone(
    id: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const existing = await prisma.safeZone.findUnique({ where: { id } });
    if (!existing || existing.deletedAt !== null) {
      throw new NotFoundError('Safe zone not found');
    }

    const deleted = await prisma.safeZone.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await logAudit({
      userId,
      action: 'SAFE_ZONE_DELETED',
      resourceType: 'SafeZone',
      resourceId: id,
      ipAddress,
      userAgent,
    });

    return deleted;
  }
}
