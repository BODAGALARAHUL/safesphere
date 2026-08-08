'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { Shield, MapPin, Bell, AlertTriangle, ShieldCheck, ChevronDown, Check, WifiOff } from 'lucide-react';

const LOCATIONS = [
  'Ahmedabad (Paldi / Vasna)',
  'Ahmedabad (Satellite / SG Highway)',
  'Mumbai Coast (Colaba / Worli)',
  'Surat (Hazira Coastal Belt)',
  'Delhi NCR (Yamuna Floodplain)',
];

export const AppHeader: React.FC = () => {
  const { isThreatMode, toggleThreatMode, isOffline, toggleOfflineMode, selectedLocation, setSelectedLocation, setIsSOSOpen } = useDisaster();
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors">
      <div className="w-full flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm">
            <Shield className="h-5 w-5 text-emerald-400 dark:text-emerald-600" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-lg leading-tight">
              SafeSphere
            </span>
            <span className="hidden sm:inline-block ml-1 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
              SIH1462
            </span>
          </div>
        </Link>

        {/* Center: Location Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Select location"
          >
            <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="max-w-[130px] sm:max-w-[200px] truncate">{selectedLocation}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          </button>

          {isLocationDropdownOpen && (
            <div className="absolute right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-lg z-50">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Simulated Location
              </div>
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span className="truncate">{loc}</span>
                  {selectedLocation === loc && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Threat Toggle & Offline Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Offline Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleOfflineMode}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md border transition-all ${
              isOffline
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Offline Network Simulation"
          >
            <WifiOff className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden lg:inline">{isOffline ? 'Offline Active' : 'Offline Engine'}</span>
          </button>

          {/* Threat Simulator Toggle Button for SIH Jury Demo */}
          <button
            type="button"
            onClick={toggleThreatMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${isThreatMode
                ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800 hover:bg-red-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
            title="Toggle Demo State: Safe vs Active Threat"
          >
            {isThreatMode ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-red-600 animate-pulse" />
                <span className="hidden md:inline">Demo: Threat Active</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="hidden md:inline">Demo: Area Safe</span>
              </>
            )}
          </button>

          {/* Quick SOS Trigger in Header */}
          <button
            type="button"
            onClick={() => setIsSOSOpen(true)}
            className="flex items-center justify-center h-8 px-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            SOS
          </button>

          {/* Notifications Icon */}
          <Link
            href="/alerts"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            aria-label="View alerts"
          >
            <Bell className="h-4 w-4" />
            {isThreatMode && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};
