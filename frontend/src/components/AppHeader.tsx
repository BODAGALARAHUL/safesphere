'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { SUPPORTED_LANGUAGES } from '@/data/translationsData';
import { Shield, MapPin, Bell, AlertTriangle, ShieldCheck, ChevronDown, Check, HeartHandshake, Globe } from 'lucide-react';

const LOCATIONS = [
  'Ahmedabad (Paldi / Vasna)',
  'Ahmedabad (Satellite / SG Highway)',
  'Mumbai Coast (Colaba / Worli)',
  'Surat (Hazira Coastal Belt)',
  'Delhi NCR (Yamuna Floodplain)',
];

export const AppHeader: React.FC = () => {
  const { 
    isThreatMode, 
    toggleThreatMode, 
    selectedLocation, 
    setSelectedLocation, 
    setIsSOSOpen,
    setIsNotificationDrawerOpen,
    setIsAssistanceModalOpen,
    currentLanguage,
    setLanguage,
    t
  } = useDisaster();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const activeLangOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors">
      
      {/* Primary Top Bar */}
      <div className="w-full flex h-13 sm:h-14 items-center justify-between px-2.5 sm:px-6 lg:px-8 gap-1">

        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 focus:outline-none rounded-md">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 dark:text-emerald-600" />
          </div>
          <div className="flex items-center">
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-sm sm:text-lg leading-tight">
              {t('appTitle')}
            </span>
            <span className="hidden md:inline-block ml-1 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
              SIH1462
            </span>
          </div>
        </Link>

        {/* Desktop / Tablet Center Location Selector */}
        <div className="hidden sm:flex items-center gap-2 shrink min-w-0">
          <div className="relative shrink min-w-0">
            <button
              type="button"
              onClick={() => {
                setIsLocationDropdownOpen(!isLocationDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 transition-colors max-w-[190px] min-w-0"
              aria-label="Select location"
            >
              <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              <span className="truncate min-w-0">{selectedLocation}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
        </div>

        {/* Right Actions Cluster */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Indian Language Switcher Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsLocationDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
              title="Change Language"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs font-black">{activeLangOption.flag}</span>
              <span className="hidden sm:inline text-xs font-extrabold">{activeLangOption.nativeName}</span>
              <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  Select Language / भाषा चुनें
                </div>
                <div className="max-h-64 overflow-y-auto space-y-0.5">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] opacity-60">({lang.name})</span>
                      </span>
                      {currentLanguage === lang.code && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Special Assistance Trigger */}
          <button
            type="button"
            onClick={() => setIsAssistanceModalOpen(true)}
            className="hidden lg:flex items-center justify-center h-8 px-2.5 text-xs font-bold rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 hover:bg-red-100 transition-colors"
            title="Request Special Assistance"
          >
            <HeartHandshake className="h-3.5 w-3.5 text-red-600 shrink-0" />
            <span className="ml-1">{t('specialAssistance')}</span>
          </button>

          {/* Desktop Threat Simulator Toggle */}
          <button
            type="button"
            onClick={toggleThreatMode}
            className={`hidden sm:flex items-center justify-center h-8 px-2.5 text-xs font-semibold rounded-lg border transition-all ${
              isThreatMode
                ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800 hover:bg-red-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
            }`}
            title="Toggle Demo State: Safe vs Active Threat"
          >
            {isThreatMode ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-red-600 animate-pulse shrink-0" />
                <span className="hidden md:inline ml-1">{t('demoThreatActive')}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="hidden md:inline ml-1">{t('demoAreaSafe')}</span>
              </>
            )}
          </button>

          {/* Quick SOS Trigger in Header */}
          <button
            type="button"
            onClick={() => setIsSOSOpen(true)}
            className="flex items-center justify-center h-8 px-2.5 text-xs font-black text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            SOS
          </button>

          {/* Notifications Icon Button */}
          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            aria-label="View notifications and special assistance logs"
          >
            <Bell className="h-4 w-4" />
            {isThreatMode && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Secondary Mobile Sub-Bar (<640px) */}
      <div className="flex sm:hidden items-center justify-between px-2.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 border-t border-slate-200/80 dark:border-slate-800 text-xs font-medium gap-2 min-w-0">
        {/* Mobile Location Selector */}
        <div className="relative min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              setIsLocationDropdownOpen(!isLocationDropdownOpen);
              setIsLangDropdownOpen(false);
            }}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 min-w-0 w-full"
          >
            <MapPin className="h-3 w-3 text-red-600 shrink-0" />
            <span className="truncate min-w-0 flex-1 text-left">{selectedLocation}</span>
            <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
          </button>

          {isLocationDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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

        {/* Mobile Compact Threat Toggle */}
        <button
          type="button"
          onClick={toggleThreatMode}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
            isThreatMode
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-emerald-600 text-white shadow-sm'
          }`}
        >
          {isThreatMode ? (
            <>
              <AlertTriangle className="h-3 w-3 animate-pulse shrink-0" />
              <span>THREAT ACTIVE</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-3 w-3 shrink-0" />
              <span>AREA SAFE</span>
            </>
          )}
        </button>
      </div>

    </header>
  );
};
