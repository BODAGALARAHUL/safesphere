'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { isReducedMotion } from '@/lib/animations';

export const ScrollProgressBar: React.FC = () => {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  const getAccentColor = (path: string) => {
    if (path === '/') return 'bg-[#22d3ee]'; 
    if (path.startsWith('/alerts')) return 'bg-[#f43f5e]'; 
    if (path.startsWith('/safe-zones')) return 'bg-[#14b8a6]'; 
    if (path.startsWith('/risk-levels')) return 'bg-[#f59e0b]'; 
    if (path.startsWith('/disasters')) return 'bg-[#8b5cf6]'; 
    if (path.startsWith('/emergency')) return 'bg-[#f43f5e]'; 
    if (path.startsWith('/preparedness')) return 'bg-[#10b981]'; 
    return 'bg-[#3b82f6]'; 
  };

  useEffect(() => {
    if (isReducedMotion()) return;

    const handleScroll = () => {
      if (!barRef.current) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        barRef.current.style.width = '0%';
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
      barRef.current.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className={`h-full w-0 transition-all duration-75 ease-out shadow-sm ${getAccentColor(pathname)}`}
      />
    </div>
  );
};
