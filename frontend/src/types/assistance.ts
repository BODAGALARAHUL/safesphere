export type SpecialAssistanceType =
  | 'Elderly / Senior Care'
  | 'Wheelchair / Mobility Escort'
  | 'Medical Oxygen / ICU Support'
  | 'Infant / Maternal Care'
  | 'Pet Evacuation';

export type SpecialAssistancePriority = 'Critical Evacuation' | 'Medical Priority' | 'Standard Assistance';

export type SpecialAssistanceStatus =
  | 'Received · Rescue Dispatched'
  | 'Assigned to Paldi Shelter Team'
  | 'Evacuation Complete';

export interface SpecialAssistanceRequest {
  id: string;
  type: SpecialAssistanceType;
  name: string;
  phone: string;
  location: string;
  details: string;
  priority: SpecialAssistancePriority;
  status: SpecialAssistanceStatus;
  timestamp: string;
}

export type AssistanceRequest = SpecialAssistanceRequest;

export interface AssistancePayload {
  type: string;
  priority?: string;
  name: string;
  phone: string;
  location: string;
  details: string;
  latitude?: number;
  longitude?: number;
}
