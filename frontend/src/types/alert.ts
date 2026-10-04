export type SeverityLevel = 'CRITICAL' | 'HIGH_RISK' | 'MODERATE' | 'SAFE';

export type AlertRiskColor = 'red' | 'orange' | 'yellow' | 'green';

export interface DisasterAlert {
  id: string;
  disasterType: 'Flood' | 'Cyclone' | 'Earthquake' | 'Heatwave' | 'Landslide' | 'Fire';
  severity: SeverityLevel;
  riskColor: AlertRiskColor;
  title: string;
  location: string;
  issuedAt: string;
  timestamp: string;
  summary: string;
  affectedRadius: string;
  statusText: string;
  actions: string[];
  avoidItems: string[];
  nearestSafeZoneId: string;
  officialSource: string;
  translations?: Partial<Record<string, {
    title?: string;
    location?: string;
    summary?: string;
    statusText?: string;
    actions?: string[];
    avoidItems?: string[];
  }>>;
}

export type Alert = DisasterAlert;
