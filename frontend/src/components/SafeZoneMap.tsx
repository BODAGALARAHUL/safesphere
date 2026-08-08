'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SafeZone } from '@/data/safeZonesData';
import { Loader2, MapPin } from 'lucide-react';

const SafeZoneMapInner = dynamic(() => import('./SafeZoneMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] md:min-h-[500px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
      <Loader2 className="h-8 w-8 text-slate-400 animate-spin mb-2" />
      <span className="text-xs font-semibold text-slate-500">Loading Interactive Safe Zone Map...</span>
    </div>
  ),
});

interface SafeZoneMapProps {
  safeZones: SafeZone[];
  selectedZone?: SafeZone;
  onSelectZone: (zone: SafeZone) => void;
}

export const SafeZoneMap: React.FC<SafeZoneMapProps> = (props) => {
  return (
    <div className="relative w-full h-[360px] md:h-[520px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
      <SafeZoneMapInner {...props} />
    </div>
  );
};
