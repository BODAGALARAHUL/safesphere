'use client';

import React from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { SeverityBadge } from '@/components/SeverityBadge';
import { AlertCard } from '@/components/AlertCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MOCK_SAFE_ZONES } from '@/data/safeZonesData';
import { MOCK_DISASTER_ALERTS } from '@/data/disastersData';
import {
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Phone,
  ArrowRight,
  Shield,
  BookOpen,
  CheckCircle2,
  Navigation,
  Clock,
  ChevronRight,
  Flame,
  Hospital,
  Home as HomeIcon,
  LifeBuoy
} from 'lucide-react';

export default function HomePage() {
  const {
    isThreatMode,
    selectedLocation,
    setIsSOSOpen,
    activeAlert,
    prepPercentage,
    completedPrepCount,
    totalPrepCount,
    t
  } = useDisaster();

  const nearbyShelter = MOCK_SAFE_ZONES[0];
  const nearbyHospital = MOCK_SAFE_ZONES[1];

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-8">
      
      {/* 1. DYNAMIC SAFETY STATE HEADER BLOCK */}
      <ScrollReveal delayMs={50}>
        {!isThreatMode ? (
          /* NORMAL / SAFE STATE */
          <div className="relative overflow-hidden rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 border border-emerald-800 shadow-md">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('areaMonitoring')}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3 text-white">
                  <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
                  <span>{t('areaSafe')}</span>
                </h1>

                <p className="text-sm text-emerald-200 max-w-xl leading-relaxed">
                  {t('noSevereWarnings')} <span className="font-semibold text-white">{selectedLocation}</span>. {t('allSystemsNormal')}
                </p>

                <div className="flex items-center gap-4 pt-1 text-xs text-emerald-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Updated 2 min ago
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> GSDMA Live Feed
                  </span>
                </div>
              </div>

              {/* Right Action */}
              <div className="shrink-0">
                <Link
                  href="/preparedness"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-sm font-black shadow transition-all active:scale-95"
                >
                  <span>{t('checkPreparedness')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* CRITICAL THREAT STATE (Active Warning Dominant Element) */
          <div className="relative overflow-hidden rounded-2xl bg-red-950 text-white p-6 sm:p-8 border-2 border-red-600 shadow-xl animate-in fade-in duration-300">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-red-600/20 blur-3xl" />

            <div className="relative z-10 space-y-5">
              
              {/* Top Banner Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <SeverityBadge severity="CRITICAL" size="lg" />
                
                <span className="text-xs font-mono font-bold text-red-300 bg-red-900/80 px-2.5 py-1 rounded-md border border-red-800">
                  DISASTER CODE: GSDMA-FLD-2026
                </span>
              </div>

              {/* Alert Headline */}
              <div>
                <div className="text-xs uppercase tracking-widest font-black text-red-400 mb-1">
                  {t('highRiskAlert')}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {activeAlert.title}
                </h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-red-200 font-medium mt-2">
                  <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{activeAlert.location}</span>
                  <span className="opacity-60">•</span>
                  <Clock className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{activeAlert.issuedAt}</span>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-sm sm:text-base text-red-100 max-w-3xl leading-relaxed border-l-2 border-red-500 pl-4 py-0.5">
                {activeAlert.summary}
              </p>

              {/* DOMINANT EMERGENCY ACTION CALLS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* CTA 1: What Should I Do? */}
                <Link
                  href={`/alerts/${activeAlert.id}`}
                  className="flex items-center justify-center gap-2 h-13 px-4 rounded-xl bg-white text-red-950 hover:bg-red-50 text-sm font-black shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400"
                >
                  <BookOpen className="h-5 w-5 text-red-600" />
                  <span>{t('whatShouldIDo')}</span>
                </Link>

                {/* CTA 2: Find Safe Location */}
                <Link
                  href="/safe-zones"
                  className="flex items-center justify-center gap-2 h-13 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400"
                >
                  <Navigation className="h-5 w-5" />
                  <span>{t('findSafeLocation')}</span>
                </Link>

                {/* CTA 3: Call 112 */}
                <a
                  href="tel:112"
                  className="flex items-center justify-center gap-2 h-13 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-black shadow-lg border border-red-500 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400"
                >
                  <Phone className="h-5 w-5" />
                  <span>{t('call112')}</span>
                </a>

              </div>

            </div>
          </div>
        )}
      </ScrollReveal>

      {/* 2. PRIMARY QUICK ACTIONS (Scroll Reveal) */}
      <ScrollReveal delayMs={100}>
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            WHAT DO YOU NEED RIGHT NOW?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Quick Action 1: SOS */}
            <button
              type="button"
              onClick={() => setIsSOSOpen(true)}
              className="flex flex-col items-start p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 text-red-950 dark:text-red-100 hover:bg-red-100/70 transition-all text-left group"
            >
              <div className="p-2.5 rounded-lg bg-red-600 text-white mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-sm sm:text-base leading-tight">{t('emergencySOS')}</span>
              <span className="text-[11px] text-red-700 dark:text-red-300 mt-1">{t('oneTap112')}</span>
            </button>

            {/* Quick Action 2: Safe Zones */}
            <Link
              href="/safe-zones"
              className="flex flex-col items-start p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100 hover:bg-emerald-100/70 transition-all text-left group"
            >
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-sm sm:text-base leading-tight">{t('findSafety')}</span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">{t('sheltersAndHospitals')}</span>
            </Link>

            {/* Quick Action 3: Active Alerts */}
            <Link
              href="/alerts"
              className="flex flex-col items-start p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-sky-950 dark:text-sky-100 hover:bg-sky-100/70 transition-all text-left group"
            >
              <div className="p-2.5 rounded-lg bg-sky-600 text-white mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-sm sm:text-base leading-tight">{t('disasterAlerts')}</span>
              <span className="text-[11px] text-sky-700 dark:text-sky-300 mt-1">{t('regionalFeed')}</span>
            </Link>

            {/* Quick Action 4: Disaster Guidance */}
            <Link
              href="/disasters"
              className="flex flex-col items-start p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200/70 transition-all text-left group"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-sm sm:text-base leading-tight">{t('actionLibrary')}</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{t('floodCycloneFire')}</span>
            </Link>

          </div>
        </section>
      </ScrollReveal>

      {/* 3. PREPAREDNESS PROGRESS CARD (Scroll Reveal) */}
      <ScrollReveal delayMs={150}>
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    EMERGENCY PREPAREDNESS
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {prepPercentage}% Complete ({completedPrepCount}/{totalPrepCount})
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                  style={{ width: `${prepPercentage}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                Keep your drinking water, document vault, and first-aid kit ready before severe weather strikes.
              </p>
            </div>

            <Link
              href="/preparedness"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-100 transition-colors shrink-0"
            >
              <span>Continue Checklist</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. NEARBY SAFETY SPOTLIGHT (Scroll Reveal) */}
      <ScrollReveal delayMs={200}>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              NEARBY SAFE LOCATIONS
            </h2>
            <Link
              href="/safe-zones"
              className="text-xs font-semibold text-slate-900 dark:text-white hover:underline flex items-center gap-1"
            >
              View Map & All Locations <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Nearby Shelter */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  <HomeIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {nearbyShelter.name}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {nearbyShelter.status} · {nearbyShelter.capacityBeds}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-900 dark:text-white">
                  {nearbyShelter.distanceKm} km
                </span>
              </div>
            </div>

            {/* Nearby Hospital */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                  <Hospital className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {nearbyHospital.name}
                  </div>
                  <div className="text-xs text-red-700 dark:text-red-400 font-medium">
                    {nearbyHospital.status}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-900 dark:text-white">
                  {nearbyHospital.distanceKm} km
                </span>
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* 5. REGIONAL ALERT FEED (Scroll Reveal) */}
      <ScrollReveal delayMs={250}>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ACTIVE REGIONAL ALERTS
            </h2>
            <Link
              href="/alerts"
              className="text-xs font-semibold text-slate-900 dark:text-white hover:underline flex items-center gap-1"
            >
              See All Alerts ({MOCK_DISASTER_ALERTS.length}) <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_DISASTER_ALERTS.slice(0, 2).map((alert, idx) => (
              <ScrollReveal key={alert.id} delayMs={idx * 100}>
                <AlertCard alert={alert} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 6. EMERGENCY NUMBERS BAR (Scroll Reveal) */}
      <ScrollReveal delayMs={300}>
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                <LifeBuoy className="h-4 w-4" />
                <span>OFFICIAL EMERGENCY HELPLINES</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                National Emergency Response System (112) is available 24x7 for instant police, medical, and fire dispatch.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-black shadow transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>CALL 112</span>
              </a>
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                <span>108 Medical</span>
              </a>
              <a
                href="tel:101"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                <span>101 Fire</span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </main>
  );
}
