'use client';

import React from 'react';
import {
  Waves,
  Wind,
  Activity,
  Flame,
  Sun,
  Mountain,
  ShieldAlert
} from 'lucide-react';

interface DisasterIconProps {
  type: string;
  className?: string;
  size?: number;
}

export const DisasterIcon: React.FC<DisasterIconProps> = ({
  type,
  className = 'h-5 w-5 text-white',
  size,
}) => {
  const normalized = (type || '').toLowerCase();

  if (normalized.includes('flood')) {
    return <Waves className={className} size={size} />;
  }
  if (normalized.includes('cyclone') || normalized.includes('storm')) {
    return <Wind className={className} size={size} />;
  }
  if (normalized.includes('earthquake') || normalized.includes('tremor')) {
    return <Activity className={className} size={size} />;
  }
  if (normalized.includes('landslide')) {
    return <Mountain className={className} size={size} />;
  }
  if (normalized.includes('fire') || normalized.includes('wildfire')) {
    return <Flame className={className} size={size} />;
  }
  if (normalized.includes('heat') || normalized.includes('wave')) {
    return <Sun className={className} size={size} />;
  }

  return <ShieldAlert className={className} size={size} />;
};
