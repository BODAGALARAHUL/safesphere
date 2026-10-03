'use client';

import React, { useRef, useEffect } from 'react';
import { createScrollReveal } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
  startTrigger?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  yOffset = 36,
  duration = 0.65,
  delay = 0,
  startTrigger = 'top 88%'
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const cleanup = createScrollReveal(ref.current, {
        yOffset,
        duration,
        delay,
        startTrigger
      });
      return cleanup;
    }
  }, [yOffset, duration, delay, startTrigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
