export type SafeZoneType = 'Shelter' | 'Hospital' | 'Police' | 'Fire' | 'EmergencyCenter';

export type SafeZoneStatus = 'Open · Available' | 'Open · High Demand' | 'Full · Restricted' | 'Closed';

export interface SafeZone {
  id: string;
  name: string;
  type: SafeZoneType;
  distanceKm: number;
  lat: number;
  lng: number;
  address: string;
  area: string;
  status: SafeZoneStatus;
  capacityBeds: string;
  facilities: string[];
  contactNumber: string;
  operatingHours: string;
  googleMapsUrl: string;
}
