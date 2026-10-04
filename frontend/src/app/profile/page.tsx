'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/data/translationsData';
import { animatePageEnter, createStaggerReveal } from '@/lib/animations';
import { User, MapPin, Bell, Check, ShieldAlert, Smartphone, Volume2, Languages } from 'lucide-react';

export default function ProfilePage() {
  const {
    selectedSector,
    selectSectorById,
    supportedSectors,
    userLocation,
    requestUserLocation,
    isThreatMode,
    toggleThreatMode,
    isOffline,
    toggleOfflineMode,
    currentLanguage,
    setLanguage
  } = useDisaster();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (sectionsListRef.current) {
      createStaggerReveal(sectionsListRef.current, '.profile-section-card', { stagger: 0.1 });
    }
  }, []);

  const [smsAlerts, setSmsAlerts] = useState<boolean>(true);
  const [highPrioritySound, setHighPrioritySound] = useState<boolean>(true);

  return (
    <main ref={containerRef} className="atmosphere-profile w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6 sm:space-y-8">
      
      
      <div className="space-y-1.5 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38a8ff] uppercase tracking-wider">
          <User className="h-4 w-4 text-[#38a8ff]" />
          <span>Safety Profile & EOC Parameters</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Citizen Configuration & Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8]">
          Configure your local monitored sector, priority alert sound channels, and test the offline data engine.
        </p>
      </div>

      <div ref={sectionsListRef} className="space-y-6 sm:space-y-8">
        
        
        <section className="profile-section-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white">
                <MapPin className="h-5 w-5 text-[#16c784]" />
              </div>
              <div>
                <h2 className="font-bold text-base text-white">
                  Assigned Monitored Sector
                </h2>
                <div className="text-xs text-[#94a3b8]">
                  Real-time hazard alerts and nearest safe havens default to this geographic zone.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={requestUserLocation}
              disabled={userLocation.isLoading}
              className="px-4 py-2 rounded-xl bg-[#151c26] hover:bg-[#1f2937] border border-[#22d3ee]/30 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
            >
              <span className="h-2 w-2 rounded-full bg-[#22d3ee] animate-pulse" />
              <span>{userLocation.isLoading ? 'Fixing GPS...' : userLocation.source === 'gps' ? 'Live GPS Active' : 'Acquire Live GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {supportedSectors.map(sector => (
              <button
                key={sector.id}
                type="button"
                onClick={() => selectSectorById(sector.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                  selectedSector.id === sector.id && userLocation.source !== 'gps'
                    ? 'border-[rgba(22,199,132,0.4)] bg-[#151c26] text-white ring-1 ring-[#16c784]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[#0d121a] text-[#94a3b8] hover:text-white hover:bg-[#151c26]'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="truncate">{sector.name}</div>
                  {sector.description && (
                    <div className="text-[10px] text-[#64748b] font-normal truncate mt-0.5">{sector.description}</div>
                  )}
                </div>
                {selectedSector.id === sector.id && userLocation.source !== 'gps' && (
                  <Check className="h-4 w-4 text-[#16c784] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* 2. Regional Emergency Language */}
        <section className="profile-section-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white">
              <Languages className="h-5 w-5 text-[#22d3ee]" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                Regional Emergency Language
              </h2>
              <div className="text-xs text-[#94a3b8]">
                Translate live disaster bulletins and 3-minute survival guides automatically.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                  currentLanguage === lang.code
                    ? 'border-[#22d3ee]/60 bg-[#151c26] text-white ring-1 ring-[#22d3ee]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[#0d121a] text-[#94a3b8] hover:text-white hover:bg-[#151c26]'
                }`}
              >
                <div>
                  <div className="text-white font-bold">{lang.nativeName}</div>
                  <div className="text-[10px] text-[#64748b]">{lang.name}</div>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="h-4 w-4 text-[#22d3ee] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* 3. High-Priority Channels */}
        <section className="profile-section-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white">
              <Bell className="h-5 w-5 text-[#38a8ff]" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                High-Priority Broadcast Channels
              </h2>
              <div className="text-xs text-[#94a3b8]">
                Critical alerting pathways for imminent evacuation orders.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#151c26]">
              <div className="space-y-0.5">
                <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#38a8ff]" />
                  <span>Emergency SMS Broadcasts</span>
                </div>
                <div className="text-[11px] text-[#64748b]">
                  Automated SMS dispatch when data towers encounter severe storm degradation.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`h-6 w-11 rounded-full transition-colors relative cursor-pointer ${
                  smsAlerts ? 'bg-[#16c784]' : 'bg-[#0d121a]'
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                    smsAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            
            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#151c26]">
              <div className="space-y-0.5">
                <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-[#ff8a1f]" />
                  <span>Critical Evacuation Audio Alarm</span>
                </div>
                <div className="text-[11px] text-[#64748b]">
                  Override device silent mode during Code Red flood & cyclone warnings.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHighPrioritySound(!highPrioritySound)}
                className={`h-6 w-11 rounded-full transition-colors relative cursor-pointer ${
                  highPrioritySound ? 'bg-[#16c784]' : 'bg-[#0d121a]'
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                    highPrioritySound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        
        <section className="profile-section-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white">
              <ShieldAlert className="h-5 w-5 text-[#ff304f]" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                EOC Scenario Simulation Deck
              </h2>
              <div className="text-xs text-[#94a3b8]">
                Toggle simulated emergency conditions for demonstration and drill verification.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#151c26] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-white block">Flood Threat Active</span>
                <span className="text-[11px] text-[#64748b]">Simulate Sabarmati crest</span>
              </div>
              <button
                type="button"
                onClick={toggleThreatMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isThreatMode
                    ? 'bg-[#ff304f] text-white shadow-sm'
                    : 'bg-[#0d121a] text-[#94a3b8] border border-[rgba(255,255,255,0.08)]'
                }`}
              >
                {isThreatMode ? 'Simulating Code Red' : 'Normal State'}
              </button>
            </div>

            
            <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#151c26] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-white block">Low-Bandwidth Engine</span>
                <span className="text-[11px] text-[#64748b]">Simulate data loss</span>
              </div>
              <button
                type="button"
                onClick={toggleOfflineMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isOffline
                    ? 'bg-[#f5c542] text-[#06080d] font-black shadow-sm'
                    : 'bg-[#0d121a] text-[#94a3b8] border border-[rgba(255,255,255,0.08)]'
                }`}
              >
                {isOffline ? 'Offline Active' : 'Online'}
              </button>
            </div>
          </div>
        </section>

      </div>
      </div>
    </main>
  );
}
