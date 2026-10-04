import { SupportedLanguage } from './translationsData';
import type { ActionStep, DisasterGuide } from '@/types';

export type { ActionStep, DisasterGuide };

export const DISASTER_GUIDES: DisasterGuide[] = [
  {
    id: 'flood',
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
    ],
    translations: {
      hi: {
        title: 'बाढ़ उत्तरजीविता गाइड',
        summary: 'बढ़ते नदी जलस्तर और शहरी बाढ़ के लिए आवश्यक आपातकालीन कदम।',
        severityRisk: 'निचले इलाकों में उच्च जोखिम',
        beforeSteps: [
          { text: 'आपातकालीन पीने का पानी तैयार रखें (प्रति व्यक्ति 3 लीटर प्रतिदिन)।' },
          { text: 'जरूरी दस्तावेजों को वाटरप्रूफ बैग में रखें।' },
          { text: 'मोबाइल फोन और पावर बैंक पूरी तरह चार्ज रखें।' },
          { text: 'निकटतम आश्रय स्थल और सुरक्षित मार्ग की पहचान करें।' }
        ],
        duringSteps: [
          { text: 'तुरंत ऊंचे स्थानों या बहुमंजिला आश्रय में जाएं।', urgent: true },
          { text: 'घर छोड़ने से पहले मुख्य बिजली और गैस बंद करें।', urgent: true },
          { text: 'फोन की बैटरी बचाकर रखें।' }
        ],
        afterSteps: [
          { text: 'सुरक्षा पुष्टि तक नल का पानी न पीएं।' },
          { text: 'कमरों को कीटाणुरहित करें और रबड़ के जूते पहनें।' }
        ],
        avoidItems: [
          'बहते पानी में गाड़ी न चलाएं।',
          'बिजली के खंभों को न छुएं।'
        ]
      },
      te: {
        title: 'వరదల రక్షణ మార్గదర్శి',
        summary: 'నదీ నీటి మట్టాలు పెరిగినప్పుడు, పట్టణ వరదల సమయంలో పాటించాల్సిన సూచనలు.',
        severityRisk: 'లోతట్టు ప్రాంతాల్లో అధిక ప్రమాదం',
        beforeSteps: [
          { text: 'తాగునీరు (వ్యక్తికి రోజుకు 3 లీటర్లు) సిద్ధంగా ఉంచుకోండి.' },
          { text: 'ముఖ్యమైన పత్రాలను వాటర్‌ప్రూఫ్ కవర్లలో భద్రపరచండి.' },
          { text: 'ఫోన్లు, పవర్ బ్యాంకులు పూర్తిగా చార్జ్ చేయండి.' },
          { text: 'సమీపంలోని పునరావాస కేంద్రాన్ని గుర్తించండి.' }
        ],
        duringSteps: [
          { text: 'వెంటనే ఎత్తైన ప్రాంతాలకు లేదా బహుళ అంతస్తుల కేంద్రాలకు వెళ్లండి.', urgent: true },
          { text: 'ఇల్లు వదిలే ముందు మెయిన్ కరెంట్ స్విచ్, గ్యాస్ బంద్ చేయండి.', urgent: true },
          { text: 'ఫోన్ బ్యాటరీని అత్యవసర సంప్రదింపుల కోసం దాచుకోండి.' }
        ],
        afterSteps: [
          { text: 'అధికారిక ప్రకటన వచ్చేవరకు నల్లా నీటిని తాగవద్దు.' },
          { text: 'రబ్బరు బూట్లు ధరించి నీటితో మునిగిన గదులను శుభ్రం చేయండి.' }
        ],
        avoidItems: [
          'వరద నీటిలో నడవద్దు, ఈత కొట్టవద్దు, వాహనాలు నడపవద్దు.',
          'కరెంట్ స్తంభాలు, ట్రాన్స్‌ఫార్మర్లను తాకవద్దు.'
        ]
      }
    }
  },
  {
    id: 'cyclone',
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
    ],
    translations: {
      hi: {
        title: 'चक्रवात और तेज हवा सुरक्षा गाइड',
        summary: 'तीव्र तूफान और तटीय लहरों के लिए सुरक्षा उपाय।',
        severityRisk: 'तटीय क्षेत्रों में गंभीर खतरा',
        beforeSteps: [
          { text: 'टीन की छतों और खिड़कियों को कसकर बंद करें।' },
          { text: 'पेड़ों की भारी शाखाओं की छंटाई करें।' }
        ],
        duringSteps: [
          { text: 'खिड़कियों से दूर घर के केंद्रीय कमरे में रहें।', urgent: true }
        ],
        afterSteps: [
          { text: 'तूफान समाप्त होने की घोषणा तक अंदर रहें।' }
        ],
        avoidItems: [
          'तेज हवा के समय बाहर न निकलें।'
        ]
      },
      te: {
        title: 'తుఫాను & గాలుల రక్షణ మార్గదర్శి',
        summary: 'తీవ్ర తుఫానులు, తీరప్రాంత గాలుల సమయంలో తీసుకోవాల్సిన జాగ్రత్తలు.',
        severityRisk: 'తీరప్రాంతాల్లో అత్యంత ప్రమాదకరం',
        beforeSteps: [
          { text: 'ఇంటి కప్పు రేకులు, కిటికీలను గట్టిగా మూసివేయండి.' },
          { text: 'చెట్ల కొమ్మలను నరికివేయండి.' }
        ],
        duringSteps: [
          { text: 'కిటికీలకు దూరంగా లోపలి గదిలోనే ఉండండి.', urgent: true }
        ],
        afterSteps: [
          { text: 'తుఫాను పూర్తయిందని ప్రకటించే వరకు లోపలే ఉండండి.' }
        ],
        avoidItems: [
          'ఈదురు గాలుల సమయంలో బయటకు వెళ్లవద్దు.'
        ]
      }
    }
  },
  {
    id: 'earthquake',
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
    ],
    translations: {
      hi: {
        title: 'भूकंप सुरक्षा गाइड',
        summary: 'भूकंप के झटकों के दौरान तुरंत झुकें, ढकें और पकड़े रहें।',
        severityRisk: 'अचानक उत्पन्न होने वाला खतरा',
        beforeSteps: [
          { text: 'भारी फर्नीचर को दीवारों से बांधें।' }
        ],
        duringSteps: [
          { text: 'तुरंत नीचे बैठें और मजबूत टेबल के नीचे सिर ढकें।', urgent: true }
        ],
        afterSteps: [
          { text: 'आफ्टरशॉक्स के लिए तैयार रहें।' }
        ],
        avoidItems: [
          'झटकों के दौरान बाहर न भागें।'
        ]
      },
      te: {
        title: 'భూకంప రక్షణ మార్గదర్శి',
        summary: 'భూకంప ప్రకంపనలు వచ్చినప్పుడు పాటించాల్సిన తక్షణ రక్షణ చర్యలు.',
        severityRisk: 'అకస్మాత్తుగా వచ్చే ప్రమాదం',
        beforeSteps: [
          { text: 'బరువైన ఫర్నిచర్‌ను గోడలకు బిగించండి.' }
        ],
        duringSteps: [
          { text: 'కిందకు వంగి గట్టి బల్ల కింద తలను దాచుకోండి.', urgent: true }
        ],
        afterSteps: [
          { text: 'తర్వాత వచ్చే ప్రకంపనల పట్ల జాగ్రత్తగా ఉండండి.' }
        ],
        avoidItems: [
          'ప్రకంపనల సమయంలో బయటకు పరుగెత్తవద్దు.'
        ]
      }
    }
  },
  {
    id: 'landslide',
    disasterType: 'Landslide',
    title: 'Landslide & Slope Safety Guide',
    summary: 'Essential safety protocols for slope instability, mudflows, debris surges, and rockfalls.',
    iconName: 'Mountain',
    severityRisk: 'High Risk in Hilly & Slope Terrain',
    beforeSteps: [
      { text: 'Monitor weather alerts and official landslide warnings from GSDMA & Geological Survey.' },
      { text: 'Identify whether your home or transit route is near steep slopes, cliffs, or drainage ravines.' },
      { text: 'Map out multiple uphill and perpendicular evacuation routes away from debris paths.' },
      { text: 'Keep a 72-hour survival kit with medications, emergency whistle, and torch ready.' },
      { text: 'Store critical identity and property documents in sealed waterproof pouches.' },
      { text: 'Prepare emergency contacts and agree on a family reunification plan.' }
    ],
    duringSteps: [
      { text: 'Evacuate immediately if authorities advise or if you hear unusual rumbling sounds.', urgent: true },
      { text: 'Move quickly away from the path of debris, drainage ravines, and unstable slopes.', urgent: true },
      { text: 'Do NOT attempt to cross active landslide debris or mudflows on foot or by vehicle.', urgent: true },
      { text: 'Stay alert for secondary landslides and flash floods caused by blocked streams.', urgent: true },
      { text: 'Avoid roads and bridges affected by mud deposits or structural cracking.' },
      { text: 'Call 112 or blow an emergency whistle if trapped or injured.' }
    ],
    afterSteps: [
      { text: 'Do not return to evacuated hillside areas until declared completely safe by authorities.' },
      { text: 'Watch out for secondary slides and ground instability following heavy downpours.' },
      { text: 'Avoid damaged roads, cracked retaining walls, bridges, and downed electrical lines.' },
      { text: 'Report new ground fissures, tilted utility poles, and blocked culverts to control rooms.' },
      { text: 'Check on family members, neighbors, and vulnerable citizens.' },
      { text: 'Follow official emergency radio broadcasts and advisories.' }
    ],
    avoidItems: [
      'Do NOT attempt to walk or drive through moving mudflow or landslide debris.',
      'Do NOT shelter in low-lying valley bottoms or river ravines below steep slopes.',
      'Avoid traveling along hillside highways during and immediately following intense downpours.',
      'Do NOT enter cracked or visibly shifting hillside buildings.'
    ],
    translations: {
      hi: {
        title: 'भूस्खलन सुरक्षा गाइड',
        summary: 'ढलान अस्थिरता, मलबे के बहाव और चट्टान गिरने से बचाव के लिए आवश्यक निर्देश।',
        severityRisk: 'पहाड़ी और ढलान वाले क्षेत्रों में उच्च जोखिम',
        beforeSteps: [
          { text: 'मौसम की चेतावनियों और आधिकारिक भूस्खलन बुलेटिन पर नज़र रखें।' },
          { text: 'पहचानें कि क्या आपका घर या मार्ग ढलान या जल निकासी नालों के पास है।' },
          { text: 'मलबे के रास्ते से दूर ऊंचे निकासी मार्गों की पहचान करें।' },
          { text: 'दवाओं और टॉर्च के साथ 72 घंटे की आपातकालीन किट तैयार रखें।' },
          { text: 'महत्वपूर्ण दस्तावेजों को वाटरप्रूफ बैग में रखें।' },
          { text: 'आपातकालीन संपर्कों की सूची तैयार रखें।' }
        ],
        duringSteps: [
          { text: 'प्रशासन के निर्देश पर या गड़गड़ाहट की आवाज सुनते ही तुरंत सुरक्षित स्थान पर जाएं।', urgent: true },
          { text: 'मलबे और नालों के रास्ते से दूर हटें।', urgent: true },
          { text: 'सक्रिय भूस्खलन मलबे या कीचड़ के बहाव को पार करने की कोशिश न करें।', urgent: true },
          { text: 'द्वितीयक भूस्खलन और जलभराव के प्रति सतर्क रहें।', urgent: true },
          { text: 'क्षतिग्रस्त सड़कों और पुलों से बचें।' },
          { text: 'फंसने पर 112 डायल करें या सीटी बजाएं।' }
        ],
        afterSteps: [
          { text: 'प्रशासन द्वारा सुरक्षित घोषित किए जाने तक पहाड़ी क्षेत्र में वापस न जाएं।' },
          { text: 'भारी बारिश के बाद दोबारा होने वाले भूस्खलन से सावधान रहें।' },
          { text: 'क्षतिग्रस्त सड़कों, झुके हुए बिजली के खंभों और टूटी दीवारों से दूर रहें।' },
          { text: 'जमीन में नई दरारों की सूचना नियंत्रण कक्ष को दें।' },
          { text: 'परिवार और पड़ोसियों की सुरक्षा जांचें।' },
          { text: 'आधिकारिक निर्देशों का पालन करें।' }
        ],
        avoidItems: [
          'बहते मलबे या कीचड़ में गाड़ी न चलाएं।',
          'ढलान के नीचे घाटी या नालों में आश्रय न लें।',
          'भारी बारिश के दौरान पहाड़ी रास्तों पर यात्रा से बचें।'
        ]
      },
      te: {
        title: 'కొండచరియలు విరిగిపడే ప్రమాద రక్షణ మార్గదర్శి',
        summary: 'కొండచరియలు, మట్టి ప్రవాహాలు మరియు రాళ్లు పడే సమయాల్లో తీసుకోవాల్సిన రక్షణ చర్యలు.',
        severityRisk: 'కొండ ప్రాంతాల్లో అధిక ప్రమాదం',
        beforeSteps: [
          { text: 'వాతావరణ హెచ్చరికలు మరియు అధికారిక సమాచారాన్ని గమనించండి.' },
          { text: 'మీ ఇల్లు లేదా ప్రయాణ మార్గం వాలు ప్రాంతాల్లో ఉందో లేదో తెలుసుకోండి.' },
          { text: 'మట్టి ప్రవాహ మార్గాలకు దూరంగా ఉండే పునరావాస మార్గాలను గుర్తించండి.' },
          { text: '72 గంటల ఎమర్జెన్సీ కిట్‌ను సిద్ధంగా ఉంచుకోండి.' },
          { text: 'ముఖ్యమైన పత్రాలను భద్రపరచండి.' }
        ],
        duringSteps: [
          { text: 'అధికారులు హెచ్చరించినప్పుడు వెంటనే సురక్షిత ప్రాంతాలకు వెళ్లండి.', urgent: true },
          { text: 'కొండచరియల ప్రవాహ మార్గానికి దూరంగా ఉండండి.', urgent: true },
          { text: 'మట్టి ప్రవాహాలను దాటే ప్రయత్నం చేయవద్దు.', urgent: true },
          { text: 'రెండవసారి వచ్చే ప్రమాదాల పట్ల అప్రమత్తంగా ఉండండి.', urgent: true },
          { text: 'చిక్కుకుంటే 112 కు కాల్ చేయండి.' }
        ],
        afterSteps: [
          { text: 'అధికారిక అనుమతి వచ్చేవరకు కొండ ప్రాంతాలకు తిరిగి వెళ్లవద్దు.' },
          { text: 'దెబ్బతిన్న రోడ్లు, విద్యుత్ లైన్ల వద్దకు వెళ్లవద్దు.' },
          { text: 'నేల పగుళ్లు కనిపిస్తే అధికారులకు తెలియజేయండి.' }
        ],
        avoidItems: [
          'కదులుతున్న మట్టి ప్రవాహాలలో వాహనాలు నడపవద్దు.',
          'కొండల కింద లోయల్లో ఆశ్రయం పొందవద్దు.'
        ]
      }
    }
  },
  {
    id: 'fire',
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
    ],
    translations: {
      hi: {
        title: 'अग्नि सुरक्षा और निकासी गाइड',
        summary: 'आग लगने और धुएं से बचाव के लिए आपातकालीन कदम।',
        severityRisk: 'तत्काल उच्च खतरा',
        beforeSteps: [
          { text: 'अग्निशामक यंत्रों की स्थिति जानें।' }
        ],
        duringSteps: [
          { text: 'धुएं में नीचे झुककर बाहर निकलें।', urgent: true }
        ],
        afterSteps: [
          { text: 'जलती इमारत में वापस न जाएं।' }
        ],
        avoidItems: [
          'आग लगने पर लिफ्ट का उपयोग न करें।'
        ]
      },
      te: {
        title: 'అగ్నిప్రమాద రక్షణ మార్గదర్శి',
        summary: 'భవనాల్లో అగ్నిప్రమాదం జరిగినప్పుడు బయటపడే రక్షణ సూచనలు.',
        severityRisk: 'తక్షణ ప్రమాదం',
        beforeSteps: [
          { text: 'ఫైర్ ఎక్స్‌టింగిషర్లు ఉన్న ప్రాంతాలను గుర్తించండి.' }
        ],
        duringSteps: [
          { text: 'పొగ ఉన్నప్పుడు నేలపై పడుకుని బయటకు పాకండి.', urgent: true }
        ],
        afterSteps: [
          { text: 'కాలుతున్న భవనంలోకి మళ్లీ వెళ్లవద్దు.' }
        ],
        avoidItems: [
          'అగ్నిప్రమాద సమయంలో లిఫ్ట్ ఉపయోగించవద్దు.'
        ]
      }
    }
  }
];

export function getGuideBySlug(slug: string): DisasterGuide | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase().replace(/^guide-/, '');
  return DISASTER_GUIDES.find(
    g => g.id.toLowerCase() === normalized ||
         g.id.toLowerCase() === `guide-${normalized}` ||
         g.disasterType.toLowerCase() === normalized
  );
}

export function getLocalizedGuidance(guide: DisasterGuide, lang: SupportedLanguage): DisasterGuide {
  if (!guide.translations || !guide.translations[lang]) {
    return guide;
  }
  const tData = guide.translations[lang]!;
  return {
    ...guide,
    title: tData.title || guide.title,
    summary: tData.summary || guide.summary,
    severityRisk: tData.severityRisk || guide.severityRisk,
    beforeSteps: tData.beforeSteps || guide.beforeSteps,
    duringSteps: tData.duringSteps || guide.duringSteps,
    afterSteps: tData.afterSteps || guide.afterSteps,
    avoidItems: tData.avoidItems || guide.avoidItems,
  };
}
