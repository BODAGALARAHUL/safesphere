'use client';

import React, { useState } from 'react';
import { MOCK_SAFE_ZONES, SafeZone } from '@/data/safeZonesData';
import { SafeZoneMap } from '@/components/SafeZoneMap';
import { SafeZoneBottomSheet } from '@/components/SafeZoneBottomSheet';
import { useDisaster } from '@/context/DisasterContext';
import { MapPin, Navigation, Home, Hospital, Shield, Flame, Search } from 'lucide-react';

export default function SafeZonesPage() {
  const { t } = useDisaster();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<SafeZone | undefined>(MOCK_SAFE_ZONES[0]);

  const categories = [
    { id: 'All', label: t('allPlaces'), icon: MapPin },
    { id: 'Shelter', label: t('shelters'), icon: Home },
    { id: 'Hospital', label: t('hospitals'), icon: Hospital },
    { id: 'Police', label: t('police'), icon: Shield },
    { id: 'Fire', label: t('fireDept'), icon: Flame },
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
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <Navigation className="h-4 w-4" />
            <span>{t('evacuationNetwork')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('nearbySafeZonesTitle')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('nearbySafeZonesSubtitle')}
          </p>
        </div>
      </div>

      {/* Category Filter Chips & Search Bar */}
      <div className="space-y-3">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchSafeZonesPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all shadow-sm"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedFilter === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Responsive Map & Bottom Sheet List Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Map (Top on mobile / Right column on Desktop) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="sticky top-20">
            <SafeZoneMap
              safeZones={filteredSafeZones}
              selectedZone={selectedZone}
              onSelectZone={(zone) => setSelectedZone(zone)}
            />
          </div>
        </div>

        {/* Right Column: Bottom Sheet Location List (Bottom on mobile / Left column on Desktop) */}
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('availableLocations')} ({filteredSafeZones.length})
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {t('sortedByNearest')}
            </span>
          </div>

          <SafeZoneBottomSheet
            safeZones={filteredSafeZones}
            selectedZoneId={selectedZone?.id}
            onSelectZone={(zone) => setSelectedZone(zone)}
          />
        </div>

      </div>

    </main>
  );
}
