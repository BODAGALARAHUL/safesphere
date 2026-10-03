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
    latitude?: number | null;
    longitude?: number | null;
  } | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
