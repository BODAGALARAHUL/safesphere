export type SeverityLevel = 'CRITICAL' | 'HIGH_RISK' | 'MODERATE' | 'SAFE';

export interface DisasterAlert {
  id: string;
  disasterType: 'Flood' | 'Cyclone' | 'Earthquake' | 'Heatwave' | 'Landslide' | 'Fire';
  severity: SeverityLevel;
  riskColor: 'red' | 'orange' | 'yellow' | 'green';
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
}

export const MOCK_DISASTER_ALERTS: DisasterAlert[] = [
  {
    id: 'alert-flood-01',
    disasterType: 'Flood',
    severity: 'CRITICAL',
    riskColor: 'red',
    title: 'FLOOD WARNING: Sabarmati River Water Level Rising',
    location: 'Ahmedabad (Paldi, Vasna & Riverfront Low-Lying Zones)',
    issuedAt: '12 min ago',
    timestamp: '2026-08-08T14:54:00Z',
    summary: 'Heavy upstream discharge from Dharoi Dam and torrential rainfall have caused rapid water level elevation near Vasna Barrage.',
    affectedRadius: '3.5 km along Sabarmati banks',
    statusText: 'Active Discharge - Immediate evacuation required for low-lying settlements.',
    actions: [
      'Move to higher ground or designated multi-story evacuation shelters immediately.',
      'Turn off main electricity switch and LPG gas valve before leaving homes.',
      'Keep waterproof emergency kit, essential medicine, and identity documents ready.',
      'Follow official evacuation instructions broadcasted by AMC & SDMA officers.'
    ],
    avoidItems: [
      'Do NOT drive or walk through moving flood water or submerged underpasses.',
      'Avoid standing near electric poles, submerged transformers, or riverbank walkways.',
      'Do not consume untreated tap water or food touched by floodwaters.'
    ],
    nearestSafeZoneId: 'safezone-01',
    officialSource: 'Gujarat State Disaster Management Authority (GSDMA) & AMC'
  },
  {
    id: 'alert-cyclone-02',
    disasterType: 'Cyclone',
    severity: 'HIGH_RISK',
    riskColor: 'orange',
    title: 'CYCLONE WARNING: Deep Depression Intensifying in Arabian Sea',
    location: 'Coastal Gujarat (Kutch, Dwarka & Porbandar)',
    issuedAt: '45 min ago',
    timestamp: '2026-08-08T14:21:00Z',
    summary: 'Gusty winds reaching 85-95 km/h with heavy coastal surge. High risk of severe structural damage and tree uprooting.',
    affectedRadius: 'Coastal belt within 15 km of shoreline',
    statusText: 'High Risk Alert - Storm landfall expected within 6 hours.',
    actions: [
      'Secure loose outdoor roofs, tin sheets, and temporary structures.',
      'Charge cell phones, emergency lights, and power banks.',
      'Stock 3 days of non-perishable food and sealed drinking water.'
    ],
    avoidItems: [
      'Fishermen are strictly advised not to venture into open sea.',
      'Avoid standing under old trees or near large outdoor hoardings.'
    ],
    nearestSafeZoneId: 'safezone-02',
    officialSource: 'India Meteorological Department (IMD)'
  },
  {
    id: 'alert-heat-03',
    disasterType: 'Heatwave',
    severity: 'MODERATE',
    riskColor: 'yellow',
    title: 'WEATHER ADVISORY: Potential Heatwave Conditions (May or May Not Intensify)',
    location: 'Central & Inland Gujarat',
    issuedAt: '2 hours ago',
    timestamp: '2026-08-08T13:06:00Z',
    summary: 'Moderate heat advisory: Temperatures may reach 42°C to 44°C during peak afternoon hours. Stay informed on changing weather patterns.',
    affectedRadius: 'Entire metropolitan area',
    statusText: 'Moderate Risk (Advisory) - Pay attention to afternoon temperature bulletins.',
    actions: [
      'Drink ORS, buttermilk, and clean water frequently even if not thirsty.',
      'Wear loose, light-colored cotton clothing and cover head outdoors.'
    ],
    avoidItems: [
      'Avoid heavy strenuous outdoor physical work during peak sun hours.',
      'Do not leave children or pets inside parked vehicles.'
    ],
    nearestSafeZoneId: 'safezone-03',
    officialSource: 'National Disaster Management Authority (NDMA)'
  }
];
