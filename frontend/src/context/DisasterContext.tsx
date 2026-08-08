'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_DISASTER_ALERTS, DisasterAlert } from '@/data/disastersData';
import { PREPAREDNESS_ITEMS } from '@/data/preparednessData';
import { SupportedLanguage, TRANSLATIONS } from '@/data/translationsData';

export interface SpecialAssistanceRequest {
  id: string;
  type: 'Elderly / Senior Care' | 'Wheelchair / Mobility Escort' | 'Medical Oxygen / ICU Support' | 'Infant / Maternal Care' | 'Pet Evacuation';
  name: string;
  phone: string;
  location: string;
  details: string;
  priority: 'Critical Evacuation' | 'Medical Priority' | 'Standard Assistance';
  status: 'Received · Rescue Dispatched' | 'Assigned to Paldi Shelter Team' | 'Evacuation Complete';
  timestamp: string;
}

interface DisasterContextType {
  isThreatMode: boolean;
  setIsThreatMode: (val: boolean) => void;
  toggleThreatMode: () => void;
  isOffline: boolean;
  toggleOfflineMode: () => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  isSOSOpen: boolean;
  setIsSOSOpen: (open: boolean) => void;
  activeAlert: DisasterAlert;
  checkedPrepItems: Record<string, boolean>;
  togglePrepItem: (id: string) => void;
  completedPrepCount: number;
  totalPrepCount: number;
  prepPercentage: number;
  selectedSafeZoneFilter: string;
  setSelectedSafeZoneFilter: (filter: string) => void;
  isAudioSirenPlaying: boolean;
  toggleAudioSiren: () => void;
  // Notification Drawer & Special Assistance Requests
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isAssistanceModalOpen: boolean;
  setIsAssistanceModalOpen: (open: boolean) => void;
  assistanceRequests: SpecialAssistanceRequest[];
  addAssistanceRequest: (req: Omit<SpecialAssistanceRequest, 'id' | 'status' | 'timestamp'>) => void;
  // Multi-Language Support (i18n)
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isThreatMode, setIsThreatMode] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('Ahmedabad (Paldi / Vasna)');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [activeAlert] = useState<DisasterAlert>(MOCK_DISASTER_ALERTS[0]);
  const [selectedSafeZoneFilter, setSelectedSafeZoneFilter] = useState<string>('All');
  const [isAudioSirenPlaying, setIsAudioSirenPlaying] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Multi-language state with localStorage persistence
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('safesphere_lang') as SupportedLanguage;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setCurrentLanguage(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('safesphere_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  // Notification Drawer & Special Assistance Modal
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState<boolean>(false);

  // Initial mock assistance requests
  const [assistanceRequests, setAssistanceRequests] = useState<SpecialAssistanceRequest[]>(() => [
    {
      id: 'req-01',
      type: 'Elderly / Senior Care',
      name: 'Ramesh Patel (Senior Citizen, Age 78)',
      phone: '+91 98790 12345',
      location: 'Flat 302, Ankur Apartments, Paldi, Ahmedabad',
      details: 'Wheelchair assistance required to move down from 3rd floor during flood water rise.',
      priority: 'Critical Evacuation',
      status: 'Assigned to Paldi Shelter Team',
      timestamp: '15 min ago',
    },
  ]);

  // Load saved assistance requests from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('safesphere_assistance_reqs');
      if (saved) {
        setAssistanceRequests(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const addAssistanceRequest = (reqData: Omit<SpecialAssistanceRequest, 'id' | 'status' | 'timestamp'>) => {
    const newReq: SpecialAssistanceRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Received · Rescue Dispatched',
      timestamp: 'Just now',
    };

    setAssistanceRequests(prev => {
      const next = [newReq, ...prev];
      try {
        localStorage.setItem('safesphere_assistance_reqs', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    setIsNotificationDrawerOpen(true);
  };

  // Monitor network connectivity & handle offline sync
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, []);

  // LocalStorage state for preparedness checklist
  const [checkedPrepItems, setCheckedPrepItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PREPAREDNESS_ITEMS.forEach(item => {
      initial[item.id] = !!item.defaultChecked;
    });
    return initial;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('safesphere_prep_items');
      if (saved) {
        setCheckedPrepItems(JSON.parse(saved));
      }
    } catch {
      // ignore SSR or local storage error
    }
  }, []);

  const togglePrepItem = (id: string) => {
    setCheckedPrepItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('safesphere_prep_items', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const completedPrepCount = Object.values(checkedPrepItems).filter(Boolean).length;
  const totalPrepCount = PREPAREDNESS_ITEMS.length;
  const prepPercentage = Math.round((completedPrepCount / totalPrepCount) * 100);

  const toggleThreatMode = () => setIsThreatMode(prev => !prev);
  const toggleOfflineMode = () => setIsOffline(prev => !prev);
  const toggleAudioSiren = () => setIsAudioSirenPlaying(prev => !prev);

  return (
    <DisasterContext.Provider
      value={{
        isThreatMode,
        setIsThreatMode,
        toggleThreatMode,
        isOffline,
        toggleOfflineMode,
        selectedLocation,
        setSelectedLocation,
        isSOSOpen,
        setIsSOSOpen,
        activeAlert,
        checkedPrepItems,
        togglePrepItem,
        completedPrepCount,
        totalPrepCount,
        prepPercentage,
        selectedSafeZoneFilter,
        setSelectedSafeZoneFilter,
        isAudioSirenPlaying,
        toggleAudioSiren,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isAssistanceModalOpen,
        setIsAssistanceModalOpen,
        assistanceRequests,
        addAssistanceRequest,
        currentLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
