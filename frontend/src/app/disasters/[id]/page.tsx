'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DISASTER_GUIDES, getLocalizedGuidance } from '@/data/guidanceData';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter, createStaggerReveal } from '@/lib/animations';
import {
  ArrowLeft,
  Navigation,
  Phone,
  Waves,
  Wind,
  Activity,
  Flame,
  BookOpen,
  Sun
} from 'lucide-react';

function renderGuideIcon(disasterType: string) {
  switch (disasterType) {
    case 'Flood':
      return <Waves className="h-6 w-6 text-white" />;
    case 'Cyclone':
      return <Wind className="h-6 w-6 text-white" />;
    case 'Earthquake':
      return <Activity className="h-6 w-6 text-white" />;
    case 'Fire':
      return <Flame className="h-6 w-6 text-white" />;
    case 'Heatwave':
      return <Sun className="h-6 w-6 text-white" />;
    default:
      return <BookOpen className="h-6 w-6 text-white" />;
  }
}

export default function DisasterGuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentLanguage } = useDisaster();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const guideId = params?.id as string;

  const [activeTab, setActiveTab] = useState<'BEFORE' | 'DURING' | 'AFTER'>('DURING');

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
  }, [guideId]);

  useEffect(() => {
    if (stepsContainerRef.current) {
      createStaggerReveal(stepsContainerRef.current, '.action-step-card', { stagger: 0.08 });
    }
  }, [activeTab]);

  const rawGuide = DISASTER_GUIDES.find(g => g.id === guideId) || DISASTER_GUIDES[0];
  const guide = getLocalizedGuidance(rawGuide, currentLanguage);

  const getActiveSteps = () => {
    switch (activeTab) {
      case 'BEFORE':
        return guide.beforeSteps;
      case 'DURING':
        return guide.duringSteps;
      case 'AFTER':
        return guide.afterSteps;
      default:
        return guide.duringSteps;
    }
  };

  return (
    <main ref={containerRef} className="atmosphere-guides w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6">
      
      
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#94a3b8] hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Survival Handbook</span>
        </button>
      </div>

      
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white shadow-sm">
              {renderGuideIcon(guide.disasterType)}
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38a8ff] block">
                Standard Operating Procedure
              </span>
              <span className="text-xs text-[#64748b]">Approved by NDMA & State Disaster Management</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#151c26] border border-[rgba(255,255,255,0.1)] text-[#94a3b8]">
            {guide.severityRisk}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          {guide.disasterType} · 3-Minute Operational Action Plan
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] max-w-2xl leading-relaxed">
          {guide.summary}
        </p>
      </div>

      
      <div className="sticky top-16 z-20 grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#0d121a]/95 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg">
        {[
          { id: 'BEFORE', num: '01', label: 'Before Event' },
          { id: 'DURING', num: '02', label: 'During Event' },
          { id: 'AFTER', num: '03', label: 'After Event' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as 'BEFORE' | 'DURING' | 'AFTER')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#151c26] text-white border border-[rgba(56,168,255,0.4)] shadow-md'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#151c26]/50'
            }`}
          >
            <span className="font-mono text-xs opacity-60">{tab.num}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      
      <div ref={stepsContainerRef} className="space-y-3.5">
        {getActiveSteps().map((step, idx) => (
          <div
            key={idx}
            className="action-step-card flex items-start gap-4 p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.06)] hover:bg-[#151c26] transition-all shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.1)] text-xs font-mono font-black text-[#38a8ff] shrink-0">
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div className="space-y-1 pt-0.5">
              <p className="text-sm font-semibold text-[#f5f7fa] leading-relaxed">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Link
          href="/safe-zones"
          className="group flex items-center justify-between p-4 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(56,168,255,0.3)] text-white font-bold text-xs transition-all shadow-sm hover:scale-[1.02]"
        >
          <div className="flex items-center gap-2.5">
            <Navigation className="h-5 w-5 text-[#38a8ff]" />
            <span>Find Verified Safe Havens</span>
          </div>
          <ArrowLeft className="h-4 w-4 rotate-180 text-[#38a8ff] transition-transform group-hover:translate-x-1" />
        </Link>

        <a
          href="tel:112"
          className="flex items-center justify-between p-4 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95"
        >
          <div className="flex items-center gap-2.5">
            <Phone className="h-5 w-5" />
            <span>Call 112 National Emergency</span>
          </div>
          <span className="font-mono uppercase text-[11px] px-2 py-0.5 rounded bg-black/20">Dial</span>
        </a>
      </div>
      </div>
    </main>
  );
}
