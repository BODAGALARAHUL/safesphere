import {
  PrismaClient,
  UserRole,
  UserStatus,
  DisasterType,
  AlertSeverity,
  AlertStatus,
  SafeZoneType,
  SafeZoneStatus,
  PrepCategory,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting SafeSphere database seed...');

  // 1. Seed Core Disasters
  const disastersData = [
    {
      type: DisasterType.FLOOD,
      name: 'River & Urban Floods',
      description: 'Rising water levels, river overflow, and severe water-logging in low-lying settlements.',
      iconName: 'Waves',
    },
    {
      type: DisasterType.CYCLONE,
      name: 'Tropical Cyclones & Storm Surges',
      description: 'High-speed destructive winds, torrential rainfall, and coastal surge hazards.',
      iconName: 'Wind',
    },
    {
      type: DisasterType.EARTHQUAKE,
      name: 'Earthquake & Seismic Shocks',
      description: 'Sudden ground displacement, building structural damage, and seismic aftershocks.',
      iconName: 'Activity',
    },
    {
      type: DisasterType.LANDSLIDE,
      name: 'Hill Slope & Mud Slides',
      description: 'Rapid movement of rock, earth debris, and hillside slope failures.',
      iconName: 'Mountain',
    },
    {
      type: DisasterType.FIRE,
      name: 'Industrial & Urban Fires',
      description: 'Major residential, commercial, or chemical hazardous material fires.',
      iconName: 'Flame',
    },
  ];

  const disasterMap = new Map<DisasterType, string>();

  for (const item of disastersData) {
    const d = await prisma.disaster.upsert({
      where: { type: item.type },
      update: { name: item.name, description: item.description, iconName: item.iconName },
      create: item,
    });
    disasterMap.set(d.type, d.id);
  }

  // 2. Seed Survival Guidance
  const guides = [
    {
      disasterType: DisasterType.FLOOD,
      disasterId: disasterMap.get(DisasterType.FLOOD),
      title: 'Flood Survival & Evacuation Guide',
      summary: 'Essential emergency steps for rising river levels, dam discharge, and urban waterlogging.',
      severityRisk: 'High Risk in Low-Lying Zones',
      iconName: 'Waves',
      beforeSteps: [
        { text: 'Prepare emergency drinking water (3 liters per person per day).' },
        { text: 'Store essential documents and electronics in sealed waterproof bags.' },
        { text: 'Charge mobile phones, power banks, and flashlights fully.' },
        { text: 'Identify nearest emergency shelter and safe evacuation route.' },
      ],
      duringSteps: [
        { text: 'Move immediately to higher ground or multi-story designated shelter.', urgent: true },
        { text: 'Turn off main electricity switch and LPG gas valves before leaving home.', urgent: true },
        { text: 'Keep phone battery saved for emergency SOS communications.' },
        { text: 'Follow official instructions broadcasted by GSDMA, AMC, or police.' },
      ],
      afterSteps: [
        { text: 'Do not drink tap water until official safety confirmation.' },
        { text: 'Check home structure for wall cracks or electrical water damage.' },
        { text: 'Disinfect flooded rooms and wear rubber boots before stepping inside.' },
      ],
      avoidItems: [
        'Do NOT walk, swim, or drive through moving floodwaters.',
        'Do NOT touch fallen power lines, electric poles, or submerged transformers.',
        'Avoid flooded underpasses and low-lying railway subways.',
      ],
    },
    {
      disasterType: DisasterType.CYCLONE,
      disasterId: disasterMap.get(DisasterType.CYCLONE),
      title: 'Cyclone & High Wind Protocol',
      summary: 'Protection measures against extreme wind speeds, flying debris, and storm surges.',
      severityRisk: 'Severe Wind Damage',
      iconName: 'Wind',
      beforeSteps: [
        { text: 'Secure loose roof tiles, tin sheets, and outdoor furniture.' },
        { text: 'Board up or tape glass window panes in cross patterns.' },
        { text: 'Stock minimum 72-hour non-perishable food rations and dry snacks.' },
      ],
      duringSteps: [
        { text: 'Stay indoors away from glass windows, skylights, and outer doors.', urgent: true },
        { text: 'Unplug electrical appliances to avoid storm surge short-circuits.', urgent: true },
        { text: 'Beware of the cyclone eye: calm weather is temporary before wind reverses.' },
      ],
      afterSteps: [
        { text: 'Wait for official all-clear signal from meteorological department.' },
        { text: 'Watch for broken glass, hanging live cables, and unstable tree branches.' },
      ],
      avoidItems: [
        'Do NOT venture out during the temporary calm of the storm eye.',
        'Do NOT shelter under tin roofs, hoardings, or solitary trees.',
      ],
    },
  ];

  for (const guide of guides) {
    await prisma.disasterGuide.upsert({
      where: { disasterType: guide.disasterType },
      update: guide,
      create: guide,
    });
  }

  // 3. Seed Safe Zones
  const safeZones = [
    {
      name: 'Paldi Community Evacuation Shelter',
      type: SafeZoneType.SHELTER,
      latitude: 23.0125,
      longitude: 72.5642,
      address: 'Opp. Ankur School, Paldi Four Roads',
      area: 'Paldi, Ahmedabad',
      status: SafeZoneStatus.AVAILABLE,
      capacityBeds: '145 / 200 beds available',
      facilities: ['Clean Water', 'First Aid Medical Desk', 'LPG Kitchen Facility', 'Backup Generator', 'Document Vault'],
      contactNumber: '+91 79 2657 8899',
      operatingHours: '24x7 Emergency Active',
      googleMapsUrl: 'https://maps.google.com/?q=23.0125,72.5642',
    },
    {
      name: 'SVP Metropolitan Civil Hospital',
      type: SafeZoneType.HOSPITAL,
      latitude: 23.021,
      longitude: 72.5714,
      address: 'Ellisbridge Riverfront Road',
      area: 'Ellisbridge, Ahmedabad',
      status: SafeZoneStatus.AVAILABLE,
      capacityBeds: '38 ICU / 120 Emergency beds open',
      facilities: ['24x7 Trauma Center', 'Blood Bank', 'Burn ICU', 'Disaster Triage Unit', 'Helipad'],
      contactNumber: '+91 79 2657 7777',
      operatingHours: '24x7 Emergency Trauma Services',
      googleMapsUrl: 'https://maps.google.com/?q=23.0210,72.5714',
    },
    {
      name: 'Navrangpura Disaster Command & Fire Station',
      type: SafeZoneType.FIRE,
      latitude: 23.0368,
      longitude: 72.5611,
      address: 'Near Commerce College Circle',
      area: 'Navrangpura, Ahmedabad',
      status: SafeZoneStatus.AVAILABLE,
      capacityBeds: 'Rescue Boats & Hydraulic Ladders Ready',
      facilities: ['Inflatable Rescue Boats', 'Dewatering Pumps', 'High-Tree Cutters', 'Search & Rescue Unit'],
      contactNumber: '+91 79 2644 1010',
      operatingHours: '24x7 Emergency Fire Rescue',
      googleMapsUrl: 'https://maps.google.com/?q=23.0368,72.5611',
    },
  ];

  for (const zone of safeZones) {
    const existingZone = await prisma.safeZone.findFirst({ where: { name: zone.name } });
    if (!existingZone) {
      await prisma.safeZone.create({ data: zone });
    }
  }

  // 4. Seed Preparedness Templates
  const prepTemplates = [
    {
      category: PrepCategory.WATER_FOOD,
      title: 'Drinking Water Supply',
      description: 'Keep at least 3 liters of clean drinking water per person per day (minimum 3-day supply).',
      iconName: 'Droplets',
      isDefault: true,
      orderIndex: 1,
    },
    {
      category: PrepCategory.WATER_FOOD,
      title: 'Non-Perishable Food',
      description: 'Ready-to-eat dry rations, biscuits, nuts, energy bars, and canned foods.',
      iconName: 'Utensils',
      isDefault: true,
      orderIndex: 2,
    },
    {
      category: PrepCategory.MEDICAL_SAFETY,
      title: 'Comprehensive First-Aid Kit',
      description: 'Antiseptic lotion, sterile bandages, burn ointment, pain relief, and prescription medicines.',
      iconName: 'HeartPulse',
      isDefault: true,
      orderIndex: 3,
    },
    {
      category: PrepCategory.TOOLS_LIGHT,
      title: 'LED Flashlight & Batteries',
      description: 'Heavy-duty waterproof torch with 2 extra sets of fresh alkaline batteries.',
      iconName: 'Flashlight',
      isDefault: true,
      orderIndex: 4,
    },
    {
      category: PrepCategory.TOOLS_LIGHT,
      title: 'High-Capacity Power Bank',
      description: 'Fully charged 20,000mAh portable battery pack for mobile communication.',
      iconName: 'BatteryCharging',
      isDefault: true,
      orderIndex: 5,
    },
    {
      category: PrepCategory.DOCUMENTS_CASH,
      title: 'Waterproof Document Pouch',
      description: 'Aadhaar, voter ID, property papers, insurance, and emergency cash.',
      iconName: 'FileText',
      isDefault: true,
      orderIndex: 6,
    },
  ];

  for (const item of prepTemplates) {
    const existingItem = await prisma.preparednessTemplate.findFirst({ where: { title: item.title } });
    if (!existingItem) {
      await prisma.preparednessTemplate.create({ data: item });
    }
  }

  // 5. Seed Default Accounts (Admin, Operator, Citizen)
  const defaultPasswordHash = await bcrypt.hash('SafeSphere@2026', 10);

  const usersToSeed = [
    {
      email: 'admin@safesphere.gov.in',
      phone: '+919900000001',
      role: UserRole.ADMIN,
      name: 'Chief Disaster Administrator',
    },
    {
      email: 'operator@gsdma.gov.in',
      phone: '+919900000002',
      role: UserRole.DISASTER_OPERATOR,
      name: 'SDMA Operations Officer',
    },
    {
      email: 'citizen@safesphere.in',
      phone: '+919900000003',
      role: UserRole.CITIZEN,
      name: 'Rahul Bodagala',
    },
  ];

  for (const user of usersToSeed) {
    const existing = await prisma.user.findUnique({ where: { email: user.email } });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: user.email,
          phone: user.phone,
          passwordHash: defaultPasswordHash,
          role: user.role,
          status: UserStatus.ACTIVE,
          profile: {
            create: {
              name: user.name,
              preferredLanguage: 'en',
              location: 'Paldi, Ahmedabad',
            },
          },
        },
      });
    }
  }

  // 6. Seed Active Broadcast Alert
  const existingAlert = await prisma.disasterAlert.findFirst({
    where: { title: { contains: 'Sabarmati River Water Level Rising' } },
  });

  if (!existingAlert) {
    await prisma.disasterAlert.create({
      data: {
        disasterId: disasterMap.get(DisasterType.FLOOD),
        disasterType: DisasterType.FLOOD,
        severity: AlertSeverity.CRITICAL,
        riskColor: 'red',
        title: 'FLOOD WARNING: Sabarmati River Water Level Rising',
        location: 'Ahmedabad (Paldi, Vasna & Riverfront Low-Lying Zones)',
        latitude: 23.0125,
        longitude: 72.5642,
        affectedRadiusKm: 3.5,
        summary: 'Heavy upstream discharge from Dharoi Dam and torrential rainfall have caused rapid water level elevation near Vasna Barrage.',
        actions: [
          'Move to higher ground or designated multi-story evacuation shelters immediately.',
          'Turn off main electricity switch and LPG gas valve before leaving homes.',
          'Keep waterproof emergency kit, essential medicine, and identity documents ready.',
        ],
        avoidItems: [
          'Do NOT drive or walk through moving flood water or submerged underpasses.',
          'Avoid standing near electric poles, submerged transformers, or riverbank walkways.',
        ],
        status: AlertStatus.ACTIVE,
        officialSource: 'Gujarat State Disaster Management Authority (GSDMA) & AMC',
      },
    });
  }

  console.log('✅ SafeSphere database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
