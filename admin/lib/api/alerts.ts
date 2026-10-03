import { apiClient, ApiResponse } from './client';
import { DisasterAlertItem, CreateAlertData } from '../../types/alerts';

export const AlertsApi = {
  async getAlerts(params: {
    status?: string;
    severity?: string;
    disasterType?: string;
    search?: string;
  }): Promise<ApiResponse<DisasterAlertItem[]>> {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.severity) query.append('severity', params.severity);
    if (params.disasterType) query.append('disasterType', params.disasterType);
    if (params.search) query.append('search', params.search);

    return apiClient.get<DisasterAlertItem[]>(`/alerts?${query.toString()}`);
  },

  async createAlert(data: CreateAlertData): Promise<DisasterAlertItem> {
    const res = await apiClient.post<DisasterAlertItem>('/alerts', data);
    return res.data;
  },

  async updateAlert(id: string, data: Partial<CreateAlertData>): Promise<DisasterAlertItem> {
    const res = await apiClient.patch<DisasterAlertItem>(`/alerts/${id}`, data);
    return res.data;
  },

  async resolveAlert(id: string): Promise<DisasterAlertItem> {
    const res = await apiClient.post<DisasterAlertItem>(`/alerts/${id}/resolve`);
    return res.data;
  },
};
