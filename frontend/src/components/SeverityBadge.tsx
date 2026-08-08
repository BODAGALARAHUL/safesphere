'use client';

import React from 'react';
import { SeverityLevel } from '@/data/disastersData';
import { useDisaster } from '@/context/DisasterContext';
import { AlertTriangle, AlertCircle, ShieldCheck, AlertOctagon } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, className = '', size = 'md' }) => {
  const { t } = useDisaster();

  const getBadgeConfig = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: AlertTriangle,
          label: t('severityCritical'),
          bg: 'bg-red-50 dark:bg-red-950/60',
          text: 'text-red-700 dark:text-red-300',
          border: 'border-red-300 dark:border-red-800',
          indicatorBg: 'bg-red-600',
        };
      case 'HIGH_RISK':
        return {
          icon: AlertOctagon,
          label: t('severityHigh'),
          bg: 'bg-orange-50 dark:bg-orange-950/60',
          text: 'text-orange-800 dark:text-orange-300',
          border: 'border-orange-300 dark:border-orange-800',
          indicatorBg: 'bg-orange-500',
        };
      case 'MODERATE':
        return {
          icon: AlertCircle,
          label: t('severityModerate'),
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          text: 'text-amber-800 dark:text-amber-300',
          border: 'border-amber-300 dark:border-amber-800',
          indicatorBg: 'bg-amber-500',
        };
      case 'SAFE':
      default:
        return {
          icon: ShieldCheck,
          label: t('severitySafe'),
          bg: 'bg-emerald-50 dark:bg-emerald-950/60',
          text: 'text-emerald-800 dark:text-emerald-300',
          border: 'border-emerald-300 dark:border-emerald-800',
          indicatorBg: 'bg-emerald-600',
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1 font-semibold',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-extrabold tracking-tight',
    lg: 'px-3 py-1.5 text-sm gap-2 font-black tracking-tight',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.indicatorBg} animate-pulse`} />
      <IconComponent size={iconSizes[size]} className="shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
