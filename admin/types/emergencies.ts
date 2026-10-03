export interface EmergencyEventItem {
  id: string;
  userId: string;
  type: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'RECEIVED' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  latitude: number;
  longitude: number;
  address?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email?: string | null;
    phone?: string | null;
    profile?: { name: string } | null;
  };
}

export interface AssistanceRequestItem {
  id: string;
  userId: string;
  type: 'ELDERLY' | 'MOBILITY' | 'OXYGEN_ICU' | 'MATERNAL' | 'PET' | 'OTHER';
  priority: 'CRITICAL' | 'MEDICAL_PRIORITY' | 'STANDARD';
  status: 'RECEIVED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  latitude: number;
  longitude: number;
  address?: string | null;
  description: string;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email?: string | null;
    phone?: string | null;
    profile?: { name: string } | null;
  };
}
