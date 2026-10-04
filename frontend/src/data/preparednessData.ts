import { SupportedLanguage } from './translationsData';
import type { PreparednessItem, PreparednessCategory } from '@/types';

export type { PreparednessItem, PreparednessCategory };

export const PREPAREDNESS_ITEMS: PreparednessItem[] = [
  {
    id: 'prep-water',
    category: 'Water & Food',
    title: 'Drinking Water Supply',
    description: 'Keep at least 3 liters of clean drinking water per person per day (minimum 3-day supply).',
    iconName: 'Droplets',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'पीने के पानी की आपूर्ति',
        description: 'प्रति व्यक्ति 3 लीटर साफ पीने का पानी (कम से कम 3 दिन का स्टॉक) रखें।'
      },
      gu: {
        title: 'પીવાના પાણીનો પુરવઠો',
        description: 'વ્યક્તિ દીઠ દિવસના 3 લીટર પીવાનું પાણી (ઓછામાં ઓછું 3 દિવસનું) રાખો.'
      },
      te: {
        title: 'తాగునీటి నిల్వ',
        description: 'వ్యక్తికి రోజుకు కనీసం 3 లీటర్ల నికరమైన తాగునీరు (కనీసం 3 రోజులకు సరిపడా) ఉంచుకోండి.'
      }
    }
  },
  {
    id: 'prep-food',
    category: 'Water & Food',
    title: 'Non-Perishable Food',
    description: 'Ready-to-eat dry rations, biscuits, nuts, energy bars, and canned foods.',
    iconName: 'Utensils',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'सूखा राशन और भोजन',
        description: 'बिस्कुट, मेवे, सूखे मेवे और तुरंत खाने योग्य भोजन रखें।'
      },
      gu: {
        title: 'સૂકો ખોરાક',
        description: 'બિસ્કિટ, ડ્રાયફ્રૂટ્સ અને તૈયાર ખોરાક રાખો.'
      },
      te: {
        title: 'పాడుకాని పొడి ఆహారం',
        description: 'బిస్కట్లు, ఎండు ద్రాక్షలు, జీడిపప్పు, రెడీ-టు-ఈట్ పొడి ఆహారం.'
      }
    }
  },
  {
    id: 'prep-medical',
    category: 'Medical & Safety',
    title: 'First-Aid & Essential Meds',
    description: 'Bandages, antiseptic solution, pain relievers, ORS sachets, and 7-day personal prescriptions.',
    iconName: 'Cross',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'प्राथमिक चिकित्सा किट और दवाएं',
        description: 'पट्टी, एंटीसेप्टिक, ओआरएस और 7 दिनों की आवश्यक दवाएं तैयार रखें।'
      },
      gu: {
        title: 'ફર્સ્ટ-એઇડ અને જરૂરી દવાઓ',
        description: 'પાટો, એન્ટિસેપ્ટિક, ORS અને જરૂરી દવાઓ કિટમાં રાખો.'
      },
      te: {
        title: 'ప్రథమ చికిత్స & మందులు',
        description: 'కట్టు గుడ్డలు, యాంటీసెప్టిక్, నొప్పి నివారణ మందులు, ORS ప్యాకెట్లు, అవసరమైన మందులు.'
      }
    }
  },
  {
    id: 'prep-mask',
    category: 'Medical & Safety',
    title: 'Masks & Hygiene Kit',
    description: 'N95 masks, hand sanitizer, soap, moist wipes, and feminine hygiene products.',
    iconName: 'ShieldCheck',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'मास्क और स्वच्छता किट',
        description: 'N95 मास्क, सैनिटाइज़र, साबुन और स्वच्छता का सामान।'
      },
      gu: {
        title: 'માસ્ક અને સ્વચ્છતા કિટ',
        description: 'N95 માસ્ક, સેનિટાઇઝર અને સાબુ.'
      },
      te: {
        title: 'మాస్కులు & పరిశుభ్రత కిట్',
        description: 'N95 మాస్కులు, హ్యాండ్ శానిటైజర్, సబ్బులు, పరిశుభ్రతా ఉత్పత్తులు.'
      }
    }
  },
  {
    id: 'prep-flashlight',
    category: 'Tools & Light',
    title: 'LED Flashlight & Batteries',
    description: 'High-lumen waterproof flashlight with extra fresh batteries or solar charging.',
    iconName: 'Zap',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'एलईडी टॉर्च और बैटरी',
        description: 'अतिरिक्त बैटरी या सोलर चार्जिंग के साथ वाटरप्रूफ टॉर्च।'
      },
      gu: {
        title: 'ટોર્ચ અને બેટરી',
        description: 'વોટરપ્રૂફ એલઇડી ટોર્ચ અને વધારાના સેલ.'
      },
      te: {
        title: 'LED టార్చి లైట్ & బ్యాటరీలు',
        description: 'అదనపు బ్యాటరీలతో వాటర్‌ప్రూఫ్ టార్చి లైట్.'
      }
    }
  },
  {
    id: 'prep-powerbank',
    category: 'Tools & Light',
    title: 'Charged Power Bank & Cable',
    description: 'At least 10,000mAh charged power bank to keep emergency phones operational.',
    iconName: 'BatteryCharging',
    defaultChecked: true,
    translations: {
      hi: {
        title: 'पावर बैंक और चार्जिंग केबल',
        description: 'कम से कम 10,000mAh फुल चार्ज पावर बैंक।'
      },
      gu: {
        title: 'પાવર બેંક અને કેબલ',
        description: 'મોબાઈલ ચાર્જ કરવા 10,000mAh પાવર બેંક.'
      },
      te: {
        title: 'చార్జ్ చేసిన పవర్ బ్యాంక్',
        description: 'ఫోన్లను చార్జ్ చేసుకోవడానికి 10,000mAh పవర్ బ్యాంక్.'
      }
    }
  },
  {
    id: 'prep-whistle',
    category: 'Tools & Light',
    title: 'Emergency Signal Whistle',
    description: 'High-decibel loud whistle for attracting search and rescue teams if trapped.',
    iconName: 'Volume2',
    defaultChecked: false,
    translations: {
      hi: {
        title: 'आपातकालीन सीटी (Whistle)',
        description: 'बचाव दल का ध्यान आकर्षित करने के लिए तेज आवाज वाली सीटी।'
      },
      gu: {
        title: 'ઇમરજન્સી સીટી',
        description: 'બચાવ ટુકડીનું ધ્યાન ખેંચવા માટે સીટી.'
      },
      te: {
        title: 'అత్యవసర ఈల (Whistle)',
        description: 'రక్షణ సిబ్బందిని ఆకర్షించడానికి బిగ్గరగా శబ్దం చేసే ఈల.'
      }
    }
  },
  {
    id: 'prep-docs',
    category: 'Documents & Cash',
    title: 'Waterproof Document Vault',
    description: 'Aadhaar, Passport, insurance policies, and medical records in a sealed ziplock bag.',
    iconName: 'FileText',
    defaultChecked: false,
    translations: {
      hi: {
        title: 'वाटरप्रूफ दस्तावेज पाउच',
        description: 'आधार, पासपोर्ट और जरूरी दस्तावेज जिपलॉक बैग में रखें।'
      },
      gu: {
        title: 'દસ્તાવેજ કવર',
        description: 'આધાર કાર્ડ અને જરૂરી દસ્તાવેજો વોટરપ્રૂફ બેગમાં રાખો.'
      },
      te: {
        title: 'వాటర్‌ప్రూఫ్ పత్రాల భద్రత',
        description: 'ఆధార్, పాస్‌పోర్ట్, ఇన్సూరెన్స్ పత్రాలను వాటర్‌ప్రൂఫ్ కవర్లో ఉంచండి.'
      }
    }
  }
];

export function getLocalizedPrepItem(item: PreparednessItem, lang: SupportedLanguage): PreparednessItem {
  if (!item.translations || !item.translations[lang]) {
    return item;
  }
  const tData = item.translations[lang]!;
  return {
    ...item,
    title: tData.title || item.title,
    description: tData.description || item.description,
  };
}
