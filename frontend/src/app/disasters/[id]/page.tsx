'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DISASTER_GUIDES } from '@/data/guidanceData';
import {
  ArrowLeft,
  Check,
  AlertOctagon,
  Navigation,
  Phone,
  Waves,
  Wind,
  Activity,
  Flame,
  BookOpen
} from 'lucide-react';

export default function DisasterGuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guideId = params?.id as string;

  const guide = DISASTER_GUIDES.find(g => g.id === guideId) || DISASTER_GUIDES[0];

  const [activeTab, setActiveTab] = useState<'BEFORE' | 'DURING' | 'AFTER'>('DURING');

  const getDisasterIcon = (disasterType: string) => {
    switch (disasterType) {
      case 'Flood':
        return Waves;
      case 'Cyclone':
        return Wind;
      case 'Earthquake':
        return Activity;
      case 'Fire':
        return Flame;
      default:
        return BookOpen;
    }
  };

  const IconComponent = getDisasterIcon(guide.disasterType);

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
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      
      {/* Back Link */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Guidance Library</span>
      </button>

      {/* Guide Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex items-start gap-4">
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shrink-0">
          <IconComponent className="h-7 w-7" />
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            {guide.severityRisk}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {guide.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {guide.summary}
          </p>
        </div>
      </div>

      {/* Segmented Navigation Tabs: BEFORE | DURING | AFTER */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          {(['BEFORE', 'DURING', 'AFTER'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === tab
                  ? tab === 'DURING'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'BEFORE' && 'BEFORE (PREPARE)'}
              {tab === 'DURING' && 'DURING (ACTION)'}
              {tab === 'AFTER' && 'AFTER (RECOVERY)'}
            </button>
          ))}
        </div>
      </div>

      {/* Action Steps Section */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
            {activeTab} PROTOCOL CHECKLIST
          </h2>
          <span className="text-xs font-semibold text-emerald-600">
            Verified NDMA Guideline
          </span>
        </div>

        <div className="space-y-3">
          {getActiveSteps().map((step, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                step.urgent
                  ? 'border-red-200 bg-red-50/60 dark:bg-red-950/30 text-red-950 dark:text-red-100'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white'
              }`}
            >
              <div
                className={`p-1 rounded-full shrink-0 mt-0.5 ${
                  step.urgent ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-bold leading-relaxed">{step.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AVOID BLOCK */}
      <section className="rounded-2xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black">
          <AlertOctagon className="h-5 w-5 text-amber-600 shrink-0" />
          <h2 className="text-xs uppercase tracking-wider">⚠ WHAT TO AVOID</h2>
        </div>

        <ul className="space-y-2">
          {guide.avoidItems.map((avoid, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-bold">
              <span className="text-amber-600">✕</span>
              <span>{avoid}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Direct Action Buttons */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Link
          href="/safe-zones"
          className="flex items-center justify-center gap-2 h-13 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-colors"
        >
          <Navigation className="h-5 w-5" />
          <span>FIND SAFE LOCATION</span>
        </Link>

        <a
          href="tel:112"
          className="flex items-center justify-center gap-2 h-13 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-colors"
        >
          <Phone className="h-5 w-5" />
          <span>CALL 112 HELP</span>
        </a>
      </section>

    </main>
  );
}
