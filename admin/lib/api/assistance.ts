import { apiClient, ApiResponse } from './client';
import { AssistanceRequestItem } from '../../types/emergencies';

export const AssistanceApi = {
  async getAssistanceRequests(params: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    type?: string;
  }): Promise<ApiResponse<AssistanceRequestItem[]>> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.status) query.append('status', params.status);
    if (params.priority) query.append('priority', params.priority);
    if (params.type) query.append('type', params.type);

    return apiClient.get<AssistanceRequestItem[]>(`/assistance-requests?${query.toString()}`);
  },

  async updateAssistanceStatus(
    id: string,
    status: 'RECEIVED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
    notes?: string,
    assignedTo?: string
  ): Promise<AssistanceRequestItem> {
    const res = await apiClient.patch<AssistanceRequestItem>(`/assistance-requests/${id}/status`, {
      status,
      notes,
      assignedTo,
    });
    return res.data;
  },
};
