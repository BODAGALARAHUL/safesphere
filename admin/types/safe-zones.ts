export interface SafeZoneItem {
  id: string;
  name: string;
  type: 'SHELTER' | 'HOSPITAL' | 'POLICE' | 'FIRE' | 'EMERGENCY_CENTER';
  status: 'AVAILABLE' | 'HIGH_DEMAND' | 'FULL' | 'CLOSED';
  address: string;
  area: string;
  latitude: number;
  longitude: number;
  capacity?: number | null;
  currentOccupancy?: number | null;
  contactNumber?: string | null;
  operatingHours?: string | null;
  facilities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSafeZoneData {
  name: string;
  type: 'SHELTER' | 'HOSPITAL' | 'POLICE' | 'FIRE' | 'EMERGENCY_CENTER';
  status?: 'AVAILABLE' | 'HIGH_DEMAND' | 'FULL' | 'CLOSED';
  address: string;
  area: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  currentOccupancy?: number;
  contactNumber?: string;
  operatingHours?: string;
  facilities?: string[];
}
