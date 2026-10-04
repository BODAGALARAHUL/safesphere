'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AlertService } from '@/services';
import { getLocalizedAlert } from '@/data/disastersData';
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
  FileCheck,
  AlertTriangle,
  BookOpen
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
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (briefingListRef.current) {
      createStaggerReveal(briefingListRef.current, '.briefing-card', { stagger: 0.1 });
    }
  }, [alertId]);

  const rawAlert = AlertService.getAlertById(alertId);

  if (!rawAlert) {
    return (
      <main ref={containerRef} className="atmosphere-alerts w-full min-h-screen py-12">
        <div className="page-shell max-w-2xl mx-auto text-center space-y-6">
          <div className="p-8 rounded-2xl bg-[#0d121a] border border-[rgba(255,48,79,0.3)] space-y-4 shadow-2xl">
            <AlertTriangle className="h-12 w-12 text-[#ff8a1f] mx-auto animate-pulse" />
            <h1 className="text-2xl font-black text-white">Incident Alert Not Found</h1>
            <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md mx-auto">
              The official incident bulletin for <span className="font-mono text-white">&quot;{alertId}&quot;</span> could not be located in the EOC emergency registry.
            </p>
            <div className="pt-2">
              <Link
                href="/alerts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.12)] text-white text-xs font-bold transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Active Alerts Feed</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const alert = getLocalizedAlert(rawAlert, currentLanguage);

  const actions = alert.actions && alert.actions.length > 0 ? alert.actions : [
    'Move to designated high-ground concrete shelters or multi-story centers immediately.',
    'Keep your portable 72-hour survival kit with identification, medications, and charged power banks.',
    'Switch off domestic electrical mains breakers and shut the LPG cylinder valve.'
  ];

  const avoidItems = alert.avoidItems && alert.avoidItems.length > 0 ? alert.avoidItems : [
    'Do NOT enter low-lying hazard perimeters or flood underpasses.',
    'Do NOT touch downed electrical poles or exposed wiring.',
    'Do NOT spread unverified rumors; follow official NDMA/GSDMA communications only.'
  ];

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

  const disasterSlug = alert.disasterType.toLowerCase();

  return (
    <main 
      ref={containerRef}
      className="atmosphere-alerts w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-6">
      
      {/* Return to feed */}
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

      {/* Hero Header */}
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

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sticky Briefing Nav */}
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

        {/* Action Feed */}
        <div ref={briefingListRef} className="lg:col-span-9 space-y-6">
          
          {/* 01: Situation Intelligence */}
          <section id="sec-01" className="briefing-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(56,168,255,0.3)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#38a8ff] uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#38a8ff]" />
              <span>01 · Situation Intelligence</span>
            </div>
            <p className="text-sm text-[#f5f7fa] leading-relaxed">
              {alert.summary}
            </p>
            <div className="p-4 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.06)] text-xs text-[#94a3b8] space-y-1">
              <span className="font-bold text-white block">Official Verification Source:</span>
              <p>{alert.officialSource}</p>
            </div>
          </section>

          {/* 02: Immediate Directives */}
          <section id="sec-02" className="briefing-card rounded-2xl border border-[rgba(22,199,132,0.3)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(22,199,132,0.5)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#16c784] uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-[#16c784]" />
              <span>02 · Immediate Citizen Directives</span>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(22,199,132,0.08)] border border-[rgba(22,199,132,0.25)] space-y-1">
              <span className="text-xs font-bold text-[#16c784] uppercase tracking-wider">Primary Action Required:</span>
              <p className="text-base sm:text-lg font-black text-white">{actions[0]}</p>
            </div>
            <ul className="space-y-2 text-xs text-[#94a3b8] pt-1">
              {actions.slice(1).map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#16c784] font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 03: Prohibited Actions */}
          <section id="sec-03" className="briefing-card rounded-2xl border border-[rgba(255,48,79,0.3)] bg-[#0d121a] p-6 space-y-3 transition-all hover:border-[rgba(255,48,79,0.5)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider">
              <XCircle className="h-4 w-4 text-[#ff304f]" />
              <span>03 · Prohibited Actions & Hazards to Avoid</span>
            </div>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              {avoidItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ff304f] font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 04: Emergency Actions */}
          <section id="sec-04" className="briefing-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                04 · Emergency Support Actions
              </span>
              <span className="text-xs text-[#64748b]">Real-Time Dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/safe-zones"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(56,168,255,0.3)] text-white font-bold text-xs transition-all shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-[#38a8ff]" />
                  <span>Safe Havens</span>
                </div>
                <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-[#38a8ff] transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/disasters/${disasterSlug}`}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(22,199,132,0.3)] text-white font-bold text-xs transition-all shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#16c784]" />
                  <span>Full Guide</span>
                </div>
                <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-[#16c784] transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:112"
                className="flex items-center justify-between p-4 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-xs transition-all shadow-md active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call 112</span>
                </div>
                <span className="font-mono uppercase text-[10px] px-1.5 py-0.5 rounded bg-black/20">Dial</span>
              </a>
            </div>
          </section>

        </div>

      </div>
      </div>
    </main>
  );
}
