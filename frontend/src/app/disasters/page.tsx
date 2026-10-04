'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { GuidanceService } from '@/services';
import { getLocalizedGuidance } from '@/data/guidanceData';
import { useDisaster } from '@/context/DisasterContext';
import { DisasterIcon } from '@/components/shared';
import { BookOpen, ArrowRight, CheckSquare } from 'lucide-react';
import { animatePageEnter, createStaggerReveal } from '@/lib/animations';

export default function GuidancePage() {
  const { currentLanguage } = useDisaster();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (gridRef.current) {
      createStaggerReveal(gridRef.current, '.sop-guide-card', { stagger: 0.08, yOffset: 20 });
    }
  }, []);

  const getDisasterAccent = (disasterType: string) => {
    switch (disasterType) {
      case 'Flood':
        return { border: 'border-[rgba(56,168,255,0.3)]', badge: 'text-[#38a8ff] bg-[rgba(56,168,255,0.12)]' };
      case 'Cyclone':
        return { border: 'border-[rgba(255,138,31,0.3)]', badge: 'text-[#ff8a1f] bg-[rgba(255,138,31,0.12)]' };
      case 'Earthquake':
        return { border: 'border-[rgba(245,197,66,0.3)]', badge: 'text-[#f5c542] bg-[rgba(245,197,66,0.12)]' };
      case 'Landslide':
        return { border: 'border-[rgba(234,179,8,0.3)]', badge: 'text-[#eab308] bg-[rgba(234,179,8,0.12)]' };
      case 'Fire':
        return { border: 'border-[rgba(255,48,79,0.3)]', badge: 'text-[#ff304f] bg-[rgba(255,48,79,0.12)]' };
      default:
        return { border: 'border-[rgba(22,199,132,0.3)]', badge: 'text-[#16c784] bg-[rgba(22,199,132,0.12)]' };
    }
  };

  const guides = GuidanceService.getDisasterGuides();

  return (
    <main ref={containerRef} className="atmosphere-guides w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6 sm:space-y-8">
      
      
      <div className="space-y-2 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Standard Operating Procedures</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Emergency Survival Field Handbook
        </h1>
        <p className="text-xs sm:text-sm text-[#b3c2d0] max-w-3xl leading-relaxed">
          Operational, action-tested survival protocols approved by National Disaster Management Authorities for Before, During, and After critical hazards.
        </p>
      </div>

      
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {guides.map((rawGuide) => {
          const guide = getLocalizedGuidance(rawGuide, currentLanguage);
          const accent = getDisasterAccent(guide.disasterType);

          return (
            <Link
              key={guide.id}
              href={`/disasters/${guide.id}`}
              className={`sop-guide-card group rounded-2xl border ${accent.border} bg-[#101c27] hover:bg-[#162532] p-6 shadow-md transition-all hover:border-[#355066] flex flex-col justify-between h-full space-y-5 hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#162532] border border-[#243646] text-white shadow-sm">
                    <DisasterIcon type={guide.disasterType} className="h-6 w-6 text-white" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border border-transparent ${accent.badge}`}>
                    {guide.severityRisk}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#22d3ee] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b3c2d0] leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
              </div>

              
              <div className="pt-3 border-t border-[#243646] flex items-center justify-between text-xs font-bold text-white">
                <div className="flex items-center gap-2 text-[#71879a] font-mono">
                  <CheckSquare className="h-4 w-4 text-[#10b981]" />
                  <span>3-Phase Tactical Plan</span>
                </div>
                <div className="flex items-center gap-1 text-[#22d3ee] group-hover:translate-x-1 transition-transform">
                  <span>Open Protocol</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      </div>
    </main>
  );
}
