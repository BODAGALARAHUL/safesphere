'use client';

import React from 'react';
import { SeverityLevel } from '@/data/disastersData';
import { AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, className = '', size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: AlertTriangle,
          label: 'CRITICAL THREAT',
          bg: 'bg-red-50 dark:bg-red-950/50',
          text: 'text-red-700 dark:text-red-300',
          border: 'border-red-200 dark:border-red-800',
          indicatorBg: 'bg-red-600',
        };
      case 'WARNING':
        return {
          icon: AlertCircle,
          label: 'ELEVATED WARNING',
          bg: 'bg-amber-50 dark:bg-amber-950/50',
          text: 'text-amber-800 dark:text-amber-300',
          border: 'border-amber-200 dark:border-amber-800',
          indicatorBg: 'bg-amber-500',
        };
      case 'ADVISORY':
        return {
          icon: Info,
          label: 'ADVISORY NOTICE',
          bg: 'bg-sky-50 dark:bg-sky-950/50',
          text: 'text-sky-800 dark:text-sky-300',
          border: 'border-sky-200 dark:border-sky-800',
          indicatorBg: 'bg-sky-500',
        };
      case 'SAFE':
      default:
        return {
          icon: ShieldCheck,
          label: 'AREA SAFE',
          bg: 'bg-emerald-50 dark:bg-emerald-950/50',
          text: 'text-emerald-800 dark:text-emerald-300',
          border: 'border-emerald-200 dark:border-emerald-800',
          indicatorBg: 'bg-emerald-600',
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    lg: 'px-3 py-1.5 text-sm gap-2 font-semibold',
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
      <span className={`w-1.5 h-1.5 rounded-full ${config.indicatorBg} animate-pulse`} />
      <IconComponent size={iconSizes[size]} className="shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
