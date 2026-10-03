'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { createStaggerReveal } from '@/lib/animations';
import {
  Navigation,
  Phone,
  HeartHandshake,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const QuickActionGrid: React.FC = () => {
  const { setIsAssistanceModalOpen, activeAlert } = useDisaster();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      createStaggerReveal(gridRef.current, '.quick-action-tile', { stagger: 0.08, yOffset: 24 });
    }
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      
      <Link
        href="/safe-zones"
        className="quick-action-tile group relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl bg-[#0d121a] hover:bg-[#151c26] border border-[rgba(56,168,255,0.25)] hover:border-[#38a8ff] transition-all shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-[rgba(56,168,255,0.12)] text-[#38a8ff] border border-[rgba(56,168,255,0.25)]">
            <Navigation className="h-6 w-6" />
          </div>
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[rgba(56,168,255,0.15)] text-[#38a8ff]">
            1.2 KM AWAY
          </span>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[10px] font-bold text-[#38a8ff] uppercase tracking-wider font-mono">Geospatial Havens</div>
          <h3 className="font-black text-base text-white group-hover:text-[#38a8ff] transition-colors flex items-center justify-between">
            <span>Find Safe Shelter</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Live occupancy & turn-by-turn evacuation routes.
          </p>
        </div>
      </Link>

      
      <a
        href="tel:112"
        className="quick-action-tile group relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl bg-[#0d121a] hover:bg-[#151c26] border border-[rgba(255,48,79,0.3)] hover:border-[#ff304f] transition-all shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-[rgba(255,48,79,0.12)] text-[#ff304f] border border-[rgba(255,48,79,0.25)]">
            <Phone className="h-6 w-6" />
          </div>
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[rgba(255,48,79,0.15)] text-[#ff304f]">
            SPEED-DIAL
          </span>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[10px] font-bold text-[#ff304f] uppercase tracking-wider font-mono">National Helpline</div>
          <h3 className="font-black text-base text-white group-hover:text-[#ff304f] transition-colors flex items-center justify-between">
            <span>Call 112 Dispatch</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            One-touch priority connection to EOC command.
          </p>
        </div>
      </a>

      
      <button
        type="button"
        onClick={() => setIsAssistanceModalOpen(true)}
        className="quick-action-tile group text-left relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl bg-[#0d121a] hover:bg-[#151c26] border border-purple-500/25 hover:border-purple-400 transition-all shadow-md cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-purple-500/12 text-purple-400 border border-purple-500/25">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300">
            TRIAGE
          </span>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider font-mono">Vulnerable Citizens</div>
          <h3 className="font-black text-base text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
            <span>Special Assistance</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Priority transport for elderly, wheelchair & ICU care.
          </p>
        </div>
      </button>

      
      <Link
        href={`/disasters/${activeAlert.disasterType.toLowerCase()}`}
        className="quick-action-tile group relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl bg-[#0d121a] hover:bg-[#151c26] border border-[rgba(22,199,132,0.25)] hover:border-[#16c784] transition-all shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-[rgba(22,199,132,0.12)] text-[#16c784] border border-[rgba(22,199,132,0.25)]">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[rgba(22,199,132,0.15)] text-[#16c784]">
            3-MIN SOP
          </span>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[10px] font-bold text-[#16c784] uppercase tracking-wider font-mono">Emergency Manual</div>
          <h3 className="font-black text-base text-white group-hover:text-[#16c784] transition-colors flex items-center justify-between">
            <span>Survival Protocol</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Verified step-by-step actions for active flood hazard.
          </p>
        </div>
      </Link>

    </div>
  );
};
