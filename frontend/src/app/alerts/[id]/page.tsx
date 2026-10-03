'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_DISASTER_ALERTS, getLocalizedAlert } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter, createStaggerReveal } from '@/lib/animations';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Phone,
  Navigation,
  XCircle,
  Radio,
  FileCheck
} from 'lucide-react';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const briefingListRef = useRef<HTMLDivElement>(null);
  const [activeBriefingSection, setActiveBriefingSection] = useState<string>('sec-01');
  const { currentLanguage } = useDisaster();
  const alertId = params?.id as string;

  useEffect(() => {
    animatePageEnter(containerRef.current);
    if (briefingListRef.current) {
      createStaggerReveal(briefingListRef.current, '.briefing-card', { stagger: 0.1 });
    }
  }, []);

  const rawAlert = MOCK_DISASTER_ALERTS.find(a => a.id === alertId) || MOCK_DISASTER_ALERTS[0];
  const alert = getLocalizedAlert(rawAlert, currentLanguage);

  const briefingNav = [
    { id: 'sec-01', num: '01', title: 'Situation Intelligence' },
    { id: 'sec-02', num: '02', title: 'Citizen Directives' },
    { id: 'sec-03', num: '03', title: 'Prohibited Actions' },
    { id: 'sec-04', num: '04', title: 'Emergency Actions' }
  ];

  const scrollToSection = (id: string) => {
    setActiveBriefingSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main 
      ref={containerRef}
      className="atmosphere-alerts w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-6">
      
      
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#94a3b8] hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Incident Feed</span>
        </button>
      </div>

      
      <div className="rounded-2xl border border-[rgba(255,48,79,0.35)] bg-[#0d121a] p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2.5">
            <SeverityBadge severity={alert.severity} size="lg" />
            <span className="font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 animate-pulse text-[#ff304f]" />
              OFFICIAL INCIDENT BRIEFING
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#64748b]">
            <span>ISSUED {alert.issuedAt}</span>
            <span>•</span>
            <span className="text-[#94a3b8]">{alert.officialSource}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {alert.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a3b8] font-mono">
            <span className="flex items-center gap-1 text-white font-bold bg-[#151c26] px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.06)]">
              <MapPin className="h-3.5 w-3.5 text-[#ff304f]" /> Sector: {alert.location}
            </span>
            <span>Hazard Perimeter: {alert.affectedRadius}</span>
            <span>Sensor ID: NDMA-GJ-{alert.disasterType.toUpperCase()}-09</span>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        
        <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 space-y-3 p-4 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] shadow-lg">
          <div className="font-mono text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[rgba(255,255,255,0.06)]">
            <FileCheck className="h-3.5 w-3.5 text-[#38a8ff]" />
            <span>Briefing Index</span>
          </div>
          <nav className="space-y-1.5">
            {briefingNav.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                  activeBriefingSection === item.id
                    ? 'bg-[#151c26] text-white border border-[rgba(56,168,255,0.4)] shadow-sm'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#151c26]/50'
                }`}
              >
                <span className="font-mono text-[10px] text-[#38a8ff]">{item.num}</span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        
        <div ref={briefingListRef} className="lg:col-span-9 space-y-6">
          
          
          <section id="sec-01" className="briefing-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(56,168,255,0.3)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#38a8ff] uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#38a8ff]" />
              <span>01 · Situation Intelligence</span>
            </div>
            <p className="text-sm text-[#f5f7fa] leading-relaxed">
              {alert.summary}
            </p>
            <div className="p-4 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.06)] text-xs text-[#94a3b8] space-y-1">
              <span className="font-bold text-white block">Official Verification:</span>
              <p>Verified through Gujarat State Disaster Management Authority (GSDMA) Doppler radar and Sabarmati river crest telemetry.</p>
            </div>
          </section>

          
          <section id="sec-02" className="briefing-card rounded-2xl border border-[rgba(22,199,132,0.3)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(22,199,132,0.5)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#16c784] uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-[#16c784]" />
              <span>02 · Immediate Citizen Directives</span>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(22,199,132,0.08)] border border-[rgba(22,199,132,0.25)] space-y-1">
              <span className="text-xs font-bold text-[#16c784] uppercase tracking-wider">Primary Action Required:</span>
              <p className="text-base sm:text-lg font-black text-white">{alert.actions && alert.actions[0] ? alert.actions[0] : 'Follow evacuation instructions'}</p>
            </div>
            <ul className="space-y-2 text-xs text-[#94a3b8] pt-1">
              <li className="flex items-start gap-2">
                <span className="text-[#16c784] font-bold">✓</span>
                <span>Pack your portable 72-hour survival kit with identification, medications, and charged power banks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16c784] font-bold">✓</span>
                <span>Switch off domestic electrical mains breakers and shut the LPG cylinder valve.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16c784] font-bold">✓</span>
                <span>Proceed immediately to designated high-ground concrete shelters or multi-story centers.</span>
              </li>
            </ul>
          </section>

          
          <section id="sec-03" className="briefing-card rounded-2xl border border-[rgba(255,48,79,0.3)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(255,48,79,0.5)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider">
              <XCircle className="h-4 w-4 text-[#ff304f]" />
              <span>03 · Prohibited Actions & Hazards to Avoid</span>
            </div>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li className="flex items-start gap-2">
                <span className="text-[#ff304f] font-bold">✕</span>
                <span>Do NOT attempt to drive or walk through flooded roadways, underpasses, or bridges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff304f] font-bold">✕</span>
                <span>Do NOT touch submerged power cables, transformer poles, or downed electrical infrastructure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff304f] font-bold">✕</span>
                <span>Do NOT drink tap water without rolling boiling for at least 3 minutes during flood alerts.</span>
              </li>
            </ul>
          </section>

          
          <section id="sec-04" className="briefing-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                04 · Emergency Support Actions
              </span>
              <span className="text-xs text-[#64748b]">Real-Time Dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/safe-zones"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(56,168,255,0.3)] text-white font-bold text-xs transition-all shadow-sm hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="h-5 w-5 text-[#38a8ff]" />
                  <span>Navigate to Nearest Safe Haven</span>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-[#38a8ff] transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:112"
                className="flex items-center justify-between p-4 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="h-5 w-5" />
                  <span>Call 112 National Emergency Response</span>
                </div>
                <span className="font-mono uppercase text-[11px] px-2 py-0.5 rounded bg-black/20">Dial</span>
              </a>
            </div>
          </section>

        </div>

      </div>
      </div>
    </main>
  );
}
