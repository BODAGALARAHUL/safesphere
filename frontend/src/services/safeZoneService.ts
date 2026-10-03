import { apiClient } from './apiClient';
import { MOCK_SAFE_ZONES, SafeZone } from '@/data/safeZonesData';

export const SafeZoneService = {
  async getSafeZones(params?: {
    type?: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
  }): Promise<SafeZone[]> {
    try {
      const query = new URLSearchParams();
      if (params?.type && params.type !== 'All') query.append('type', params.type.toUpperCase());
      if (params?.latitude !== undefined) query.append('latitude', String(params.latitude));
      if (params?.longitude !== undefined) query.append('longitude', String(params.longitude));
      if (params?.radiusKm !== undefined) query.append('radiusKm', String(params.radiusKm));

      const res = await apiClient.get<SafeZone[]>(`/safe-zones?${query.toString()}`);
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return MOCK_SAFE_ZONES;
    } catch {
      return MOCK_SAFE_ZONES;
    }
  },

  async getSafeZoneById(id: string): Promise<SafeZone | null> {
    try {
      const res = await apiClient.get<SafeZone>(`/safe-zones/${id}`);
      return res.data;
    } catch {
      return MOCK_SAFE_ZONES.find((z) => z.id === id) || null;
    }
  },
};
