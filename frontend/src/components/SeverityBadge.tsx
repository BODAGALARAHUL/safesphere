import type { SeverityLevel } from '@/types';
import { AlertTriangle, AlertOctagon, Info, ShieldCheck } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showIcon = true,
}) => {
  const getBadgeConfig = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          label: 'CRITICAL',
          bgColor: 'bg-[rgba(255,48,79,0.12)]',
          textColor: 'text-[#ff304f]',
          borderColor: 'border-[rgba(255,48,79,0.35)]',
          dotColor: 'bg-[#ff304f]',
          icon: AlertOctagon,
        };
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          bgColor: 'bg-[rgba(255,138,31,0.12)]',
          textColor: 'text-[#ff8a1f]',
          borderColor: 'border-[rgba(255,138,31,0.35)]',
          dotColor: 'bg-[#ff8a1f]',
          icon: AlertTriangle,
        };
      case 'MODERATE':
        return {
          label: 'MODERATE',
          bgColor: 'bg-[rgba(245,197,66,0.12)]',
          textColor: 'text-[#f5c542]',
          borderColor: 'border-[rgba(245,197,66,0.35)]',
          dotColor: 'bg-[#f5c542]',
          icon: Info,
        };
      case 'SAFE':
      default:
        return {
          label: 'SAFE / MONITORING',
          bgColor: 'bg-[rgba(22,199,132,0.12)]',
          textColor: 'text-[#16c784]',
          borderColor: 'border-[rgba(22,199,132,0.35)]',
          dotColor: 'bg-[#16c784]',
          icon: ShieldCheck,
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 font-bold',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-bold',
    lg: 'px-3.5 py-1.5 text-xs sm:text-sm gap-2 font-black',
  }[size];

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses} tracking-wider uppercase select-none`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor} shrink-0 animate-pulse`} />
      {showIcon && <IconComponent className={`${iconSizes} shrink-0`} />}
      <span>{config.label}</span>
    </span>
  );
};
