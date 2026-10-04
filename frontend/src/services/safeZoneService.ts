import type { SafeZone, LocationCoordinates } from '@/types';
import { MOCK_SAFE_ZONES } from '@/data/safeZonesData';
import { calculateDistanceKm } from './locationService';

export const SafeZoneService = {
  getSafeZones(params?: {
    category?: string;
    searchQuery?: string;
    area?: string;
    userCoords?: LocationCoordinates;
  }): SafeZone[] {
    let zones = [...MOCK_SAFE_ZONES];

    // If user coordinates provided, compute dynamic distances
    if (params?.userCoords) {
      const { userCoords } = params;
      zones = zones.map((z) => ({
        ...z,
        distanceKm: calculateDistanceKm(userCoords, {
          latitude: z.lat,
          longitude: z.lng,
        }),
      }));
    }

    if (params?.area && params.area !== 'ALL' && params.area !== 'All') {
      const areaKeyword = params.area.split('·')[0].trim().toLowerCase();
      const sectorKeyword = (params.area.split('·')[1] || '').trim().toLowerCase();
      
      const filteredByArea = zones.filter((z) => {
        const zoneArea = z.area.toLowerCase();
        return (
          zoneArea.includes(areaKeyword) ||
          (sectorKeyword && zoneArea.includes(sectorKeyword))
        );
      });

      // Only apply if we found matching zones in that area, otherwise keep all to avoid blank screen
      if (filteredByArea.length > 0) {
        zones = filteredByArea;
      }
    }

    if (params?.category && params.category !== 'All' && params.category !== 'ALL') {
      zones = zones.filter((z) => z.type === params.category);
    }

    if (params?.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase().trim();
      zones = zones.filter(
        (z) =>
          z.name.toLowerCase().includes(q) ||
          z.area.toLowerCase().includes(q) ||
          z.type.toLowerCase().includes(q) ||
          z.facilities.some((f) => f.toLowerCase().includes(q))
      );
    }

    // If coordinates were provided, sort by closest distance
    if (params?.userCoords) {
      zones.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return zones;
  },

  getSafeZoneById(id: string, userCoords?: LocationCoordinates): SafeZone | undefined {
    const zone = MOCK_SAFE_ZONES.find((z) => z.id === id);
    if (!zone) return undefined;
    if (userCoords) {
      return {
        ...zone,
        distanceKm: calculateDistanceKm(userCoords, {
          latitude: zone.lat,
          longitude: zone.lng,
        }),
      };
    }
    return zone;
  },

  getNearestSafeZone(userCoords?: LocationCoordinates, area?: string): SafeZone {
    const zones = this.getSafeZones({ userCoords, area });
    return zones[0] || MOCK_SAFE_ZONES[0];
  },
};

export const { getSafeZones, getSafeZoneById, getNearestSafeZone } = SafeZoneService;

