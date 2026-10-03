import { apiClient } from './apiClient';
import { DISASTER_GUIDES, DisasterGuide } from '@/data/guidanceData';

export const GuidanceService = {
  async getAllGuidance(): Promise<DisasterGuide[]> {
    try {
      const res = await apiClient.get<DisasterGuide[]>('/guidance');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return DISASTER_GUIDES;
    } catch {
      return DISASTER_GUIDES;
    }
  },

  async getGuidanceByType(disasterType: string): Promise<DisasterGuide | null> {
    try {
      const res = await apiClient.get<DisasterGuide>(`/guidance/${disasterType.toUpperCase()}`);
      return res.data;
    } catch {
      return DISASTER_GUIDES.find((g) => g.disasterType.toLowerCase() === disasterType.toLowerCase()) || null;
    }
  },
};
