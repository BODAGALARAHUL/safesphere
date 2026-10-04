export interface SOSPayload {
  eventType?: 'SOS' | 'MEDICAL_EMERGENCY' | 'STRUCTURAL_COLLAPSE' | 'RESCUE_REQUEST' | 'HAZARD_REPORT';
  latitude: number;
  longitude: number;
  locationAddress?: string;
  description?: string;
  idempotencyKey?: string;
}

export interface EmergencyEvent {
  id: string;
  userId?: string;
  eventType: string;
  status: string;
  priority: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  description?: string;
  createdAt: string;
}
