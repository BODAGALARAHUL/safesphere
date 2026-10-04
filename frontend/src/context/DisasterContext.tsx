'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  DisasterAlert,
  SpecialAssistanceRequest,
  SectorOption,
  UserLocationState,
} from '@/types';
import {
  AlertService,
  PreparednessService,
  LocationService,
} from '@/services';
import { SupportedLanguage, TRANSLATIONS } from '@/data/translationsData';

export type { SpecialAssistanceRequest };

interface DisasterContextType {
  isThreatMode: boolean;
  setIsThreatMode: (val: boolean) => void;
  toggleThreatMode: () => void;
  isOffline: boolean;
  toggleOfflineMode: () => void;
  
  // Location & Sector Management
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedSector: SectorOption;
  setSelectedSector: (sector: SectorOption) => void;
  supportedSectors: SectorOption[];
  userLocation: UserLocationState;
  requestUserLocation: () => Promise<void>;
  selectSectorById: (sectorId: string) => void;
  clearGpsLocation: () => void;
  hasAlertInSelectedArea: boolean;

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
  
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isAssistanceModalOpen: boolean;
  setIsAssistanceModalOpen: (open: boolean) => void;
  assistanceRequests: SpecialAssistanceRequest[];
  addAssistanceRequest: (req: Omit<SpecialAssistanceRequest, 'id' | 'status' | 'timestamp'>) => void;
  
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supportedSectors = LocationService.getSupportedSectors();
  const defaultSector = LocationService.getDefaultSector();

  const [isThreatMode, setIsThreatMode] = useState<boolean>(true);
  const [selectedSector, setSelectedSectorState] = useState<SectorOption>(defaultSector);
  const [selectedLocation, setSelectedLocationState] = useState<string>(defaultSector.name);

  const [userLocation, setUserLocation] = useState<UserLocationState>({
    coordinates: defaultSector.coordinates,
    sectorName: defaultSector.name,
    source: 'demo',
    permissionState: 'prompt',
    isLoading: false,
  });

  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [selectedSafeZoneFilter, setSelectedSafeZoneFilter] = useState<string>('All');
  const [isAudioSirenPlaying, setIsAudioSirenPlaying] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Sector selection handler
  const selectSectorById = useCallback((sectorId: string) => {
    const sector = LocationService.getSectorById(sectorId);
    if (sector) {
      setSelectedSectorState(sector);
      setSelectedLocationState(sector.name);
      setUserLocation(prev => ({
        ...prev,
        coordinates: sector.coordinates,
        sectorName: sector.name,
        source: 'selected',
        errorMessage: undefined,
      }));
    }
  }, []);

  const setSelectedLocation = useCallback((loc: string) => {
    const foundSector = LocationService.getSectorByName(loc);
    if (foundSector) {
      selectSectorById(foundSector.id);
    } else {
      setSelectedLocationState(loc);
      setUserLocation(prev => ({
        ...prev,
        sectorName: loc,
        source: 'selected',
      }));
    }
  }, [selectSectorById]);

  const setSelectedSector = useCallback((sector: SectorOption) => {
    selectSectorById(sector.id);
  }, [selectSectorById]);

  // Centralized browser geolocation access
  const requestUserLocation = useCallback(async () => {
    setUserLocation(prev => ({ ...prev, isLoading: true, errorMessage: undefined }));

    try {
      const { coordinates } = await LocationService.requestBrowserGeolocation();
      const closest = LocationService.findClosestSector(coordinates);

      setUserLocation({
        coordinates,
        sectorName: closest.name,
        source: 'gps',
        permissionState: 'granted',
        isLoading: false,
      });

      setSelectedSectorState(closest);
      setSelectedLocationState(`${closest.city} (Live GPS)`);
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      const permissionState = (errorObj.code as UserLocationState['permissionState']) || 'unavailable';

      setUserLocation(prev => ({
        ...prev,
        isLoading: false,
        permissionState,
        errorMessage: errorObj.message || 'Location unavailable — displaying selected area',
        source: 'selected',
      }));
    }
  }, []);

  const clearGpsLocation = useCallback(() => {
    setUserLocation({
      coordinates: selectedSector.coordinates,
      sectorName: selectedSector.name,
      source: 'selected',
      permissionState: 'prompt',
      isLoading: false,
    });
    setSelectedLocationState(selectedSector.name);
  }, [selectedSector]);

  // Compute active alert based on selected sector
  const primarySectorAlert = AlertService.getPrimaryAlertForSector(selectedSector.name);
  const activeAlert: DisasterAlert = primarySectorAlert || AlertService.getActiveAlerts()[0];
  const hasAlertInSelectedArea = Boolean(primarySectorAlert);

  // Localization
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

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

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState<boolean>(false);

  const [assistanceRequests, setAssistanceRequests] = useState<SpecialAssistanceRequest[]>([
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

  const [checkedPrepItems, setCheckedPrepItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PreparednessService.getPreparednessItems().forEach(item => {
      initial[item.id] = !!item.defaultChecked;
    });
    return initial;
  });

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        const savedLang = localStorage.getItem('safesphere_lang') as SupportedLanguage;
        if (savedLang && TRANSLATIONS[savedLang]) {
          setCurrentLanguage(savedLang);
        }
        const savedReqs = localStorage.getItem('safesphere_assistance_reqs');
        if (savedReqs) {
          setAssistanceRequests(JSON.parse(savedReqs));
        }
        const savedPrep = localStorage.getItem('safesphere_prep_items');
        if (savedPrep) {
          setCheckedPrepItems(JSON.parse(savedPrep));
        }
      } catch {
        // ignore
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== 'undefined') {
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

  const allPrepItems = PreparednessService.getPreparednessItems();
  const totalPrepCount = allPrepItems.length;
  const completedPrepCount = allPrepItems.filter(item => checkedPrepItems[item.id]).length;
  const prepPercentage = totalPrepCount > 0 
    ? Math.min(100, Math.max(0, Math.round((completedPrepCount / totalPrepCount) * 100))) 
    : 0;

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
        selectedSector,
        setSelectedSector,
        supportedSectors,
        userLocation,
        requestUserLocation,
        selectSectorById,
        clearGpsLocation,
        hasAlertInSelectedArea,
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

