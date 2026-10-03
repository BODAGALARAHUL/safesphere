import { apiClient } from './client';
import { User, AuthResponse } from '../../types/auth';

export const AuthApi = {
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', {
      identifier,
      password,
    });
    if (res.data?.tokens?.accessToken) {
      apiClient.setToken(res.data.tokens.accessToken);
    }
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.setToken(null);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await apiClient.get<User>('/auth/me');
      return res.data;
    } catch {
      return null;
    }
  },
};
