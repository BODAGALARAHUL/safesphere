import { User } from './auth';

export interface SystemStats {
  totalCitizensAndOperators: number;
  activeDisasterAlerts: number;
  ongoingEmergencyEvents: number;
  pendingAssistanceRequests: number;
  openSafeZones: number;
  timestamp: string;
}

export interface AdminUser extends User {
  emergencyContacts?: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
    isPrimary: boolean;
  }>;
  _count?: {
    emergencyEvents: number;
    assistanceRequests: number;
    preparednessProgress: number;
  };
}

export interface AuditLogItem {
  id: string;
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  user?: {
    id: string;
    email?: string | null;
    role: string;
  } | null;
}
