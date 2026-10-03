'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { ThreatBanner } from '@/components/emergency/ThreatBanner';
import { QuickActionGrid } from '@/components/emergency/QuickActionGrid';
import { SafeZoneMap } from '@/components/SafeZoneMap';
import { MOCK_SAFE_ZONES, SafeZone } from '@/data/safeZonesData';
import {
  animatePageEnter,
  createScrollReveal,
  createScrollCounter,
  createScrollProgress,
} from '@/lib/animations';
import {
  Navigation,
  ArrowRight,
  MapPin,
  Activity,
  Phone,
  CheckSquare
} from 'lucide-react';

export default function HomePage() {
  const {
    activeAlert,
    prepPercentage,
    completedPrepCount,
    totalPrepCount,
    selectedLocation
  } = useDisaster();

  const containerRef = useRef<HTMLElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const prepSectionRef = useRef<HTMLElement>(null);
  const prepScoreRef = useRef<HTMLSpanElement>(null);
  const prepBarRef = useRef<HTMLDivElement>(null);
  const telemetrySectionRef = useRef<HTMLElement>(null);

  const [selectedZone, setSelectedZone] = useState<SafeZone | undefined>(MOCK_SAFE_ZONES[0]);
  const [mapCategory, setMapCategory] = useState<string>('All');

  useEffect(() => {
    animatePageEnter(containerRef.current);
    if (mapSectionRef.current) createScrollReveal(mapSectionRef.current, { yOffset: 28 });
    if (prepSectionRef.current) createScrollReveal(prepSectionRef.current, { yOffset: 24 });
    if (prepScoreRef.current) createScrollCounter(prepScoreRef.current, prepPercentage, { suffix: '%' });
    if (prepBarRef.current) createScrollProgress(prepBarRef.current, prepPercentage);
    if (telemetrySectionRef.current) createScrollReveal(telemetrySectionRef.current, { yOffset: 24 });
  }, [prepPercentage]);

  const filteredSafeZones = MOCK_SAFE_ZONES.filter(z => 
    mapCategory === 'All' ? true : z.type === mapCategory
  );

  return (
    <main 
      ref={containerRef}
      className="atmosphere-home w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-8">
      
      
      <ThreatBanner alert={activeAlert} nearestShelter={MOCK_SAFE_ZONES[0]} />

      
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee] animate-pulse" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#b3c2d0]">
              Tactical Response Channels
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#71879a]">
            One-Touch Execution
          </span>
        </div>
        <QuickActionGrid />
      </section>

      
      <section ref={mapSectionRef} className="rounded-2xl bg-[#101c27] border border-[#243646] p-5 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#243646]/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[rgba(34,211,238,0.15)] text-[#22d3ee] text-[10px] font-mono font-bold uppercase">
                Geospatial Command
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Navigation className="h-5 w-5 text-[#22d3ee]" />
                Evacuation Safe Havens & Medical Hubs
              </h2>
            </div>
            <p className="text-xs text-[#b3c2d0]">
              Live GPS perimeter, verified bed availability, and turn-by-turn routing around {selectedLocation}.
            </p>
          </div>

          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {[
              { id: 'All', label: 'All Havens' },
              { id: 'Shelter', label: 'Shelters' },
              { id: 'Hospital', label: 'Hospitals' },
              { id: 'Fire', label: 'Fire & Rescue' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setMapCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapCategory === cat.id
                    ? 'bg-[#22d3ee] text-[#071018] font-black shadow-md'
                    : 'bg-[#162532] text-[#b3c2d0] hover:text-white border border-[#243646]'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <Link
              href="/safe-zones"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#162532] hover:bg-[#1c3040] text-[#22d3ee] border border-[#22d3ee]/30 flex items-center gap-1 shrink-0"
            >
              <span>Full Map</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          
          <div className="lg:col-span-7 h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#243646] relative z-10 shadow-inner">
            <SafeZoneMap
              safeZones={filteredSafeZones}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
            />
          </div>

          
          <div className="lg:col-span-5 space-y-3 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSafeZones.slice(0, 4).map(zone => {
              const isSelected = selectedZone?.id === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-2.5 ${
                    isSelected
                      ? 'bg-[#162532] border-[#22d3ee] shadow-xl ring-1 ring-[#22d3ee]'
                      : 'bg-[#0b141d] border-[#243646]/60 hover:bg-[#162532] hover:border-[#355066]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-black text-sm text-white leading-tight">{zone.name}</h4>
                      <p className="text-xs text-[#b3c2d0] flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-[#f43f5e]" />
                        {zone.area}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-black text-[#22d3ee] shrink-0 bg-[rgba(34,211,238,0.12)] px-2.5 py-1 rounded-md">
                      {zone.distanceKm} km
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#243646]/60">
                    <span className="font-bold text-[#10b981] font-mono">● {zone.capacityBeds}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${zone.contactNumber}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-xl bg-[#162532] hover:bg-[#1c3040] text-[#b3c2d0] hover:text-white transition-colors"
                        title="Call desk"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={zone.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 rounded-xl bg-[#22d3ee] hover:bg-[#06b6d4] text-[#071018] font-black text-xs shadow-sm transition-all"
                      >
                        Navigate
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        
        <section ref={prepSectionRef} className="lg:col-span-7 rounded-2xl bg-[#101c27] border border-[#243646] p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-[#10b981]" />
                <h3 className="font-black text-base text-white">Household Survival Kit Readiness</h3>
              </div>
              <p className="text-xs text-[#b3c2d0]">
                {completedPrepCount} of {totalPrepCount} essential disaster provisions packed and verified.
              </p>
            </div>
            <span ref={prepScoreRef} className="font-mono text-3xl font-black text-[#10b981]">
              {prepPercentage}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#162532] rounded-full overflow-hidden border border-[#243646] p-0.5">
            <div
              ref={prepBarRef}
              className="h-full bg-gradient-to-r from-[#22d3ee] to-[#10b981] rounded-full transition-all duration-500"
              style={{ width: `${prepPercentage}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
            <div className="flex items-center gap-2 text-[#b3c2d0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span>72-Hour Survival Water, Medical Kit & Emergency Radio Recommended</span>
            </div>
            <Link
              href="/preparedness"
              className="font-bold text-[#10b981] hover:underline flex items-center gap-1"
            >
              <span>Manage Kit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        
        <section ref={telemetrySectionRef} className="lg:col-span-5 rounded-2xl bg-[#101c27] border border-[#243646] p-5 sm:p-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#243646]/60 pb-2.5">
            <span className="text-[#b3c2d0] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-[#22d3ee]" />
              Live Operations Mesh
            </span>
            <span className="px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] font-bold text-[10px]">
              ONLINE · 100%
            </span>
          </div>

          <div className="space-y-2 text-[#b3c2d0]">
            <div className="flex justify-between">
              <span>EOC Telemetry Node:</span>
              <span className="font-bold text-white">{selectedLocation}</span>
            </div>
            <div className="flex justify-between">
              <span>NDMA Hazard Stream:</span>
              <span className="font-bold text-[#10b981]">Connected (WebSocket)</span>
            </div>
            <div className="flex justify-between">
              <span>Sensor Sampling Rate:</span>
              <span className="font-bold text-white">60s Automatic</span>
            </div>
            <div className="flex justify-between">
              <span>Local Offline Engine:</span>
              <span className="font-bold text-[#22d3ee]">Ready & Synchronized</span>
            </div>
          </div>
        </section>

      </div>

      
      <div className="w-full overflow-hidden rounded-xl border border-[#243646] bg-[#071018]/80 py-2.5 px-4 font-mono text-xs text-[#71879a]">
        <div className="flex items-center gap-8 whitespace-nowrap animate-pulse">
          <span className="flex items-center gap-2 text-[#22d3ee]">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee] animate-ping" />
            EOC NODE ONLINE: {selectedLocation}
          </span>
          <span>•</span>
          <span className="text-[#10b981]">NDMA DOPPLER RADAR ACTIVE</span>
          <span>•</span>
          <span className="text-[#f43f5e]">SABARMATI RIVER CREST: 134.5 FT (+1.2 FT/HR)</span>
          <span>•</span>
          <span className="text-[#f59e0b]">SHELTER CAPACITY: 82% BEDS AVAILABLE</span>
          <span>•</span>
          <span className="text-[#38a8ff]">GPS MESH TRIANGULATION LOCKED</span>
        </div>
      </div>
      </div>
    </main>
  );
}
