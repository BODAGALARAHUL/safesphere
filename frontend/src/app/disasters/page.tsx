'use client';

import React from 'react';
import Link from 'next/link';
import { DISASTER_GUIDES, getLocalizedGuidance } from '@/data/guidanceData';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useDisaster } from '@/context/DisasterContext';
import { BookOpen, Waves, Wind, Activity, Flame, ArrowRight } from 'lucide-react';

export default function GuidancePage() {
  const { currentLanguage, t } = useDisaster();

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

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-6">
      
      {/* Header */}
      <ScrollReveal delayMs={50}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span>{t('disasterGuidanceTitle')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('disasterGuidanceTitle')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('disasterGuidanceSubtitle')}
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of Disaster Cards (Scroll-Triggered Reveal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DISASTER_GUIDES.map((rawGuide, idx) => {
          const guide = getLocalizedGuidance(rawGuide, currentLanguage);
          const IconComponent = getDisasterIcon(guide.disasterType);

          return (
            <ScrollReveal key={guide.id} delayMs={idx * 100} skeletonHeight="160px">
              <Link
                href={`/disasters/${guide.id}`}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all hover:border-slate-400 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm group-hover:scale-105 transition-transform">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {guide.severityRisk}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                  <span>View Protocol</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

    </main>
  );
}
