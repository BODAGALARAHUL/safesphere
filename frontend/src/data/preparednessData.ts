export interface PreparednessItem {
  id: string;
  category: 'Water & Food' | 'Medical & Safety' | 'Tools & Light' | 'Documents & Cash';
  title: string;
  description: string;
  iconName: string;
  defaultChecked?: boolean;
}

export const PREPAREDNESS_ITEMS: PreparednessItem[] = [
  {
    id: 'prep-water',
    category: 'Water & Food',
    title: 'Drinking Water Supply',
    description: 'Keep at least 3 liters of clean drinking water per person per day (minimum 3-day supply).',
    iconName: 'Droplets',
    defaultChecked: true
  },
  {
    id: 'prep-food',
    category: 'Water & Food',
    title: 'Non-Perishable Food',
    description: 'Ready-to-eat dry rations, biscuits, nuts, energy bars, and canned foods.',
    iconName: 'Utensils',
    defaultChecked: true
  },
  {
    id: 'prep-medical',
    category: 'Medical & Safety',
    title: 'First-Aid & Essential Meds',
    description: 'Bandages, antiseptic solution, pain relievers, ORS sachets, and 7-day personal prescriptions.',
    iconName: 'Cross',
    defaultChecked: true
  },
  {
    id: 'prep-mask',
    category: 'Medical & Safety',
    title: 'Masks & Hygiene Kit',
    description: 'N95 masks, hand sanitizer, soap, moist wipes, and feminine hygiene products.',
    iconName: 'ShieldCheck',
    defaultChecked: true
  },
  {
    id: 'prep-flashlight',
    category: 'Tools & Light',
    title: 'LED Flashlight & Batteries',
    description: 'High-lumen waterproof flashlight with extra fresh batteries or solar charging.',
    iconName: 'Zap',
    defaultChecked: true
  },
  {
    id: 'prep-powerbank',
    category: 'Tools & Light',
    title: 'Charged Power Bank & Cable',
    description: 'At least 10,000mAh charged power bank to keep emergency phones operational.',
    iconName: 'BatteryCharging',
    defaultChecked: true
  },
  {
    id: 'prep-whistle',
    category: 'Tools & Light',
    title: 'Emergency Signal Whistle',
    description: 'High-decibel loud whistle for attracting search and rescue teams if trapped.',
    iconName: 'Volume2',
    defaultChecked: false
  },
  {
    id: 'prep-docs',
    category: 'Documents & Cash',
    title: 'Waterproof Document Vault',
    description: 'Aadhaar, Passport, insurance policies, and medical records in a sealed ziplock bag.',
    iconName: 'FileText',
    defaultChecked: false
  }
];
