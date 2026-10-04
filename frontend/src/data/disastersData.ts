import { SupportedLanguage } from './translationsData';
import type { SeverityLevel, AlertRiskColor, DisasterAlert } from '@/types';

export type { SeverityLevel, AlertRiskColor, DisasterAlert };

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
    officialSource: 'Gujarat State Disaster Management Authority (GSDMA) & AMC',
    translations: {
      hi: {
        title: 'बाढ़ की चेतावनी: साबरमती नदी का जलस्तर तेजी से बढ़ रहा है',
        location: 'अहमदाबाद (पालडी, वासना और रिवरफ्रंट निचले इलाके)',
        summary: 'धरोई बांध से भारी पानी छोड़े जाने और मूसलाधार बारिश के कारण वासना बैराज के पास जलस्तर तेजी से बढ़ा है।',
        statusText: 'सक्रिय निकासी - निचले इलाकों से तुरंत सुरक्षित स्थान पर जाएं।',
        actions: [
          'तुरंत ऊंचे स्थानों या बहुमंजिला निकासी आश्रयों में जाएं।',
          'घर छोड़ने से पहले मुख्य बिजली स्विच और एलपीजी गैस वाल्व बंद करें।',
          'वाटरप्रूफ आपातकालीन किट, आवश्यक दवाएं और पहचान पत्र तैयार रखें।',
          'अधिकारियों द्वारा प्रसारित निकासी निर्देशों का पालन करें।'
        ],
        avoidItems: [
          'बहते पानी या जलमग्न अंडरपास में गाड़ी न चलाएं और न ही चलें।',
          'बिजली के खंभों, जलमग्न ट्रांसफार्मरों या नदी के किनारों के पास न खड़े हों।',
          'अपरिष्कृत नल के पानी या बाढ़ के पानी से छुए गए भोजन का सेवन न करें।'
        ]
      },
      gu: {
        title: 'પૂરની ચેતવણી: સાબરમતી નદીની જળસપાટીમાં ઝડપી વધારો',
        location: 'અમદાવાદ (પાલડી, વાસણા અને રિવરફ્રન્ટ નીચાણવાળા વિસ્તારો)',
        summary: 'ધરોઈ ડેમમાંથી ભારે પાણી છોડાતા અને મુસળધાર વરસાદને કારણે વાસણા બેરેજ પાસે જળસપાટી ઝડપથી વધી રહી છે.',
        statusText: 'સક્રિય પાણી છોડવું - નીચાણવાળા વિસ્તારોમાંથી તુરંત સ્થળાંતર જરૂરી.',
        actions: [
          'તુરંત ઊંચા સ્થળોએ અથવા સરકારી આશ્રયસ્થાનોમાં ખસી જાઓ.',
          'ઘર છોડતા પહેલા મુખ્ય વીજળી સ્વિચ અને ગેસ વાલ્વ બંધ કરો.',
          'વોટરપ્રૂફ ઇમરજન્સી કિટ, જરૂરી દવાઓ અને ઓળખપત્રો તૈયાર રાખો.',
          'તંત્ર દ્વારા આપવામાં આવતી સૂચનાઓનું પાલન કરો.'
        ],
        avoidItems: [
          'પૂરના વહેતા પાણી કે જળમગ્ન અંડરપાસમાંથી વાહન ન ચલાવો કે ચાલો નહીં.',
          'વીજળીના થાંભલા કે નદી કિનારે ઊભા ન રહો.',
          'પૂરના પાણીના સંપર્કમાં આવેલ ખોરાક કે પાણી ન લો.'
        ]
      },
      mr: {
        title: 'पूर इशारा: साबरमती नदीच्या पाण्याची पातळी वेगाने वाढत आहे',
        location: 'अहमदाबाद (पालडी, वासना आणि साबरमती रिव्हरफ्रंट)',
        summary: 'धरोई धरणातून मोठा विसर्ग आणि मुसळधार पावसामुळे वासना बॅरेजजवळ पाणीपातळी वाढली आहे.',
        statusText: 'तातडीने स्थलांतर आवश्यक - सखल भागातून सुरक्षित ठिकाणी जा.',
        actions: [
          'त्वरित उंचावरील ठिकाणी किंवा मदत निवाऱ्यात जा.',
          'घर सोडण्यापूर्वी वीज आणि गॅस बंद करा.',
          'प्रथमोपचार किट आणि महत्त्वाची कागदपत्रे सोबत ठेवा.',
          'शासकीय आपत्ती सूचनांचे पालन करा.'
        ],
        avoidItems: [
          'पाण्याच्या प्रवाहातून गाडी चालवू नका.',
          'वीजेचे खांब किंवा नदीकाठावर उभे राहू नका.'
        ]
      },
      bn: {
        title: 'বন্যার সতর্কতা: সবরমতী নদীর জলের স্তর দ্রুত বৃদ্ধি পাচ্ছে',
        location: 'আহমেদাবাদ (পালডি, বাসনা ও নদীর তীরবর্তী নিম্নঞ্চল)',
        summary: 'ধরোই বাঁধ থেকে বিপুল জল ছাড়ার ফলে বাসনা ব্যারেজের কাছে জলের স্তর দ্রুত বৃদ্ধি পেয়েছে।',
        statusText: 'জরুরি স্থানান্তর প্রয়োজন - নিম্নঞ্চল অবিলম্বে খালি করুন।',
        actions: [
          'অবিলম্বে উঁচু স্থানে বা আশ্রয়কেন্দ্রে চলে যান।',
          'ঘর ছাড়ার আগে প্রধান বিদ্যুৎ সুইচ ও গ্যাস ভালভ বন্ধ করুন।',
          'জরুরি কিট ও প্রয়োজনীয় ওষুধ তৈরি রাখুন।'
        ],
        avoidItems: [
          'বন্যার জলের মধ্য দিয়ে গাড়ি চালাবেন না বা হাঁটবেন না।',
          'বিদ্যুতের খুঁটি বা নদীর তীরে দাঁড়াবেন না।'
        ]
      },
      ta: {
        title: 'வெள்ள எச்சரிக்கை: சபர்மதி நதியின் நீர்மட்டம் வேகமாக உயர்கிறது',
        location: 'அகமதாபாத் (பால்டி, வாஸ்னா & நதிக்கரை தாழ்வான பகுதிகள்)',
        summary: 'தரோய் அணையில் இருந்து அதிக நீர் வெளியேற்றப்படுவதால் வாஸ்னா தடுப்பணை அருகே நீர்மட்டம் உயர்ந்துள்ளது.',
        statusText: 'உடனடி வெளியேற்றம் தேவை - தாழ்வான பகுதிகளில் இருந்து பாதுகாப்பான இடத்திற்கு செல்லவும்.',
        actions: [
          'உடனடியாக உயரமான இடங்களுக்கும் காப்பகங்களுக்கும் செல்லவும்.',
          'வீட்டை விட்டு வெளியேறும் முன் மின்சாரம் மற்றும் காஸ் இணைப்பை அணைக்கவும்.',
          'அவசர சிகிச்சை பெட்டி மற்றும் சான்றிதழ்களை தயார் நிலையில் வைக்கவும்.'
        ],
        avoidItems: [
          'வெள்ள நீரில் வாகனம் ஓட்டவோ நடக்கவோ வேண்டாம்.',
          'மின் கம்பங்கள் மற்றும் நதிக்கரையில் நிற்க வேண்டாம்.'
        ]
      },
      te: {
        title: 'వరద హెచ్చరిక: సబర్మతి నది నీటి మట్టం వేగంగా పెరుగుతోంది',
        location: 'అహ్మదాబాద్ (పాల్డి, వాస్నా & రివర్‌ఫ్రంట్ లోతట్టు ప్రాంతాలు)',
        summary: 'ధరోయ్ డ్యామ్ నుండి రికార్డు నీటి విడుదల మరియు వర్షాల వల్ల వాస్నా బ్యారేజ్ వద్ద నీటి మట్టం విపరీతంగా పెరిగింది.',
        statusText: 'వెంటనే ఖాళీ చేయాలి - లోతట్టు ప్రాంతాల ప్రజలు వెంటనే రక్షణ కేంద్రాలకు వెళ్లాలి.',
        actions: [
          'వెంటనే ఎత్తైన ప్రాంతాలకు లేదా పునరావాస కేంద్రాలకు వెళ్లండి.',
          'ఇల్లు వదిలే ముందు ప్రధాన విద్యుత్ స్విచ్, గ్యాస్ వాల్వ్ ఆపివేయండి.',
          'వాటర్‌ప్రూఫ్ ఎమర్జెన్సీ కిట్, అవసరమైన మందులు, ఐడీ కార్డులు సిద్ధంగా ఉంచుకోండి.',
          'అధికారులు జారీ చేసే ప్రతి సూచనను ఖచ్చితంగా పాటించండి.'
        ],
        avoidItems: [
          'వరద నీటిలో వాహనాలు నడపడం లేదా నడవడం చేయవద్దు.',
          'కరెంట్ స్తంభాలు, నీటిలో మునిగిన ట్రాన్స్‌ఫార్మర్ల వద్ద నిలబడవద్దు.',
          'కలుషితమైన నీటిని లేదా వరద తాకిన ఆహారాన్ని తీసుకోవద్దు.'
        ]
      }
    }
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
    officialSource: 'India Meteorological Department (IMD)',
    translations: {
      hi: {
        title: 'चक्रवात चेतावनी: अरब सागर में गहरा दबाव तीव्र हो रहा है',
        location: 'तटीय गुजरात (कच्छ, द्वारका और पोरबंदर)',
        summary: '85-95 किमी/घंटे की रफ्तार से तेज हवाएं और समुद्र में ऊंची लहरें। पेड़ उखड़ने और नुकसान का खतरा।',
        statusText: 'उच्च जोखिम अलर्ट - 6 घंटे के भीतर तूफान के टकराने की संभावना।',
        actions: [
          'छतों की टीन और अस्थायी संरचनाओं को मजबूती से बांधें।',
          'मोबाइल, इमरजेंसी लाइट और पावर बैंक चार्ज रखें।',
          '3 दिनों का राशन और पीने का पानी जमा रखें।'
        ],
        avoidItems: [
          'मछुआरों को समुद्र में न जाने की सख्त सलाह दी जाती है।',
          'पुराने पेड़ों या बड़े होर्डिंग्स के नीचे न खड़े हों।'
        ]
      },
      gu: {
        title: 'વાવાઝોડાની ચેતવણી: અરબી સમુદ્રમાં ડિપ્રેસન વધુ મજબૂત બન્યું',
        location: 'દરિયાકાંઠાનું ગુજરાત (કચ્છ, દ્વારકા અને પોરબંદર)',
        summary: '85-95 કિમી/કલાકની ઝડપે પવન ફુંકાવાની શક્યતા. દરિયામાં ઉંચા મોજા ઉછળશે.',
        statusText: 'ઉચ્ચ જોખમ - આગામી 6 કલાકમાં વાવાઝોડું ત્રાટકવાની શક્યતા.',
        actions: [
          'ધાબા પરની ચીજવસ્તુઓ અને પતરાં મજબૂતીથી બાંધી લો.',
          'મોબાઈલ અને ઈમરજન્સી લાઈટ ચાર્જ કરી લો.',
          'પીવાનું પાણી અને રાશન સંગ્રહિત કરો.'
        ],
        avoidItems: [
          'માછીમારોએ દરિયામાં ન જવું.',
          'મોટા ઝાડ કે હોર્ડિંગ્સ નીચે ઊભા ન રહેવું.'
        ]
      },
      te: {
        title: 'తుఫాను హెచ్చరిక: అరేబియా సముద్రంలో బలపడుతున్న తీవ్ర వాయుగుండం',
        location: 'తీరప్రాంత గుజరాత్ (కచ్, ద్వారక & పోర్‌బందర్)',
        summary: 'గంటకు 85-95 కిమీ వేగంతో ఈదురుగాలులు, సముద్రపు అలల ఉధృతి. చెట్లు కూలిపోయే ప్రమాదం ఉంది.',
        statusText: 'అధిక ప్రమాద హెచ్చరిక - రాబోయే 6 గంటల్లో తుఫాను తీరం దాటే అవకాశం.',
        actions: [
          'ఇంటి రేకులు, బయట ఉన్న వస్తువులను గట్టిగా కట్టేయండి.',
          'మొబైల్ ఫోన్లు, ఎమర్జెన్సీ లైట్లు, పవర్ బ్యాంకులు చార్జ్ చేయండి.',
          '3 రోజులకు సరిపడా ఆహారం, తాగునీరు సిద్ధంగా ఉంచుకోండి.'
        ],
        avoidItems: [
          'మత్స్యకారులు సముద్రంలో వేటకు వెళ్లకూడదు.',
          'పెద్ద చెట్లు, పెద్ద ఫ్లెక్సీ బోర్డుల కింద నిలబడవద్దు.'
        ]
      }
    }
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
    officialSource: 'National Disaster Management Authority (NDMA)',
    translations: {
      hi: {
        title: 'मौसम संबंधी सलाह: भीषण गर्मी की स्थिति (बढ़ भी सकती है)',
        location: 'मध्य और आंतरिक गुजरात',
        summary: 'मध्यम गर्मी की सलाह: दोपहर के समय तापमान 42°C से 44°C तक पहुंच सकता है।',
        statusText: 'मध्यम जोखिम - दोपहर के समय बाहर जाने से बचें।',
        actions: [
          'ओआरएस, छाछ और पानी का खूब सेवन करें।',
          'सूती कपड़े पहनें और धूप में सिर ढंककर निकलें।'
        ],
        avoidItems: [
          'कड़ी धूप में भारी शारीरिक काम न करें।'
        ]
      },
      gu: {
        title: 'હવામાન સલાહ: હીટવેવની શક્યતા',
        location: 'મધ્ય ગુજરાત',
        summary: 'બપોરે તાપમાન 42°C થી 44°C સુધી પહોંચી શકે છે.',
        statusText: 'મધ્યમ જોખમ - બપોરના સમયે વિશેષ કાળજી રાખો.',
        actions: [
          'પુષ્કળ પ્રમાણમાં પાણી અને છાશ પીવો.',
          'સુતરાઉ કપડાં પહેરો.'
        ],
        avoidItems: [
          'બપોરે તડકામાં ભારે કામ ન કરવું.'
        ]
      },
      te: {
        title: 'వాతావరణ హెచ్చరిక: తీవ్రమైన ఎండల తీవ్రత (పెరిగే అవకాశం ఉంది)',
        location: 'మధ్య గుజరాత్ ప్రాంతం',
        summary: 'మధ్యాహ్నం ఉష్ణోగ్రతలు 42°C నుండి 44°C వరకు నమోదు కావచ్చు. జాగ్రత్తలు తీసుకోండి.',
        statusText: 'మధ్యస్థ ప్రమాదం - మధ్యాహ్న సమయాల్లో అప్రమత్తంగా ఉండాలి.',
        actions: [
          'ORS, మజ్జిగ, మంచి నీరు ఎక్కువగా తాగండి.',
          'లేత రంగు కాటన్ దుస్తులు ధరించండి.'
        ],
        avoidItems: [
          'ఎండ తీవ్రత ఉన్న సమయంలో కఠిన శ్రమ చేయవద్దు.'
        ]
      }
    }
  },
  {
    id: 'alert-earthquake-04',
    disasterType: 'Earthquake',
    severity: 'CRITICAL',
    riskColor: 'red',
    title: 'SEISMIC WARNING: Magnitude 5.8 Tremor in Kutch Mainland Fault',
    location: 'Kutch & Saurashtra Region (Bhuj, Gandhidham & Morbi)',
    issuedAt: '25 min ago',
    timestamp: '2026-08-08T14:40:00Z',
    summary: 'Strong seismic tremor detected along the Kutch Mainland Fault. Structural shaking reported across residential and commercial sectors with active aftershock risk.',
    affectedRadius: '45 km from Epicenter',
    statusText: 'Critical Threat - Drop, Cover, and Hold. Evacuate damaged multi-story structures.',
    actions: [
      'Drop to ground, take cover under sturdy furniture, and hold on until tremors cease.',
      'Evacuate high-rise buildings using emergency stairwells; do NOT use elevators.',
      'Turn off domestic gas valves and main electrical circuit breakers immediately.',
      'Stay in open areas away from power transmission lines, glass facades, and brick walls.'
    ],
    avoidItems: [
      'Do NOT run outside while structural shaking is actively occurring.',
      'Do NOT use elevators, escalators, or balconies.',
      'Avoid lighting matches or lighters until confirming zero gas line leaks.'
    ],
    nearestSafeZoneId: 'safezone-02',
    officialSource: 'Institute of Seismological Research (ISR) & NDMA',
    translations: {
      hi: {
        title: 'भूकंप चेतावनी: कच्छ मुख्य फॉल्ट में 5.8 तीव्रता का झटका',
        location: 'कच्छ और सौराष्ट्र क्षेत्र (भुज, गांधीधाम और मोरबी)',
        summary: 'कच्छ में तेज भूकंपीय झटके दर्ज किए गए। संभावित आफ्टरशॉक्स के कारण सावधानी बरतें।',
        statusText: 'गंभीर खतरा - तुरंत झुकें, ढकें और मजबूत सहारे को पकड़ें।',
        actions: [
          'तुरंत जमीन पर बैठें और मजबूत टेबल के नीचे सिर ढकें।',
          'सीढ़ियों का उपयोग करके बाहर निकलें, लिफ्ट का उपयोग न करें।',
          'गैस और बिजली की मुख्य लाइनें बंद करें।'
        ],
        avoidItems: [
          'झटकों के दौरान भागने की कोशिश न करें।',
          'इमारतों और बिजली के तारों के पास न खड़े हों।'
        ]
      },
      gu: {
        title: 'ભૂકંપ ચેતવણી: કચ્છ મેઇનલેન્ડ ફોલ્ટમાં 5.8 ની તીવ્રતાનો આંચકો',
        location: 'કચ્છ અને સૌરાષ્ટ્ર વિસ્તાર (ભુજ, ગાંધીધામ અને મોરબી)',
        summary: 'કચ્છ વિસ્તારમાં ભૂકંપના તીવ્ર આંચકા અનુભવાયા. આફ્ટરશોક્સની શક્યતા.',
        statusText: 'ગંભીર ચેતવણી - ખુલ્લા મેદાનમાં જાવ, સલામત રહો.',
        actions: [
          'તરત જ મજબૂત ટેબલ નીચે આશરો લો.',
          'વીજળી અને ગેસ કનેક્શન બંધ કરો.',
          'ઈમારતમાંથી બહાર નીકળવા માટે સીડીનો ઉપયોગ કરો.'
        ],
        avoidItems: [
          'લિફ્ટનો ઉપયોગ બિલકુલ ન કરવો.',
          'ધ્રુજારી દરમિયાન દોડાદોડી ન કરવી.'
        ]
      },
      te: {
        title: 'భూకంప హెచ్చరిక: కచ్ ప్రాంతంలో 5.8 తీవ్రతతో భూకంపం',
        location: 'కచ్ మరియు సౌరాష్ట్ర ప్రాంతం (భుజ్, మోర్బి)',
        summary: 'కచ్ ఫాల్ట్ లైన్ వెంట తీవ్ర ప్రకంపనలు నమోదయ్యాయి. అప్రమత్తంగా ఉండండి.',
        statusText: 'తీవ్ర ప్రమాదం - తక్షణ రక్షణ చర్యలు పాటించండి.',
        actions: [
          'కిందకు వంగి గట్టి బల్ల కింద తలను దాచుకోండి.',
          'మెట్లను మాత్రమే ఉపయోగించండి, లిఫ్ట్‌లు వాడవద్దు.',
          'గ్యాస్ మరియు విద్యుత్ స్విచ్‌లు ఆపివేయండి.'
        ],
        avoidItems: [
          'ప్రకంపనలు జరుగుతున్నప్పుడు పరుగులు తీయవద్దు.'
        ]
      }
    }
  },
  {
    id: 'alert-landslide-05',
    disasterType: 'Landslide',
    severity: 'HIGH_RISK',
    riskColor: 'orange',
    title: 'LANDSLIDE WARNING: Slope Instability & Debris Flow along Pavagadh Foothills',
    location: 'Panchmahal & Pavagadh Hill Corridor',
    issuedAt: '1 hour ago',
    timestamp: '2026-08-08T13:50:00Z',
    summary: 'Continuous heavy monsoon downpours have triggered mudslides, rockfalls, and road blockages along the access ghat roads and surrounding hillside settlements.',
    affectedRadius: '12 km along hill highway corridor',
    statusText: 'High Risk Alert - Hillside transit halted. Evacuate valley drainage settlements.',
    actions: [
      'Evacuate immediately from hillside homes and drainage ravines to designated shelters.',
      'Avoid all vehicular travel on ghat roads and mountain passes until cleared by authorities.',
      'Listen for unusual rumbling sounds, rolling boulders, or sudden surges in mudflow streams.',
      'Report active slope cracking or blocked culverts to the District Emergency Operations Center.'
    ],
    avoidItems: [
      'Do NOT attempt to cross active mudflows or debris-laden roads on foot or in vehicles.',
      'Do NOT shelter in narrow valley bottoms or below steep, unreinforced slopes.',
      'Avoid approaching loose embankments or swollen hillside mountain streams.'
    ],
    nearestSafeZoneId: 'safezone-05',
    officialSource: 'Geological Survey of India (GSI) & GSDMA',
    translations: {
      hi: {
        title: 'भूस्खलन चेतावनी: पावागढ़ की तलहटी में ढलान अस्थिरता और मलबे का बहाव',
        location: 'पंचमहल और पावागढ़ पहाड़ी गलियारा',
        summary: 'भारी बारिश के कारण पहाड़ी मार्गों पर भूस्खलन और चट्टानें गिरने का खतरा उत्पन्न हो गया है।',
        statusText: 'उच्च जोखिम अलर्ट - पहाड़ी ढलानों से तुरंत सुरक्षित स्थानों पर जाएं।',
        actions: [
          'ढलान वाले मकानों से तुरंत सुरक्षित आश्रय में जाएं।',
          'घाट मार्गों पर यात्रा करने से बचें।'
        ],
        avoidItems: [
          'बहते मलबे के बीच से न निकलें।'
        ]
      },
      gu: {
        title: 'ભૂસ્ખલન ચેતવણી: પાવાગઢ ડુંગર વિસ્તારમાં ભેખડો ધસી પડવાની શક્યતા',
        location: 'પંચમહાલ અને પાવાગઢ પંથક',
        summary: 'ભારે વરસાદથી ઘાટ માર્ગો પર માટી અને પથ્થરો ધસી પડતા રસ્તા બંધ થવાનો ખતરો.',
        statusText: 'ઉચ્ચ જોખમ - ડુંગરાળ વિસ્તારોમાંથી તાત્કાલિક સ્થળાંતર કરો.',
        actions: [
          'નીચાણવાળા અને ઢોળાવવાળા વિસ્તારોમાંથી બહાર નીકળો.',
          'ઘાટ રોડ પર વાહન ચલાવવાનું ટાળો.'
        ],
        avoidItems: [
          'ધસી પડેલા કાટમાળ વચ્ચેથી પસાર ન થવું.'
        ]
      },
      te: {
        title: 'కొండచరియల హెచ్చరిక: పావాగఢ్ పరిసరాల్లో కొండచరియలు విరిగిపడే ప్రమాదం',
        location: 'పంచమహల్ మరియు పావాగఢ్ ప్రాంతం',
        summary: 'భారీ వర్షాల కారణంగా ఘాట్ రోడ్లపై మట్టిచరియలు విరిగిపడే అవకాశం ఉంది.',
        statusText: 'అధిక ప్రమాదం - లోయ ప్రాంతాల నుంచి సురక్షిత ప్రాంతాలకు వెళ్లండి.',
        actions: [
          'వాలు ప్రాంతాల నుండి వెంటనే సురక్షిత కేంద్రాలకు వెళ్లండి.'
        ],
        avoidItems: [
          'మట్టి ప్రవాహాలలో వాహనాలు నడపవద్దు.'
        ]
      }
    }
  },
  {
    id: 'alert-fire-06',
    disasterType: 'Fire',
    severity: 'HIGH_RISK',
    riskColor: 'orange',
    title: 'STRUCTURAL FIRE: Major Industrial Chemical Fire with Dense Smoke Plume',
    location: 'Ahmedabad (Vatva & Naroda Industrial Zones)',
    issuedAt: '35 min ago',
    timestamp: '2026-08-08T14:30:00Z',
    summary: 'Major structural fire with thick chemical smoke dispersion in GIDC Phase-IV. Multi-agency fire tenders and hazmat containment units actively deployed.',
    affectedRadius: '2.5 km downwind radius',
    statusText: 'High Risk Hazard - Seal doors/windows and wear masks downwind.',
    actions: [
      'Stay indoors, close all exterior windows, ventilation ducts, and shut down AC intake vents.',
      'Wear damp cloth or N95 masks to prevent toxic particulate and chemical smoke inhalation.',
      'Keep primary exit pathways clear and follow evacuation corridors established by police.',
      'Cooperate with fire rescue teams and maintain unobstructed access for emergency vehicles.'
    ],
    avoidItems: [
      'Do NOT gather near the incident perimeter or obstruct emergency fire tenders.',
      'Do NOT inhale dense smoke plumes or enter downwind industrial corridors.',
      'Avoid using domestic water pumps if chemical runoff has entered local storm drains.'
    ],
    nearestSafeZoneId: 'safezone-03',
    officialSource: 'Ahmedabad Fire & Emergency Services (AFES) & State Police',
    translations: {
      hi: {
        title: 'अग्नि चेतावनी: औद्योगिक क्षेत्र में भीषण रासायनिक आग',
        location: 'अहमदाबाद (वत्वा और नरोडा औद्योगिक क्षेत्र)',
        summary: 'जीआईडीसी में रासायनिक आग के कारण घना धुआं फैल रहा है। खिड़कियां बंद रखें।',
        statusText: 'उच्च जोखिम - मास्क पहनें और धुएं से दूर रहें।',
        actions: [
          'खिड़कियां और वेंटिलेशन बंद रखें।',
          'गीला कपड़ा या एन95 मास्क पहनें।'
        ],
        avoidItems: [
          'घटना स्थल के पास भीड़ न लगाएं।'
        ]
      },
      gu: {
        title: 'આગની ચેતવણી: વટવા જીઆઇડીસીમાં કેમિકલ ફેક્ટરીમાં ભીષણ આગ',
        location: 'અમદાવાદ (વટવા અને નરોડા જીઆઇડીસી)',
        summary: 'ઝેરી ધુમાડો ફેલાવવાની શક્યતા હોવાથી આસપાસના રહેવાસીઓએ ઘરોની બારીઓ બંધ રાખવી.',
        statusText: 'ઉચ્ચ જોખમ - માસ્ક પહેરો અને સુરક્ષિત રહો.',
        actions: [
          'ઘરની બારી-બારણાં બંધ રાખો.',
          'ભીનો રૂમાલ અથવા માસ્કનો ઉપયોગ કરો.'
        ],
        avoidItems: [
          'ઘટનાસ્થળે ભીડ ન કરવી.'
        ]
      },
      te: {
        title: 'అగ్నిప్రమాద హెచ్చరిక: పారిశ్రామిక వాడలో భారీ అగ్నిప్రమాదం',
        location: 'అహ్మదాబాద్ (వత్వా ఇండస్ట్రియల్ ఏరియా)',
        summary: 'రసాయన పొగ వ్యాపిస్తున్నందున ప్రజలు తగిన జాగ్రత్తలు తీసుకోవాలి.',
        statusText: 'అధిక ప్రమాదం - మాస్కులు ధరించండి.',
        actions: [
          'ఇంటి కిటికీలు మూసివేయండి, మాస్కులు ధరించండి.'
        ],
        avoidItems: [
          'ప్రమాద ప్రాంతం వద్ద గుమిగూడవద్దు.'
        ]
      }
    }
  }
];

export function getLocalizedAlert(alert: DisasterAlert, lang: SupportedLanguage): DisasterAlert {
  if (!alert.translations || !alert.translations[lang]) {
    return alert;
  }

  const tData = alert.translations[lang]!;
  return {
    ...alert,
    title: tData.title || alert.title,
    location: tData.location || alert.location,
    summary: tData.summary || alert.summary,
    statusText: tData.statusText || alert.statusText,
    actions: tData.actions || alert.actions,
    avoidItems: tData.avoidItems || alert.avoidItems,
  };
}
