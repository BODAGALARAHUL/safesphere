export interface ActionStep {
  text: string;
  urgent?: boolean;
}

export interface DisasterGuide {
  id: string;
  disasterType: string;
  title: string;
  summary: string;
  iconName: string;
  severityRisk: string;
  beforeSteps: ActionStep[];
  duringSteps: ActionStep[];
  afterSteps: ActionStep[];
  avoidItems: string[];
}

export const DISASTER_GUIDES: DisasterGuide[] = [
  {
    id: 'guide-flood',
    disasterType: 'Flood',
    title: 'Flood Survival Guide',
    summary: 'Essential emergency steps for rising river levels, urban flooding, and storm surges.',
    iconName: 'Waves',
    severityRisk: 'High Risk in Low-Lying Areas',
    beforeSteps: [
      { text: 'Prepare emergency drinking water (3 liters per person per day).' },
      { text: 'Store essential documents and electronics in sealed waterproof bags.' },
      { text: 'Charge mobile phones, power banks, and flashlights fully.' },
      { text: 'Identify nearest emergency shelter and safe evacuation route.' }
    ],
    duringSteps: [
      { text: 'Move immediately to higher ground or multi-story designated shelter.', urgent: true },
      { text: 'Turn off main electricity switch and LPG gas valves before leaving home.', urgent: true },
      { text: 'Keep phone battery saved for emergency SOS communications.' },
      { text: 'Follow official instructions from GSDMA, AMC, or police.' }
    ],
    afterSteps: [
      { text: 'Do not drink tap water until official safety confirmation.' },
      { text: 'Check home structure for wall cracks or electrical water damage.' },
      { text: 'Disinfect flooded rooms and wear rubber boots before stepping inside.' }
    ],
    avoidItems: [
      'Do NOT walk, swim, or drive through moving floodwaters.',
      'Do NOT touch fallen power lines, electric poles, or submerged transformers.',
      'Avoid flooded underpasses and low-lying railway subways.'
    ]
  },
  {
    id: 'guide-cyclone',
    disasterType: 'Cyclone',
    title: 'Cyclone & High Wind Guide',
    summary: 'Safety actions for severe storms, coastal surge, and gale-force wind gusts.',
    iconName: 'Wind',
    severityRisk: 'Critical in Coastal Regions',
    beforeSteps: [
      { text: 'Secure loose tin roofs, window shutters, and outdoor furniture.' },
      { text: 'Trim heavy tree branches leaning close to house walls or wires.' },
      { text: 'Keep a battery-operated radio tuned to local emergency weather updates.' }
    ],
    duringSteps: [
      { text: 'Stay indoors in a reinforced central room away from windows.', urgent: true },
      { text: 'Disconnect non-essential electrical appliances.', urgent: true },
      { text: 'Beware of the calm "eye of the cyclone"—winds will resume suddenly.' }
    ],
    afterSteps: [
      { text: 'Remain indoors until official broadcast declares the storm over.' },
      { text: 'Watch out for dangling electrical wires or broken glass.' },
      { text: 'Report fallen trees or utility disruptions to municipal authorities.' }
    ],
    avoidItems: [
      'Do NOT venture outdoors during strong wind lulls.',
      'Avoid sheltering under large metal hoardings or old trees.'
    ]
  },
  {
    id: 'guide-earthquake',
    disasterType: 'Earthquake',
    title: 'Earthquake Action Guide',
    summary: 'Immediate drop, cover, and hold procedures for seismic tremors.',
    iconName: 'Activity',
    severityRisk: 'Sudden Onset Threat',
    beforeSteps: [
      { text: 'Anchor heavy furniture, bookshelves, and gas cylinders to walls.' },
      { text: 'Practice "DROP, COVER, HOLD ON" with family members.' },
      { text: 'Keep emergency kit accessible near main exit door.' }
    ],
    duringSteps: [
      { text: 'DROP to your hands and knees immediately.', urgent: true },
      { text: 'COVER your head and neck under a sturdy table or desk.', urgent: true },
      { text: 'HOLD ON until shaking stops completely.', urgent: true },
      { text: 'If outdoors, stay clear of buildings, power lines, and overpasses.' }
    ],
    afterSteps: [
      { text: 'Be prepared for aftershocks—re-evaluate building safety.' },
      { text: 'Use stairs instead of elevators when exiting buildings.' },
      { text: 'Check for gas leaks—if smelled, turn off main valve and open windows.' }
    ],
    avoidItems: [
      'Do NOT run outside while shaking is actively occurring.',
      'Do NOT use elevators or escalators during tremors.'
    ]
  },
  {
    id: 'guide-fire',
    disasterType: 'Fire',
    title: 'Fire & Building Safety Guide',
    summary: 'Evacuation protocol for structural fires and smoke inhalation prevention.',
    iconName: 'Flame',
    severityRisk: 'Immediate High Hazard',
    beforeSteps: [
      { text: 'Locate fire extinguishers and fire exit staircases in your building.' },
      { text: 'Test smoke detectors regularly and clear emergency exit corridors.' }
    ],
    duringSteps: [
      { text: 'Crawl low under smoke to reach the nearest safe fire exit.', urgent: true },
      { text: 'Feel door handles before opening—if hot, do NOT open.', urgent: true },
      { text: 'Call 101 or 112 immediately once outside safely.', urgent: true }
    ],
    afterSteps: [
      { text: 'Do not re-enter a burning building for any reason.' },
      { text: 'Seek immediate medical treatment for burns or smoke inhalation.' }
    ],
    avoidItems: [
      'Do NOT use elevators during a fire evacuation under any circumstances.',
      'Do NOT open doors that feel hot to the touch.'
    ]
  }
];
