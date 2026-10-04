export type EmergencyContactType = 'national' | 'medical' | 'fire' | 'police' | 'helpline';

export interface EmergencyContact {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  type: EmergencyContactType;
  primary: boolean;
  description: string;
  iconName: string;
}
