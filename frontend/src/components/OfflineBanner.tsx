'use client';

import React from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { WifiOff, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode, t } = useDisaster();

  if (!isOffline) return null;

  return (
    <div className="w-full bg-slate-900 text-slate-100 border-b border-amber-500/40 px-4 py-2 text-xs font-semibold shadow-md">
      <div className="w-full flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <WifiOff className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="text-amber-300 font-extrabold uppercase tracking-wider">OFFLINE:</span>
          <span>{t('offlineBannerNotice')}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <Database className="h-3.5 w-3.5" />
            <span>Local Cache Active</span>
          </span>

          <button
            type="button"
            onClick={toggleOfflineMode}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Switch to Online
          </button>
        </div>
      </div>
    </div>
  );
};
