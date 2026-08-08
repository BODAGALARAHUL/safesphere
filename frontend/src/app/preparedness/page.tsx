'use client';

import React from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { PREPAREDNESS_ITEMS, getLocalizedPrepItem } from '@/data/preparednessData';
import { CheckCircle2, Droplets, Utensils, Cross, ShieldCheck, Zap, BatteryCharging, Volume2, FileText, Sparkles } from 'lucide-react';

export default function PreparednessPage() {
  const {
    checkedPrepItems,
    togglePrepItem,
    completedPrepCount,
    totalPrepCount,
    prepPercentage,
    currentLanguage,
    t
  } = useDisaster();

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
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
          <CheckCircle2 className="h-4 w-4" />
          <span>PERSONAL EMERGENCY READY KIT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('preparednessTitle')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('preparednessSubtitle')}
        </p>
      </div>

      {/* Progress Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Preparedness Kit Score
            </h2>
            <div className="text-xs text-slate-500 font-medium">
              {completedPrepCount} of {totalPrepCount} essential items ready in your household
            </div>
          </div>

          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {prepPercentage}%
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${prepPercentage}%` }}
          />
        </div>

        {prepPercentage === 100 && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
            <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Preparedness Complete! Your household is fully equipped for emergency evacuations.</span>
          </div>
        )}
      </div>

      {/* Checklist Sections Grouped by Category */}
      <div className="space-y-6">
        {categories.map(cat => {
          const rawItems = PREPAREDNESS_ITEMS.filter(item => item.category === cat);

          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
                {cat}
              </h3>

              <div className="space-y-2">
                {rawItems.map(rawItem => {
                  const item = getLocalizedPrepItem(rawItem, currentLanguage);
                  const isChecked = !!checkedPrepItems[item.id];
                  const IconComponent = getPrepIcon(item.iconName);

                  return (
                    <label
                      key={item.id}
                      onClick={() => togglePrepItem(item.id)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-1 cursor-pointer"
                      />

                      {/* Icon */}
                      <div
                        className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div
                          className={`font-bold text-base ${
                            isChecked
                              ? 'line-through text-slate-500 dark:text-slate-400'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
