export interface DisasterAlertItem {
  id: string;
  disasterType: 'FLOOD' | 'CYCLONE' | 'EARTHQUAKE' | 'LANDSLIDE' | 'FIRE';
  severity: 'CRITICAL' | 'HIGH_RISK' | 'MODERATE' | 'SAFE';
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  affectedRadiusKm: number;
  summary: string;
  actions: string[];
  avoidItems: string[];
  status: 'ACTIVE' | 'RESOLVED' | 'EXPIRED';
  officialSource?: string | null;
  riskColor?: string | null;
  issuedAt: string;
  resolvedAt?: string | null;
}

export interface CreateAlertData {
  disasterType: 'FLOOD' | 'CYCLONE' | 'EARTHQUAKE' | 'LANDSLIDE' | 'FIRE';
  severity: 'CRITICAL' | 'HIGH_RISK' | 'MODERATE' | 'SAFE';
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  affectedRadiusKm: number;
  summary: string;
  actions: string[];
  avoidItems: string[];
  officialSource?: string;
  riskColor?: string;
}
