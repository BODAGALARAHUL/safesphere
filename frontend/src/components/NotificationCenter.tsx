'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { MOCK_DISASTER_ALERTS, getLocalizedAlert } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import {
  X,
  Bell,
  HeartHandshake,
  MapPin,
  Plus,
  CheckCircle2,
  ChevronRight,
  User,
  Phone
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    setIsAssistanceModalOpen,
    assistanceRequests,
    isThreatMode,
    currentLanguage,
    t
  } = useDisaster();

  const [activeTab, setActiveTab] = useState<'BROADCASTS' | 'ASSISTANCE'>('BROADCASTS');

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Overlay Backdrop Click */}
      <div
        className="absolute inset-0"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100 dark:bg-slate-850 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="relative p-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <Bell className="h-5 w-5" />
              {isThreatMode && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                </span>
              )}
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-tight">
                {t('notificationDrawerTitle')}
              </h2>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Live Broadcasts & Special Assistance Logs
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Action Button: Request Special Assistance */}
        <div className="p-4 bg-red-50 dark:bg-red-950/80 border-b border-red-200 dark:border-red-800/80">
          <button
            type="button"
            onClick={() => {
              setIsAssistanceModalOpen(true);
              setIsNotificationDrawerOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <HeartHandshake className="h-4 w-4" />
            <span>{t('submitAssistanceReq')}</span>
          </button>
          <p className="text-[11px] text-red-800 dark:text-red-200 font-bold text-center mt-2 leading-tight">
            {t('specialAssistanceDesc')}
          </p>
        </div>

        {/* Navigation Tabs: BROADCASTS | ASSISTANCE */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('BROADCASTS')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'BROADCASTS'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Broadcast Alerts ({MOCK_DISASTER_ALERTS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ASSISTANCE')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'ASSISTANCE'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Assistance Logs ({assistanceRequests.length})
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {activeTab === 'BROADCASTS' ? (
            /* Live Broadcast Alerts Tab */
            MOCK_DISASTER_ALERTS.map(rawAlert => {
              const alert = getLocalizedAlert(rawAlert, currentLanguage);
              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <SeverityBadge severity={alert.severity} size="sm" />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{alert.issuedAt}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug">
                    {alert.title}
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{alert.location}</span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {alert.summary}
                  </p>

                  <Link
                    href={`/alerts/${alert.id}`}
                    onClick={() => setIsNotificationDrawerOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100 hover:underline pt-1"
                  >
                    <span>{t('viewDetails')}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })
          ) : (
            /* Special Assistance Requests Tab */
            assistanceRequests.length > 0 ? (
              assistanceRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      {req.priority}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{req.timestamp}</span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <HeartHandshake className="h-4 w-4 text-red-600 shrink-0" />
                    <span>{req.type}</span>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{req.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{req.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </div>
                  </div>

                  <div className="mt-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Status: {req.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <HeartHandshake className="h-8 w-8 mx-auto opacity-50" />
                <p className="text-xs font-semibold">No special assistance requests submitted yet.</p>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
};
