import { apiClient } from './apiClient';
import { MOCK_DISASTER_ALERTS, DisasterAlert } from '@/data/disastersData';

export const AlertService = {
  async getActiveAlerts(): Promise<DisasterAlert[]> {
    try {
      const res = await apiClient.get<DisasterAlert[]>('/alerts/active');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return MOCK_DISASTER_ALERTS;
    } catch {
      return MOCK_DISASTER_ALERTS;
    }
  },

  async getAllAlerts(): Promise<DisasterAlert[]> {
    try {
      const res = await apiClient.get<DisasterAlert[]>('/alerts');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return MOCK_DISASTER_ALERTS;
    } catch {
      return MOCK_DISASTER_ALERTS;
    }
  },

  async getAlertById(id: string): Promise<DisasterAlert | null> {
    try {
      const res = await apiClient.get<DisasterAlert>(`/alerts/${id}`);
      return res.data;
    } catch {
      return MOCK_DISASTER_ALERTS.find((a) => a.id === id) || null;
    }
  },
};
