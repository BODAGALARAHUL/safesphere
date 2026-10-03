import { apiClient, ApiResponse } from './client';
import { SafeZoneItem, CreateSafeZoneData } from '../../types/safe-zones';

export const SafeZonesApi = {
  async getSafeZones(params: {
    type?: string;
    status?: string;
  }): Promise<ApiResponse<SafeZoneItem[]>> {
    const query = new URLSearchParams();
    if (params.type) query.append('type', params.type);
    if (params.status) query.append('status', params.status);

    return apiClient.get<SafeZoneItem[]>(`/safe-zones?${query.toString()}`);
  },

  async createSafeZone(data: CreateSafeZoneData): Promise<SafeZoneItem> {
    const res = await apiClient.post<SafeZoneItem>('/safe-zones', data);
    return res.data;
  },

  async updateSafeZone(id: string, data: Partial<CreateSafeZoneData>): Promise<SafeZoneItem> {
    const res = await apiClient.patch<SafeZoneItem>(`/safe-zones/${id}`, data);
    return res.data;
  },

  async deleteSafeZone(id: string): Promise<SafeZoneItem> {
    const res = await apiClient.delete<SafeZoneItem>(`/safe-zones/${id}`);
    return res.data;
  },
};
