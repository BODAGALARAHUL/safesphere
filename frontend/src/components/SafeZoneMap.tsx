'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { SafeZone } from '@/types';
import { Loader2 } from 'lucide-react';

const SafeZoneMapInner = dynamic(() => import('./SafeZoneMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] rounded-2xl bg-[#101c27] flex flex-col items-center justify-center border border-[#243646]">
      <Loader2 className="h-8 w-8 text-[#22d3ee] animate-spin mb-2" />
      <span className="text-xs font-bold text-[#b3c2d0]">Initializing Emergency Map Telemetry...</span>
    </div>
  ),
});

interface SafeZoneMapProps {
  safeZones: SafeZone[];
  selectedZone?: SafeZone;
  onSelectZone: (zone: SafeZone) => void;
  userCoords?: { latitude: number; longitude: number };
  userLocationLabel?: string;
}

export const SafeZoneMap: React.FC<SafeZoneMapProps> = (props) => {
  return (
    <div className="relative w-full h-full min-h-0 rounded-2xl overflow-hidden shadow-2xl border border-[#243646] bg-[#101c27]">
      <SafeZoneMapInner {...props} />
    </div>
  );
};
