import { apiClient, ApiResponse } from './client';
import { SystemStats, AdminUser, AuditLogItem } from '../../types/admin';

export const AdminApi = {
  async getSystemStats(): Promise<SystemStats> {
    const res = await apiClient.get<SystemStats>('/admin/system-stats');
    return res.data;
  },

  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<ApiResponse<AdminUser[]>> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    if (params.role) query.append('role', params.role);
    if (params.status) query.append('status', params.status);

    return apiClient.get<AdminUser[]>(`/admin/users?${query.toString()}`);
  },

  async getUserById(id: string): Promise<AdminUser> {
    const res = await apiClient.get<AdminUser>(`/admin/users/${id}`);
    return res.data;
  },

  async updateUserRole(id: string, role: 'CITIZEN' | 'DISASTER_OPERATOR' | 'ADMIN'): Promise<AdminUser> {
    const res = await apiClient.patch<AdminUser>(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  async updateUserStatus(
    id: string,
    status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED',
    reason?: string
  ): Promise<AdminUser> {
    const res = await apiClient.patch<AdminUser>(`/admin/users/${id}/status`, { status, reason });
    return res.data;
  },

  async getAuditLogs(params: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
    resourceType?: string;
  }): Promise<ApiResponse<AuditLogItem[]>> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.userId) query.append('userId', params.userId);
    if (params.action) query.append('action', params.action);
    if (params.resourceType) query.append('resourceType', params.resourceType);

    return apiClient.get<AuditLogItem[]>(`/admin/audit-logs?${query.toString()}`);
  },
};
