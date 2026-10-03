'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter, createStaggerReveal } from '@/lib/animations';
import { User, MapPin, Bell, Check, ShieldAlert, Smartphone, Volume2 } from 'lucide-react';

export default function ProfilePage() {
  const { selectedLocation, setSelectedLocation, isThreatMode, toggleThreatMode, isOffline, toggleOfflineMode } = useDisaster();
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

  const locations = [
    'Ahmedabad · Paldi',
    'Ahmedabad · Vasna',
    'Ahmedabad · Satellite',
    'Ahmedabad · Ellisbridge',
  ];

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
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white">
              <MapPin className="h-5 w-5 text-[#16c784]" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                Assigned Monitored Sector
              </h2>
              <div className="text-xs text-[#94a3b8]">
                Real-time hazard alerts and nearest safe havens will default to this geographic zone.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {locations.map(loc => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                  selectedLocation === loc
                    ? 'border-[rgba(22,199,132,0.4)] bg-[#151c26] text-white ring-1 ring-[#16c784]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[#0d121a] text-[#94a3b8] hover:text-white hover:bg-[#151c26]'
                }`}
              >
                <span>{loc}</span>
                {selectedLocation === loc && (
                  <Check className="h-4 w-4 text-[#16c784] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </section>

        
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
