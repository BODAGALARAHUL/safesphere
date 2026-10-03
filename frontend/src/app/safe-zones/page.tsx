'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SAFE_ZONES, SafeZone } from '@/data/safeZonesData';
import { SafeZoneMap } from '@/components/SafeZoneMap';
import { SafeZoneBottomSheet } from '@/components/SafeZoneBottomSheet';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter } from '@/lib/animations';
import { MapPin, Navigation, Home, Hospital, Shield, Flame, Search } from 'lucide-react';

export default function SafeZonesPage() {
  const { selectedLocation } = useDisaster();
  const containerRef = useRef<HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<SafeZone | undefined>(MOCK_SAFE_ZONES[0]);

  useEffect(() => {
    animatePageEnter(containerRef.current);
  }, []);

  const categories = [
    { id: 'All', label: 'All Safe Havens', icon: MapPin },
    { id: 'Shelter', label: 'Evacuation Shelters', icon: Home },
    { id: 'Hospital', label: 'Trauma & Hospitals', icon: Hospital },
    { id: 'Fire', label: 'Fire & Rescue', icon: Flame },
    { id: 'Police', label: 'Police Stations', icon: Shield },
  ];

  const filteredSafeZones = MOCK_SAFE_ZONES.filter(zone => {
    const matchesCategory = selectedFilter === 'All' || zone.type === selectedFilter;
    const matchesSearch =
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main 
      ref={containerRef}
      className="atmosphere-safezones w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-6">
      
      
      <div className="space-y-1.5 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22d3ee] uppercase tracking-wider">
          <Navigation className="h-4 w-4 text-[#22d3ee]" />
          <span>Geospatial Intelligence & Resource Allocation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Safe Haven & Emergency Hub Locator
        </h1>
        <p className="text-xs sm:text-sm text-[#b3c2d0] flex items-center gap-1.5">
          <span>Verified live capacity, backup generators, and turn-by-turn routes around</span>
          <span className="font-semibold text-white flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#10b981]" />
            {selectedLocation}
          </span>
        </p>
      </div>

      
      <div className="p-4 sm:p-5 rounded-2xl bg-[#101c27] border border-[#243646] space-y-4 shadow-sm w-full">
        
        
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71879a]" />
          <input
            type="text"
            placeholder="Search safe shelters by name, area, or amenities (e.g., generator, child care)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#243646] bg-[#162532] text-sm text-[#f4f8fb] placeholder:text-[#71879a] focus-command transition-all"
          />
        </div>

        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedFilter === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#22d3ee] text-[#071018] font-black shadow-md'
                    : 'bg-[#162532] border border-[#243646] text-[#b3c2d0] hover:text-white hover:bg-[#1c3040]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      
      <div className="flex flex-col xl:grid xl:grid-cols-[minmax(0,1.65fr)_minmax(420px,0.85fr)] gap-6 w-full xl:h-[min(700px,calc(100vh-280px))] xl:min-h-[560px]">
        
        
        <section className="relative min-w-0 h-[320px] sm:h-[400px] xl:h-full xl:min-h-0 overflow-hidden rounded-2xl border border-[#243646] bg-[#071018] shadow-2xl shrink-0">
          <div className="absolute inset-0">
            <SafeZoneMap
              safeZones={filteredSafeZones}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
            />
          </div>
        </section>

        
        <aside className="w-full min-w-0 min-h-0 xl:h-full flex flex-col">
          <div className="flex items-center justify-between mb-3 shrink-0 px-1">
            <span className="font-mono text-xs font-bold text-[#b3c2d0] uppercase tracking-wider">
              Nearby Havens ({filteredSafeZones.length} Locations)
            </span>
            <span className="text-[11px] font-mono text-[#71879a]">
              Sorted by Distance
            </span>
          </div>

          <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-2 space-y-4 custom-scrollbar">
            <SafeZoneBottomSheet
              safeZones={filteredSafeZones}
              selectedZoneId={selectedZone?.id}
              onSelectZone={setSelectedZone}
            />
          </div>
        </aside>

      </div>

      </div>
    </main>
  );
}
