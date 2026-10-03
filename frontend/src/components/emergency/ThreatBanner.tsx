'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { SeverityBadge } from '@/components/SeverityBadge';
import { DisasterAlert, getLocalizedAlert } from '@/data/disastersData';
import { SafeZone } from '@/data/safeZonesData';
import { createScrollCounter, createParallaxEffect } from '@/lib/animations';
import {
  ShieldCheck,
  Navigation,
  Phone,
  ArrowRight,
  MapPin,
  Clock,
  Radio,
  BookOpen,
  ShieldAlert
} from 'lucide-react';

interface ThreatBannerProps {
  alert: DisasterAlert;
  nearestShelter: SafeZone;
}

export const ThreatBanner: React.FC<ThreatBannerProps> = ({ alert, nearestShelter }) => {
  const { isThreatMode, selectedLocation, currentLanguage, t } = useDisaster();
  const localizedAlert = getLocalizedAlert(alert, currentLanguage);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const radarGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scoreRef.current) {
      createScrollCounter(scoreRef.current, 92);
    }
    if (radarGlowRef.current) {
      createParallaxEffect(radarGlowRef.current, 0.2);
    }
  }, []);

  if (!isThreatMode) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-[#0d121a] border border-[rgba(22,199,132,0.3)] p-6 sm:p-8 text-[#f5f7fa] shadow-2xl">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(22,199,132,0.06)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(22,199,132,0.12)] text-[#16c784] text-xs font-bold border border-[rgba(22,199,132,0.25)]">
              <span className="h-2 w-2 rounded-full bg-[#16c784] animate-pulse" />
              <span>{t('areaMonitoring') || 'SECTOR SENSOR MESH ACTIVE · NO CRITICAL THREAT'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5 text-white">
              <ShieldCheck className="h-7 w-7 text-[#16c784] shrink-0" />
              <span>All Systems Normal in {selectedLocation}</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              River basin telemetry, municipal rain gauges, and meteorological Doppler feeds report baseline parameters. 
              Review your emergency preparedness kit and nearest designated evacuation safe havens.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] pt-1 font-mono">
              <span className="flex items-center gap-1.5 text-[#94a3b8]">
                <Clock className="h-3.5 w-3.5 text-[#16c784]" /> Synced: 2m ago
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#94a3b8]">
                <Radio className="h-3.5 w-3.5 text-[#16c784]" /> SDMA Sensor Mesh Live
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/preparedness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16c784] hover:bg-[#12a970] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[44px]"
            >
              <span>Check Household Kit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0d121a] border border-[rgba(255,48,79,0.35)] shadow-2xl">
      
      <div className="bg-[#ff304f] text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold tracking-wide">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-ping shrink-0" />
          <span className="uppercase tracking-widest text-[11px] font-black">CRITICAL INCIDENT LIVE BROADCAST</span>
          <span className="hidden sm:inline opacity-80">·</span>
          <span className="hidden sm:inline font-mono">CODE RED: SABARMATI BASIN OVERFLOW</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span>ISSUED {localizedAlert.issuedAt}</span>
          <span>·</span>
          <span>IMPACT: {localizedAlert.affectedRadius}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <SeverityBadge severity={localizedAlert.severity} size="md" />
              <span className="px-2.5 py-0.5 rounded-full bg-[rgba(255,48,79,0.15)] text-[#ff304f] border border-[rgba(255,48,79,0.3)] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff304f] animate-pulse" />
                YOU ARE INSIDE FLOOD IMPACT ZONE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {localizedAlert.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed max-w-2xl">
              {localizedAlert.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748b] pt-1">
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#151c26] px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.06)]">
                <MapPin className="h-3.5 w-3.5 text-[#ff304f]" /> Sector: {selectedLocation}
              </span>
              <span className="flex items-center gap-1.5 text-[#94a3b8]">
                <Radio className="h-3.5 w-3.5 text-[#ff304f]" /> Source: {localizedAlert.officialSource}
              </span>
            </div>
          </div>

          
          <div className="lg:col-span-4 rounded-xl bg-[#151c26] border border-[rgba(255,48,79,0.3)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase font-bold text-[#94a3b8] flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-[#ff304f]" />
                Composite Risk
              </span>
              <span className="px-2 py-0.5 rounded bg-[#ff304f]/20 text-[#ff304f] font-black text-[10px] tracking-wider">
                EXTREME
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span ref={scoreRef} className="text-4xl sm:text-5xl font-black font-mono text-[#ff304f] tracking-tight">
                92
              </span>
              <span className="text-xs text-[#64748b] font-mono">/ 100 Risk Index</span>
            </div>

            <div className="space-y-1.5 text-[11px] pt-1 border-t border-[rgba(255,255,255,0.06)]">
              <div className="flex justify-between text-[#94a3b8]">
                <span>River Crest Level:</span>
                <span className="font-mono font-bold text-white">134.5 ft (+1.2 ft/hr)</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Evacuation Corridor:</span>
                <span className="font-mono font-bold text-[#16c784]">Vasna Bridge Open</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Nearest Haven:</span>
                <span className="font-mono font-bold text-[#38a8ff]">{nearestShelter.distanceKm} km ({nearestShelter.name})</span>
              </div>
            </div>
          </div>

        </div>

        
        <div className="rounded-xl bg-[rgba(255,48,79,0.08)] border border-[rgba(255,48,79,0.25)] p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#ff304f] uppercase tracking-wider block">
                Immediate Operational Directive
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                MOVE TO HIGHER GROUND OR NEAREST ASSIGNED EVACUATION HAVEN
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Turn off household gas valve and electrical mains before departure. Do not cross flooded roadways or underpasses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                href="/safe-zones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#38a8ff] hover:bg-[#2b8edd] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <Navigation className="h-4 w-4" />
                <span>Find Safe Haven</span>
              </Link>

              <a
                href="tel:112"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <Phone className="h-4 w-4" />
                <span>Call 112 Help</span>
              </a>

              <Link
                href={`/disasters/${alert.disasterType.toLowerCase()}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.08)] text-[#f5f7fa] text-xs font-semibold transition-all min-h-[44px]"
              >
                <BookOpen className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>Survival SOP</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
