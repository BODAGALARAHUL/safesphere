'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SafeZoneService } from '@/services';
import { SafeZoneMap } from '@/components/SafeZoneMap';
import { SafeZoneBottomSheet } from '@/components/SafeZoneBottomSheet';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter } from '@/lib/animations';
import { MapPin, Navigation, Home, Hospital, Shield, Flame, Search } from 'lucide-react';

export default function SafeZonesPage() {
  const { selectedLocation, userLocation } = useDisaster();
  const containerRef = useRef<HTMLElement>(null);
  const [userSelectedZoneId, setUserSelectedZoneId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSafeZones = SafeZoneService.getSafeZones({
    category: selectedFilter,
    searchQuery,
    area: selectedLocation,
    userCoords: userLocation.coordinates,
  });

  const selectedZone = (userSelectedZoneId ? filteredSafeZones.find(z => z.id === userSelectedZoneId) : undefined) || filteredSafeZones[0] || SafeZoneService.getNearestSafeZone(userLocation.coordinates, selectedLocation);

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
        <p className="text-xs sm:text-sm text-[#b3c2d0] flex items-center gap-1.5 flex-wrap">
          <span>Verified live capacity, backup generators, and turn-by-turn routes around</span>
          <span className="font-semibold text-white flex items-center gap-1 bg-[#101c27] px-2 py-0.5 rounded-md border border-[#243646]">
            <MapPin className="h-3.5 w-3.5 text-[#10b981]" />
            {selectedLocation}
          </span>
          <span className="text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded border border-[#22d3ee]/20">
            {userLocation.source === 'gps' ? 'Live GPS Calculations' : 'Sector Proximity'}
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
              onSelectZone={(zone) => setUserSelectedZoneId(zone ? zone.id : null)}
              userCoords={userLocation.coordinates}
              userLocationLabel={selectedLocation}
            />
          </div>
        </section>

        
        <aside className="w-full min-w-0 min-h-0 xl:h-full flex flex-col">
          <div className="flex items-center justify-between mb-3 shrink-0 px-1">
            <span className="font-mono text-xs font-bold text-[#b3c2d0] uppercase tracking-wider">
              Nearby Havens ({filteredSafeZones.length} Locations)
            </span>
            <span className="text-[11px] font-mono text-[#71879a]">
              {userLocation.source === 'gps' ? 'Sorted by GPS Proximity' : 'Sorted by Sector Distance'}
            </span>
          </div>

          <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-2 space-y-4 custom-scrollbar">
            {filteredSafeZones.length > 0 ? (
              <SafeZoneBottomSheet
                safeZones={filteredSafeZones}
                selectedZoneId={selectedZone?.id}
                onSelectZone={(zone) => setUserSelectedZoneId(zone ? zone.id : null)}
              />
            ) : (
              <div className="p-8 text-center rounded-2xl bg-[#101c27] border border-[#243646] space-y-3">
                <MapPin className="h-8 w-8 text-[#71879a] mx-auto" />
                <h4 className="font-bold text-sm text-white">No Safe Havens Found</h4>
                <p className="text-xs text-[#b3c2d0] max-w-xs mx-auto">
                  No emergency shelters or medical centers match your current filter or search criteria. Try clearing search filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilter('All');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#162532] hover:bg-[#1c3040] text-xs font-bold text-[#22d3ee] border border-[#22d3ee]/30 transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </aside>

      </div>

      </div>
    </main>
  );
}
