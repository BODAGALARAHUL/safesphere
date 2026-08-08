'use client';

import React from 'react';
import { SafeZone } from '@/data/safeZonesData';
import { useDisaster } from '@/context/DisasterContext';
import { MapPin, Navigation, Phone, Check, Home, Hospital, Shield, Flame } from 'lucide-react';

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
  const { t } = useDisaster();

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

  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[480px] md:max-h-[600px] pr-1">
      {safeZones.map(zone => {
        const Icon = getCategoryIcon(zone.type);
        const isSelected = selectedZoneId === zone.id;

        return (
          <div
            key={zone.id}
            onClick={() => onSelectZone(zone)}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              isSelected
                ? 'border-slate-900 ring-2 ring-slate-900 bg-slate-50 dark:bg-slate-800 dark:border-slate-100 dark:ring-slate-100'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {zone.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{zone.area}</span>
                  </div>
                </div>
              </div>

              {/* Distance Tag */}
              <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                {zone.distanceKm} km
              </span>
            </div>

            {/* Status & Capacity */}
            <div className="flex flex-wrap items-center gap-2 my-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {zone.status}
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                {zone.capacityBeds}
              </span>
            </div>

            {/* Facilities Tags */}
            <div className="flex flex-wrap gap-1.5 my-2.5">
              {zone.facilities.slice(0, 3).map((facility, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  <Check className="h-3 w-3 text-emerald-600" />
                  {facility}
                </span>
              ))}
              {zone.facilities.length > 3 && (
                <span className="text-[11px] text-slate-400 self-center">
                  +{zone.facilities.length - 3} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`tel:${zone.contactNumber}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-1 items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-900 dark:text-white text-xs font-bold transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Center</span>
              </a>

              <a
                href={zone.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex flex-1 items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>{t('getDirections')}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
