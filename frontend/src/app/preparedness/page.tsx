'use client';

import React, { useEffect, useRef } from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { PREPAREDNESS_ITEMS, getLocalizedPrepItem } from '@/data/preparednessData';
import { animatePageEnter, createScrollCounter, createScrollProgress, createStaggerReveal } from '@/lib/animations';
import {
  CheckCircle2,
  Droplets,
  Utensils,
  Cross,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Volume2,
  FileText,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';

export default function PreparednessPage() {
  const {
    checkedPrepItems,
    togglePrepItem,
    completedPrepCount,
    totalPrepCount,
    prepPercentage,
    currentLanguage
  } = useDisaster();
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreCounterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const checklistGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (scoreCounterRef.current) {
      createScrollCounter(scoreCounterRef.current, prepPercentage, { suffix: '%', duration: 1.2 });
    }
    if (progressBarRef.current) {
      createScrollProgress(progressBarRef.current, prepPercentage, { duration: 1.2 });
    }
    if (checklistGridRef.current) {
      createStaggerReveal(checklistGridRef.current, '.checklist-item-card', { stagger: 0.05 });
    }
  }, [prepPercentage]);

  const getPrepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return Droplets;
      case 'Utensils':
        return Utensils;
      case 'Cross':
        return Cross;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Zap':
        return Zap;
      case 'BatteryCharging':
        return BatteryCharging;
      case 'Volume2':
        return Volume2;
      case 'FileText':
        return FileText;
      default:
        return CheckCircle2;
    }
  };

  const categories = ['Water & Food', 'Medical & Safety', 'Tools & Light', 'Documents & Cash'] as const;

  return (
    <main ref={containerRef} className="atmosphere-preparedness w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6 sm:space-y-8">
      
      
      <div className="space-y-1.5 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#16c784] uppercase tracking-wider">
          <CheckSquare className="h-4 w-4 text-[#16c784]" />
          <span>Household Readiness & Survival Bag</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Personal & Family Emergency Kit Tracker
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] max-w-3xl leading-relaxed">
          Maintain this essential 72-hour survival inventory packed in a portable waterproof bag for immediate deployment during sudden evacuations.
        </p>
      </div>

      
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d121a] p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#16c784] uppercase tracking-wider">
              Household Survival Readiness
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {completedPrepCount} of {totalPrepCount} Essential Provisions Verified
            </h2>
            <p className="text-xs text-[#94a3b8]">
              {totalPrepCount - completedPrepCount > 0
                ? `${totalPrepCount - completedPrepCount} critical items remaining before maximum survival threshold.`
                : 'All essential household provisions ready for emergency evacuation.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span ref={scoreCounterRef} className="text-5xl sm:text-6xl font-black text-[#16c784] font-mono tracking-tight">
              {prepPercentage}%
            </span>
          </div>
        </div>

        
        <div className="w-full h-3 bg-[#151c26] rounded-full overflow-hidden p-0.5 border border-[rgba(255,255,255,0.06)]">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#38a8ff] to-[#16c784] rounded-full transition-all duration-300"
            style={{ width: `${prepPercentage}%` }}
          />
        </div>

        {prepPercentage === 100 ? (
          <div className="flex items-center gap-2 text-xs font-bold text-[#16c784] bg-[rgba(22,199,132,0.1)] p-3 rounded-xl border border-[rgba(22,199,132,0.2)]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Excellent: Your 72-hour survival kit meets all NDMA and civic safety standards.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#f5c542] bg-[rgba(245,197,66,0.1)] p-3 rounded-xl border border-[rgba(245,197,66,0.2)]">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Attention: Please verify missing survival items below before severe weather impacts your sector.</span>
          </div>
        )}
      </div>

      
      <div ref={checklistGridRef} className="space-y-6">
        {categories.map(category => {
          const categoryItems = PREPAREDNESS_ITEMS.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8] px-1">
                {category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {categoryItems.map(rawItem => {
                  const item = getLocalizedPrepItem(rawItem, currentLanguage);
                  const isChecked = Boolean(checkedPrepItems[item.id]);
                  const PrepIcon = getPrepIcon(item.iconName);

                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePrepItem(item.id)}
                      className={`checklist-item-card cursor-pointer flex items-start gap-3.5 p-4 rounded-2xl border transition-all select-none shadow-sm hover:scale-[1.01] ${
                        isChecked
                          ? 'border-[rgba(22,199,132,0.4)] bg-[#0d121a] ring-1 ring-[#16c784]'
                          : 'border-[rgba(255,255,255,0.06)] bg-[#0d121a] hover:bg-[#151c26] hover:border-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors shrink-0 mt-0.5 ${
                          isChecked
                            ? 'border-[#16c784] bg-[#16c784] text-white shadow-sm'
                            : 'border-[rgba(255,255,255,0.2)] bg-[#151c26] text-[#94a3b8]'
                        }`}
                      >
                        {isChecked ? <CheckCircle2 className="h-4 w-4" /> : <PrepIcon className="h-3.5 w-3.5" />}
                      </div>

                      
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`font-black text-sm ${
                              isChecked ? 'text-[#16c784] line-through opacity-80' : 'text-white'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="font-mono text-[10px] text-[#64748b] bg-[#151c26] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.04)]">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </main>
  );
}
