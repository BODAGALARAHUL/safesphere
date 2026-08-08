'use client';

import React from 'react';
import Link from 'next/link';
import { DisasterAlert, getLocalizedAlert } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import { useDisaster } from '@/context/DisasterContext';
import { MapPin, Clock, ArrowRight, ShieldAlert, Waves, Wind, Activity, Flame, Sun } from 'lucide-react';

interface AlertCardProps {
  alert: DisasterAlert;
  isCompact?: boolean;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, isCompact = false }) => {
  const { currentLanguage, t } = useDisaster();
  const localizedAlert = getLocalizedAlert(alert, currentLanguage);

  const getDisasterIcon = () => {
    switch (localizedAlert.disasterType) {
      case 'Flood':
        return Waves;
      case 'Cyclone':
        return Wind;
      case 'Earthquake':
        return Activity;
      case 'Fire':
        return Flame;
      case 'Heatwave':
        return Sun;
      default:
        return ShieldAlert;
    }
  };

  const IconComponent = getDisasterIcon();

  const getBorderColor = () => {
    switch (localizedAlert.severity) {
      case 'CRITICAL':
        return 'border-l-4 border-l-red-600 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
      case 'HIGH_RISK':
        return 'border-l-4 border-l-orange-500 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
      case 'MODERATE':
        return 'border-l-4 border-l-amber-400 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
      case 'SAFE':
      default:
        return 'border-l-4 border-l-emerald-600 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
    }
  };

  return (
    <div className={`rounded-xl border shadow-sm p-3.5 sm:p-5 transition-all hover:shadow-md max-w-full overflow-hidden ${getBorderColor()}`}>
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <SeverityBadge severity={localizedAlert.severity} size={isCompact ? 'sm' : 'md'} />
        
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Clock className="h-3.5 w-3.5" />
          <span>{localizedAlert.issuedAt}</span>
        </div>
      </div>

      {/* Disaster Title */}
      <div className="flex items-start gap-2.5 mb-2 min-w-0">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shrink-0">
          <IconComponent className="h-5 w-5 text-slate-900 dark:text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-snug break-words">
            {localizedAlert.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate min-w-0">{localizedAlert.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2 my-2.5 leading-relaxed break-words">
        {localizedAlert.summary}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-xs text-slate-500 font-medium hidden sm:inline truncate">
          {localizedAlert.officialSource}
        </span>

        <Link
          href={`/alerts/${localizedAlert.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-slate-400 shrink-0"
        >
          <span>{t('whatShouldIDo')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
