'use client';

import React from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { WifiOff, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode } = useDisaster();

  if (!isOffline) return null;

  return (
    <div className="w-full bg-[#18212d] text-[#f8fafc] border-b border-[rgba(245,197,66,0.3)] px-3 sm:px-6 py-2.5 text-xs font-semibold shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c542] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f5c542]" />
          </span>
          <WifiOff className="h-4 w-4 text-[#f5c542] shrink-0" />
          <span className="text-[#f5c542] font-black uppercase tracking-wider">Offline Cache Active:</span>
          <span className="text-[#aab7c7]">Displaying local disaster maps, emergency protocols, and cached havens.</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-[#16c784] font-medium">
            <Database className="h-3.5 w-3.5" />
            <span>Local Database Active</span>
          </span>

          <button
            type="button"
            onClick={toggleOfflineMode}
            className="px-3 py-1 rounded-lg bg-[#10151d] hover:bg-[#202b3a] text-[#f8fafc] border border-[rgba(255,255,255,0.1)] transition-colors focus-command"
          >
            Simulate Live Network
          </button>
        </div>
      </div>
    </div>
  );
};
