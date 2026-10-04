import type {
  LocationCoordinates,
  SectorOption,
  GeolocationPermissionState,
} from '@/types';
import { GUJARAT_SECTORS, DEFAULT_SECTOR } from '@/data/sectorsData';

/**
 * Calculates distance between two coordinates using the Haversine formula (Earth radius ~6371 km).
 * Returns distance in kilometers rounded to 1 decimal place.
 */
export function calculateDistanceKm(
  from: LocationCoordinates,
  to: LocationCoordinates
): number {
  const R = 6371; // Earth's radius in km
  const lat1 = from.latitude;
  const lon1 = from.longitude;
  const lat2 = to.latitude;
  const lon2 = to.longitude;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

export const LocationService = {
  getSupportedSectors(): SectorOption[] {
    return GUJARAT_SECTORS;
  },

  getDefaultSector(): SectorOption {
    return DEFAULT_SECTOR;
  },

  getSectorById(id: string): SectorOption | undefined {
    return GUJARAT_SECTORS.find((s) => s.id === id);
  },

  getSectorByName(name: string): SectorOption | undefined {
    const cleanName = name.toLowerCase().trim();
    return GUJARAT_SECTORS.find(
      (s) =>
        s.name.toLowerCase() === cleanName ||
        cleanName.includes(s.name.toLowerCase()) ||
        s.name.toLowerCase().includes(cleanName)
    );
  },

  findClosestSector(coords: LocationCoordinates): SectorOption {
    let closest = GUJARAT_SECTORS[0];
    let minDistance = calculateDistanceKm(coords, closest.coordinates);

    for (const sector of GUJARAT_SECTORS) {
      const dist = calculateDistanceKm(coords, sector.coordinates);
      if (dist < minDistance) {
        minDistance = dist;
        closest = sector;
      }
    }

    return closest;
  },

  /**
   * Safe, centralized browser geolocation request.
   * Prompts user once; never sets up a persistent background watcher.
   */
  async requestBrowserGeolocation(): Promise<{
    coordinates: LocationCoordinates;
    accuracy?: number;
  }> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      const err = new Error('Geolocation is not supported by your browser');
      (err as { code?: string }).code = 'UNSUPPORTED';
      throw err;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: Math.round(position.coords.accuracy),
            },
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let code: GeolocationPermissionState = 'unavailable';
          if (error.code === error.PERMISSION_DENIED) {
            code = 'denied';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            code = 'unavailable';
          } else if (error.code === error.TIMEOUT) {
            code = 'unavailable';
          }
          const err = new Error(error.message || 'Unable to retrieve location');
          (err as { code?: GeolocationPermissionState }).code = code;
          reject(err);
        },
        {
          enableHighAccuracy: false, // Low-power, fast, citizen-friendly
          timeout: 8000,
          maximumAge: 60000,
        }
      );
    });
  },
};

export const {
  getSupportedSectors,
  getDefaultSector,
  getSectorById,
  getSectorByName,
  findClosestSector,
  requestBrowserGeolocation,
} = LocationService;
