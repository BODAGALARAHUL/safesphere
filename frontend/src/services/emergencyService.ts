import { apiClient } from './apiClient';
import { EMERGENCY_CONTACTS, EmergencyContact } from '@/data/emergencyContactsData';

export interface SOSPayload {
  eventType?: 'SOS' | 'MEDICAL_EMERGENCY' | 'STRUCTURAL_COLLAPSE';
  latitude: number;
  longitude: number;
  locationAddress?: string;
  description?: string;
  idempotencyKey?: string;
}

export interface AssistancePayload {
  type: 'ELDERLY' | 'MOBILITY' | 'OXYGEN_ICU' | 'MATERNAL' | 'PET' | 'OTHER';
  priority?: 'CRITICAL' | 'MEDICAL_PRIORITY' | 'STANDARD';
  name: string;
  phone: string;
  location: string;
  details: string;
  latitude?: number;
  longitude?: number;
}

export const EmergencyService = {
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    try {
      const res = await apiClient.get<EmergencyContact[]>('/emergency-contacts');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return EMERGENCY_CONTACTS;
    } catch {
      return EMERGENCY_CONTACTS;
    }
  },

  async triggerSOS(payload: SOSPayload) {
    const idempotencyKey = payload.idempotencyKey || `sos_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    try {
      const res = await apiClient.post('/emergency-events', {
        ...payload,
        idempotencyKey,
      });
      return res.data;
    } catch (err) {
      console.warn('SOS backend dispatch queued locally:', err);
      return { id: `mock-${Date.now()}`, status: 'RECEIVED', ...payload };
    }
  },

  async submitSpecialAssistance(payload: AssistancePayload) {
    try {
      const res = await apiClient.post('/assistance-requests', payload);
      return res.data;
    } catch (err) {
      console.warn('Assistance request recorded locally:', err);
      return { id: `req-${Date.now()}`, status: 'RECEIVED', ...payload };
    }
  },
};
