'use client';

import React from 'react';
import { SafeZone } from '@/data/safeZonesData';
import { MapPin, Navigation, Phone, Home, Hospital, Shield, Flame } from 'lucide-react';

interface SafeZoneBottomSheetProps {
  safeZones: SafeZone[];
  selectedZoneId?: string;
  onSelectZone: (zone: SafeZone) => void;
}

export const SafeZoneBottomSheet: React.FC<SafeZoneBottomSheetProps> = ({
  safeZones,
  selectedZoneId,
  onSelectZone,
}) => {
  const getCategoryIcon = (type: SafeZone['type']) => {
    switch (type) {
      case 'Shelter':
        return Home;
      case 'Hospital':
        return Hospital;
      case 'Police':
        return Shield;
      case 'Fire':
        return Flame;
      default:
        return MapPin;
    }
  };

  const getStatusBadge = (zone: SafeZone) => {
    if (zone.type === 'Hospital') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[rgba(56,168,255,0.12)] text-[#38a8ff] border border-[rgba(56,168,255,0.3)] text-[11px] font-bold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38a8ff] animate-pulse" />
          Trauma & ICU Active
        </span>
      );
    }

    if (zone.status.includes('Available')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[rgba(22,199,132,0.12)] text-[#16c784] border border-[rgba(22,199,132,0.3)] text-[11px] font-bold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16c784] animate-pulse" />
          Available Haven
        </span>
      );
    } else if (zone.status.includes('High Demand')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[rgba(245,197,66,0.12)] text-[#f5c542] border border-[rgba(245,197,66,0.3)] text-[11px] font-bold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5c542]" />
          Limited Capacity
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[rgba(255,48,79,0.12)] text-[#ff304f] border border-[rgba(255,48,79,0.3)] text-[11px] font-bold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff304f]" />
          Full / Restricted
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {safeZones.map(zone => {
        const Icon = getCategoryIcon(zone.type);
        const isSelected = selectedZoneId === zone.id;

        return (
          <div
            key={zone.id}
            onClick={() => onSelectZone(zone)}
            className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all space-y-3 shadow-sm ${
              isSelected
                ? 'border-[#38a8ff] bg-[#151c26] shadow-xl ring-1 ring-[#38a8ff]'
                : 'border-[rgba(255,255,255,0.06)] bg-[#0d121a] hover:bg-[#151c26] hover:border-[rgba(255,255,255,0.15)]'
            }`}
          >
            
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white shrink-0 mt-0.5">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm sm:text-base text-white leading-snug">
                    {zone.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-[#ff304f] shrink-0" />
                    <span>{zone.area}</span>
                  </div>
                </div>
              </div>

              
              <span className="font-mono text-xs font-black text-[#38a8ff] bg-[rgba(56,168,255,0.12)] px-2.5 py-1 rounded-md shrink-0">
                {zone.distanceKm} km
              </span>
            </div>

            
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>{getStatusBadge(zone)}</div>
              <span className="font-mono text-[#94a3b8] font-bold">
                {zone.capacityBeds}
              </span>
            </div>

            
            <div className="flex flex-wrap gap-1.5 pt-1">
              {zone.facilities.map((facility: string) => (
                <span
                  key={facility}
                  className="px-2 py-0.5 rounded-md bg-[#151c26] text-[10px] font-mono text-[#94a3b8] border border-[rgba(255,255,255,0.04)]"
                >
                  {facility}
                </span>
              ))}
            </div>

            
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2 pt-2 border-t border-[rgba(255,255,255,0.05)]">
              <a
                href={`tel:${zone.contactNumber}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.08)] text-xs font-bold text-white transition-colors min-h-[40px]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Desk</span>
              </a>

              <a
                href={zone.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#38a8ff] hover:bg-[#2b8edd] text-xs font-bold text-white transition-all shadow-sm min-h-[40px]"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span className="truncate">Turn-by-Turn Route</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
