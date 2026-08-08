export type SafeZoneType = 'Shelter' | 'Hospital' | 'Police' | 'Fire';

export interface SafeZone {
  id: string;
  name: string;
  type: SafeZoneType;
  distanceKm: number;
  lat: number;
  lng: number;
  address: string;
  area: string;
  status: 'Open · Available' | 'Open · High Demand' | 'Full · Restricted';
  capacityBeds: string;
  facilities: string[];
  contactNumber: string;
  operatingHours: string;
  googleMapsUrl: string;
}

export const MOCK_SAFE_ZONES: SafeZone[] = [
  {
    id: 'safezone-01',
    name: 'Paldi Community Evacuation Shelter',
    type: 'Shelter',
    distanceKm: 1.2,
    lat: 23.0125,
    lng: 72.5642,
    address: 'Opp. Ankur School, Paldi Four Roads',
    area: 'Paldi, Ahmedabad',
    status: 'Open · Available',
    capacityBeds: '145 / 200 beds available',
    facilities: ['Clean Water', 'First Aid Medical Desk', 'LPG Kitchen Facility', 'Backup Generator', 'Document Vault'],
    contactNumber: '+91 79 2657 8899',
    operatingHours: '24x7 Emergency Active',
    googleMapsUrl: 'https://maps.google.com/?q=23.0125,72.5642'
  },
  {
    id: 'safezone-02',
    name: 'SVP Metropolitan Civil Hospital',
    type: 'Hospital',
    distanceKm: 2.4,
    lat: 23.0210,
    lng: 72.5714,
    address: 'Ellisbridge Riverfront Road',
    area: 'Ellisbridge, Ahmedabad',
    status: 'Open · Available',
    capacityBeds: '38 ICU / 120 Emergency beds open',
    facilities: ['24x7 Trauma Center', 'Blood Bank', 'Burn ICU', 'Disaster Triage Unit', 'Helipad'],
    contactNumber: '+91 79 2657 7777',
    operatingHours: '24x7 Emergency Trauma Services',
    googleMapsUrl: 'https://maps.google.com/?q=23.0210,72.5714'
  },
  {
    id: 'safezone-03',
    name: 'Navrangpura Disaster Command & Fire Station',
    type: 'Fire',
    distanceKm: 3.1,
    lat: 23.0368,
    lng: 72.5611,
    address: 'Near Commerce College Circle',
    area: 'Navrangpura, Ahmedabad',
    status: 'Open · Available',
    capacityBeds: 'Water Rescue Boats & 4 Fire Tenders',
    facilities: ['Inflatable Rescue Boats', 'Submersible Pumps', 'High-Angle Rescue Gear', 'Radio Control Tower'],
    contactNumber: '101',
    operatingHours: '24x7 Rescue Dispatch',
    googleMapsUrl: 'https://maps.google.com/?q=23.0368,72.5611'
  },
  {
    id: 'safezone-04',
    name: 'Ellisbridge Police Sector Command',
    type: 'Police',
    distanceKm: 1.8,
    lat: 23.0185,
    lng: 72.5680,
    address: 'Near Ashram Road Crossing',
    area: 'Ellisbridge, Ahmedabad',
    status: 'Open · Available',
    capacityBeds: 'Public Evacuation Coordination Desk',
    facilities: ['Wireless Evacuation Dispatch', 'Law & Order Patrol', 'Crowd Control Desk', 'Emergency Hotlines'],
    contactNumber: '100',
    operatingHours: '24x7 Command Operations',
    googleMapsUrl: 'https://maps.google.com/?q=23.0185,72.5680'
  },
  {
    id: 'safezone-05',
    name: 'Satellite Government Senior Secondary Relief Center',
    type: 'Shelter',
    distanceKm: 4.5,
    lat: 23.0298,
    lng: 72.5270,
    address: 'Near Shivranjani Cross Roads',
    area: 'Satellite, Ahmedabad',
    status: 'Open · Available',
    capacityBeds: '210 / 300 beds available',
    facilities: ['Community Meals', 'Child Care Space', 'Drinking Water Filters', 'Medical Camp'],
    contactNumber: '+91 79 2686 1122',
    operatingHours: '24x7 Evacuation Relief',
    googleMapsUrl: 'https://maps.google.com/?q=23.0298,72.5270'
  }
];
