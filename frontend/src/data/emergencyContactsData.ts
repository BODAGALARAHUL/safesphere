export interface EmergencyContact {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  type: 'national' | 'medical' | 'fire' | 'police' | 'helpline';
  primary: boolean;
  description: string;
  iconName: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '112',
    number: '112',
    title: 'National Emergency Response',
    subtitle: 'Unified Single Helpline (NDER)',
    type: 'national',
    primary: true,
    description: 'Immediate dispatch for Police, Medical Ambulance, or Fire emergencies across India.',
    iconName: 'ShieldAlert'
  },
  {
    id: '108',
    number: '108',
    title: 'Emergency Medical Services',
    subtitle: 'State Ambulance & Trauma Response',
    type: 'medical',
    primary: false,
    description: 'Free 24x7 emergency medical transport and immediate trauma care assistance.',
    iconName: 'Ambulance'
  },
  {
    id: '101',
    number: '101',
    title: 'Fire & Rescue Services',
    subtitle: 'Fire Department Control Room',
    type: 'fire',
    primary: false,
    description: 'Fire suppression, structural collapse rescue, and hazardous material containment.',
    iconName: 'Flame'
  },
  {
    id: '100',
    number: '100',
    title: 'Police Command Control',
    subtitle: 'Police Emergency Assistance',
    type: 'police',
    primary: false,
    description: 'Law enforcement, public safety protection, and emergency police dispatch.',
    iconName: 'Shield'
  },
  {
    id: '1070',
    number: '1070',
    title: 'State Disaster Emergency Ops',
    subtitle: 'SDMA Emergency Relief Center',
    type: 'helpline',
    primary: false,
    description: 'State disaster emergency operations center for evacuation and relief coordination.',
    iconName: 'Radio'
  },
  {
    id: '1091',
    number: '1091',
    title: 'Women Helpline',
    subtitle: 'National Women Safety Helpline',
    type: 'helpline',
    primary: false,
    description: 'Dedicated 24x7 emergency protection and assistance for women in distress.',
    iconName: 'HeartHandshake'
  },
  {
    id: '1078',
    number: '1078',
    title: 'NDRF Control Room',
    subtitle: 'National Disaster Response Force',
    type: 'helpline',
    primary: false,
    description: 'Specialized disaster rescue team dispatch for floods, earthquakes, and cyclones.',
    iconName: 'LifeBuoy'
  }
];
