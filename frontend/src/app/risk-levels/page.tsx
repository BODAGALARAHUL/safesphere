'use client';

import React from 'react';
import Link from 'next/link';
import { SeverityBadge } from '@/components/SeverityBadge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useDisaster } from '@/context/DisasterContext';
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  ShieldCheck,
  Phone,
  Navigation,
  Check,
  WifiOff
} from 'lucide-react';

export default function RiskLevelsPage() {
  const { isOffline, toggleOfflineMode } = useDisaster();

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-8">
      
      {/* Header */}
      <ScrollReveal delayMs={50}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>NATIONAL DISASTER RISK MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Risk Level Management & Protocol System
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            SafeSphere uses a standardized 4-tier color code system matching GSDMA & NDMA advisory standards to communicate disaster urgency without unnecessary panic.
          </p>
        </div>
      </ScrollReveal>

      {/* Low Internet / Offline Engine Status Card */}
      <ScrollReveal delayMs={100}>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shrink-0">
              <WifiOff className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Offline & Low-Bandwidth Data Engine</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                During cellular tower outages or 2G speeds, SafeSphere uses cached local telemetry and compressed map vector tiles to deliver uninterrupted survival data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleOfflineMode}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-100 transition-colors shrink-0"
          >
            {isOffline ? 'Simulate Online Network' : 'Test Offline Mode'}
          </button>
        </div>
      </ScrollReveal>

      {/* 4-TIER RISK LEVEL MATRIX GRID (Scroll-Triggered Reveal) */}
      <div className="space-y-4">
        <ScrollReveal delayMs={150}>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
            DISASTER RISK TIER BREAKDOWN
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* TIER 1: RED - CRITICAL */}
          <ScrollReveal delayMs={180}>
            <div className="rounded-2xl border-2 border-red-600 bg-red-50/70 dark:bg-red-950/40 p-6 shadow-md space-y-4 h-full">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                  RED TIER
                </span>
                <SeverityBadge severity="CRITICAL" size="sm" />
              </div>

              <div>
                <h3 className="text-xl font-black text-red-950 dark:text-red-100 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
                  <span>CRITICAL THREAT (IMMEDIATE ACTION)</span>
                </h3>
                <p className="text-xs sm:text-sm text-red-900 dark:text-red-200 font-medium mt-1 leading-relaxed">
                  Life-threatening disaster event occurring or imminent within 0–2 hours. High river discharge, dam breaches, or severe cyclone landfall.
                </p>
              </div>

              <div className="space-y-2 border-t border-red-200 dark:border-red-900/60 pt-3 text-xs font-bold text-red-950 dark:text-red-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-600" /> Move to higher ground or multi-story relief shelter.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-600" /> Shut off main electric breaker & LPG gas valve.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-600" /> Keep 112 emergency helpline ready.
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 2: ORANGE - HIGH RISK */}
          <ScrollReveal delayMs={240}>
            <div className="rounded-2xl border-2 border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 p-6 shadow-md space-y-4 h-full">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-wider">
                  ORANGE TIER
                </span>
                <SeverityBadge severity="HIGH_RISK" size="sm" />
              </div>

              <div>
                <h3 className="text-xl font-black text-orange-950 dark:text-orange-100 flex items-center gap-2">
                  <AlertOctagon className="h-6 w-6 text-orange-600 shrink-0" />
                  <span>HIGH RISK THREAT (BE PREPARED)</span>
                </h3>
                <p className="text-xs sm:text-sm text-orange-900 dark:text-orange-200 font-medium mt-1 leading-relaxed">
                  Elevated risk of severe storm, heavy rain, or structural hazard. Disruption to power and transport expected.
                </p>
              </div>

              <div className="space-y-2 border-t border-orange-200 dark:border-orange-900/60 pt-3 text-xs font-bold text-orange-950 dark:text-orange-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" /> Secure loose roof sheets and outdoor equipment.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" /> Charge power banks & emergency lights.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" /> Identify nearest safe shelter locations.
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 3: YELLOW - MODERATE / MAY BE NOT BE */}
          <ScrollReveal delayMs={300}>
            <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 dark:bg-amber-950/40 p-6 shadow-md space-y-4 h-full">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
                  YELLOW TIER
                </span>
                <SeverityBadge severity="MODERATE" size="sm" />
              </div>

              <div>
                <h3 className="text-xl font-black text-amber-950 dark:text-amber-100 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                  <span>MODERATE ADVISORY (MAY BE / WATCH)</span>
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium mt-1 leading-relaxed">
                  Disaster conditions may or may not intensify. Weather track under continuous observation by meteorological authorities.
                </p>
              </div>

              <div className="space-y-2 border-t border-amber-200 dark:border-amber-900/60 pt-3 text-xs font-bold text-amber-950 dark:text-amber-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" /> Monitor hourly official disaster bulletins.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" /> Keep drinking water supply ready.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" /> Avoid non-essential outdoor travel.
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 4: GREEN - SAFE */}
          <ScrollReveal delayMs={360}>
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 p-6 shadow-md space-y-4 h-full">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider">
                  GREEN TIER
                </span>
                <SeverityBadge severity="SAFE" size="sm" />
              </div>

              <div>
                <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                  <span>SAFE AREA (NORMAL ACTIVITY)</span>
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-medium mt-1 leading-relaxed">
                  No active disaster threats in your region. All municipal infrastructure and utility networks operating normally.
                </p>
              </div>

              <div className="space-y-2 border-t border-emerald-200 dark:border-emerald-900/60 pt-3 text-xs font-bold text-emerald-950 dark:text-emerald-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Maintain routine family preparedness kit.
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Ensure emergency contact list is updated.
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* QUICK ACTIONS */}
      <ScrollReveal delayMs={400}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/safe-zones"
            className="flex items-center justify-center gap-2 h-13 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-colors"
          >
            <Navigation className="h-5 w-5" />
            <span>VIEW NEARBY SAFE ZONES</span>
          </Link>

          <a
            href="tel:112"
            className="flex items-center justify-center gap-2 h-13 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>CALL 112 EMERGENCY HELPLINE</span>
          </a>
        </div>
      </ScrollReveal>

    </main>
  );
}
