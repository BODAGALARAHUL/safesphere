import type { SectorOption } from '@/types';

export const GUJARAT_SECTORS: SectorOption[] = [
  {
    id: 'ahmedabad-paldi',
    name: 'Ahmedabad · Paldi',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    coordinates: { latitude: 23.0125, longitude: 72.5642 },
    description: 'Sabarmati River Basin Low-Lying Sector · Flood Watch Zone',
    isDefault: true,
  },
  {
    id: 'ahmedabad-vasna',
    name: 'Ahmedabad · Vasna',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    coordinates: { latitude: 22.9985, longitude: 72.5510 },
    description: 'Vasna Barrage Downstream Sector · Evacuation Route Corridor',
  },
  {
    id: 'ahmedabad-satellite',
    name: 'Ahmedabad · Satellite',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    coordinates: { latitude: 23.0298, longitude: 72.5270 },
    description: 'High-Ground Western Residential Sector & Relief Centers',
  },
  {
    id: 'ahmedabad-ellisbridge',
    name: 'Ahmedabad · Ellisbridge',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    coordinates: { latitude: 23.0210, longitude: 72.5714 },
    description: 'SVP Hospital Medical Triage & Riverfront East Sector',
  },
  {
    id: 'vadodara-central',
    name: 'Vadodara · Central',
    city: 'Vadodara',
    district: 'Vadodara',
    coordinates: { latitude: 22.3072, longitude: 73.1812 },
    description: 'Vishwamitri River Basin · Inland Heat & Urban Relief Zone',
  },
  {
    id: 'surat-athwa',
    name: 'Surat · Athwa',
    city: 'Surat',
    district: 'Surat',
    coordinates: { latitude: 21.1702, longitude: 72.8311 },
    description: 'Tapi River Estuary & Coastal High-Wind Corridor',
  },
  {
    id: 'kutch-bhuj',
    name: 'Kutch · Bhuj',
    city: 'Bhuj',
    district: 'Kutch',
    coordinates: { latitude: 23.2420, longitude: 69.6669 },
    description: 'Kutch Mainland Seismic Fault & Coastal Storm Sector',
  },
  {
    id: 'panchmahal-pavagadh',
    name: 'Panchmahal · Pavagadh',
    city: 'Pavagadh',
    district: 'Panchmahal',
    coordinates: { latitude: 22.4633, longitude: 73.5333 },
    description: 'Pavagadh Hill Corridor · Slope Instability & Landslide Watch',
  },
];

export const DEFAULT_SECTOR = GUJARAT_SECTORS[0];
