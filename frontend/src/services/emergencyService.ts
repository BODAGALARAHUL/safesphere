import type {
  EmergencyContact,
  SOSPayload,
  AssistancePayload,
} from '@/types';
import { EMERGENCY_CONTACTS } from '@/data/emergencyContactsData';

export const EmergencyService = {
  getEmergencyContacts(): EmergencyContact[] {
    return EMERGENCY_CONTACTS;
  },

  getPrimaryContact(): EmergencyContact {
    return EMERGENCY_CONTACTS.find((c) => c.primary) || EMERGENCY_CONTACTS[0];
  },

  async triggerSOS(payload: SOSPayload) {
    const idempotencyKey =
      payload.idempotencyKey ||
      `sos_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    return {
      id: `sos-${Date.now()}`,
      status: 'RECEIVED',
      idempotencyKey,
      ...payload,
      createdAt: new Date().toISOString(),
    };
  },

  async submitSpecialAssistance(payload: AssistancePayload) {
    return {
      id: `req-${Date.now()}`,
      status: 'Received · Rescue Dispatched',
      ...payload,
      timestamp: 'Just now',
    };
  },
};

export const {
  getEmergencyContacts,
  getPrimaryContact,
  triggerSOS,
  submitSpecialAssistance,
} = EmergencyService;
