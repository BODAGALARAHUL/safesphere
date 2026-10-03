import { apiClient } from './apiClient';

export interface User {
  id: string;
  email?: string | null;
  phone?: string | null;
  role: 'CITIZEN' | 'DISASTER_OPERATOR' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  preferredLanguage: string;
  profile?: {
    name: string;
    location?: string | null;
  } | null;
}

export const AuthService = {
  async register(data: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    preferredLanguage?: string;
    location?: string;
  }) {
    const res = await apiClient.post<{ user: User; tokens: { accessToken: string; refreshToken: string } }>(
      '/auth/register',
      data
    );
    if (res.data?.tokens?.accessToken) {
      apiClient.setToken(res.data.tokens.accessToken);
    }
    return res.data;
  },

  async login(identifier: string, password: string) {
    const res = await apiClient.post<{ user: User; tokens: { accessToken: string; refreshToken: string } }>(
      '/auth/login',
      { identifier, password }
    );
    if (res.data?.tokens?.accessToken) {
      apiClient.setToken(res.data.tokens.accessToken);
    }
    return res.data;
  },

  async logout() {
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
