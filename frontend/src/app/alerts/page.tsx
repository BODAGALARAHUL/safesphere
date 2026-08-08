'use client';

import React, { useState } from 'react';
import { MOCK_DISASTER_ALERTS } from '@/data/disastersData';
import { AlertCard } from '@/components/AlertCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useDisaster } from '@/context/DisasterContext';
import { Search, Filter, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  const { t } = useDisaster();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'ALL', label: t('allAlerts') },
    { id: 'CRITICAL', label: t('criticalFilter') },
    { id: 'HIGH_RISK', label: t('highRiskFilter') },
    { id: 'MODERATE', label: t('moderateFilter') },
  ];

  const filteredAlerts = MOCK_DISASTER_ALERTS.filter(alert => {
    const matchesSeverity = selectedSeverity === 'ALL' || alert.severity === selectedSeverity;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.disasterType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-8 space-y-6">
      
      {/* Header */}
      <ScrollReveal delayMs={50}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <span>{t('regionalFeed')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('disasterAlerts')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Official regional warnings issued by GSDMA, IMD, and NDMA for your current location.
          </p>
        </div>
      </ScrollReveal>

      {/* Search & Segmented Filter Bar */}
      <ScrollReveal delayMs={100}>
        <div className="space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchAlertsPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all shadow-sm"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> Severity:
            </span>
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSeverity(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSeverity === tab.id
                    ? 'bg-slate-900 text-white shadow dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </ScrollReveal>

      {/* Alerts Feed (Scroll-Triggered Reveal) */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, index) => (
            <ScrollReveal key={alert.id} delayMs={index * 80} skeletonHeight="140px">
              <AlertCard alert={alert} />
            </ScrollReveal>
          ))
        ) : (
          /* Empty State */
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
              <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {t('noAlertsMatch')}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                There are currently no active disaster warnings matching your selected severity or search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSeverity('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>

    </main>
  );
}
