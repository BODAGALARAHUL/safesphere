import { apiClient, ApiResponse } from './client';
import { EmergencyEventItem } from '../../types/emergencies';

export const EmergenciesApi = {
  async getEmergencyEvents(params: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
  }): Promise<ApiResponse<EmergencyEventItem[]>> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.status) query.append('status', params.status);
    if (params.priority) query.append('priority', params.priority);

    return apiClient.get<EmergencyEventItem[]>(`/emergency-events?${query.toString()}`);
  },

  async updateEmergencyStatus(
    id: string,
    status: 'RECEIVED' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
    notes?: string
  ): Promise<EmergencyEventItem> {
    const res = await apiClient.patch<EmergencyEventItem>(`/emergency-events/${id}/status`, {
      status,
      notes,
    });
    return res.data;
  },
};
