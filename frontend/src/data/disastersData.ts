export type SeverityLevel = 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'SAFE';

export interface DisasterAlert {
  id: string;
  disasterType: 'Flood' | 'Cyclone' | 'Earthquake' | 'Heatwave' | 'Landslide' | 'Fire';
  severity: SeverityLevel;
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
    severity: 'WARNING',
    title: 'CYCLONE ADVISORY: Deep Depression in Arabian Sea',
    location: 'Coastal Gujarat (Kutch, Dwarka & Porbandar)',
    issuedAt: '45 min ago',
    timestamp: '2026-08-08T14:21:00Z',
    summary: 'Gusty winds reaching 65-75 km/h with heavy coastal rainfall. High wave warning issued for fishing vessels.',
    affectedRadius: 'Coastal belt within 15 km of shoreline',
    statusText: 'Elevated Alert - Wind speeds expected to intensify by evening.',
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
    severity: 'ADVISORY',
    title: 'SEVERE HEATWAVE ADVISORY: Peak Temperatures Exceeding 44°C',
    location: 'Central & Inland Gujarat',
    issuedAt: '2 hours ago',
    timestamp: '2026-08-08T13:06:00Z',
    summary: 'Extreme afternoon temperatures expected between 12:00 PM and 4:00 PM. Risk of severe dehydration and heat exhaustion.',
    affectedRadius: 'Entire metropolitan area',
    statusText: 'Active Advisory - Take heat mitigation measures during peak sun hours.',
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
