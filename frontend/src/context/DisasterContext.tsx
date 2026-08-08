'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_DISASTER_ALERTS, DisasterAlert } from '@/data/disastersData';
import { PREPAREDNESS_ITEMS } from '@/data/preparednessData';

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
