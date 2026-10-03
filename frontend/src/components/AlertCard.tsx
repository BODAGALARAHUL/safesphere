'use client';

import React from 'react';
import Link from 'next/link';
import { DisasterAlert, getLocalizedAlert } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import { useDisaster } from '@/context/DisasterContext';
import {
  MapPin,
  Clock,
  ArrowRight,
  Waves,
  Wind,
  Activity,
  Flame,
  Sun,
  ShieldAlert,
  FileText
} from 'lucide-react';

interface AlertCardProps {
  alert: DisasterAlert;
  isCompact?: boolean;
}

function renderDisasterIcon(disasterType: string) {
  switch (disasterType) {
    case 'Flood':
      return <Waves className="h-5 w-5 text-white" />;
    case 'Cyclone':
      return <Wind className="h-5 w-5 text-white" />;
    case 'Earthquake':
      return <Activity className="h-5 w-5 text-white" />;
    case 'Fire':
      return <Flame className="h-5 w-5 text-white" />;
    case 'Heatwave':
      return <Sun className="h-5 w-5 text-white" />;
    default:
      return <ShieldAlert className="h-5 w-5 text-white" />;
  }
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, isCompact = false }) => {
  const { currentLanguage } = useDisaster();
  const localizedAlert = getLocalizedAlert(alert, currentLanguage);

  const isUserAffected = localizedAlert.severity === 'CRITICAL' || localizedAlert.location.toLowerCase().includes('ahmedabad') || localizedAlert.location.toLowerCase().includes('paldi');

  const getCardStyle = () => {
    switch (localizedAlert.severity) {
      case 'CRITICAL':
        return 'border-[rgba(255,48,79,0.35)] bg-[#0d121a] border-l-4 border-l-[#ff304f]';
      case 'HIGH_RISK':
        return 'border-[rgba(255,138,31,0.35)] bg-[#0d121a] border-l-4 border-l-[#ff8a1f]';
      case 'MODERATE':
        return 'border-[rgba(245,197,66,0.3)] bg-[#0d121a] border-l-4 border-l-[#f5c542]';
      case 'SAFE':
      default:
        return 'border-[rgba(255,255,255,0.08)] bg-[#0d121a] border-l-4 border-l-[#16c784]';
    }
  };

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 transition-all hover:bg-[#151c26] hover:border-[rgba(255,255,255,0.16)] shadow-md space-y-4 ${getCardStyle()}`}>
      
      
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.05)] pb-3">
        <div className="flex items-center gap-2">
          <SeverityBadge severity={localizedAlert.severity} size={isCompact ? 'sm' : 'md'} />
          {isUserAffected && localizedAlert.severity === 'CRITICAL' && (
            <span className="px-2.5 py-0.5 rounded bg-[rgba(255,48,79,0.15)] border border-[rgba(255,48,79,0.35)] text-[#ff304f] text-[10px] font-mono font-black tracking-wider uppercase flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff304f] animate-pulse" />
              Impact Zone Active
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-[#64748b] font-mono">
          <Clock className="h-3.5 w-3.5 text-[#94a3b8]" />
          <span>Issued {localizedAlert.issuedAt}</span>
        </div>
      </div>

      
      <div className="flex items-start gap-3.5">
        <div className="p-3 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white shrink-0 mt-0.5">
          {renderDisasterIcon(localizedAlert.disasterType)}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-black text-white leading-snug">
            {localizedAlert.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a3b8]">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#ff304f] shrink-0" />
              <span className="font-semibold text-white">{localizedAlert.location}</span>
            </span>
            <span>•</span>
            <span className="font-mono text-[#64748b]">Perimeter: {localizedAlert.affectedRadius}</span>
          </div>
        </div>
      </div>

      
      <p className="text-xs sm:text-sm text-[#94a3b8] line-clamp-2 leading-relaxed">
        {localizedAlert.summary}
      </p>

      
      <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase font-bold text-[#64748b]">Immediate Directive</span>
          <p className="font-bold text-white text-xs">{localizedAlert.actions && localizedAlert.actions[0] ? localizedAlert.actions[0] : 'Follow instructions'}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/alerts/${alert.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.08)] text-white font-bold text-xs transition-all shadow-sm group"
          >
            <FileText className="h-3.5 w-3.5 text-[#38a8ff]" />
            <span>Open Briefing</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
};
