'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Bell,
  MapPin,
  CheckSquare,
  Phone
} from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/safe-zones', label: 'Havens', icon: MapPin },
    { href: '/emergency', label: '112 Dial', icon: Phone },
    { href: '/preparedness', label: 'Readiness', icon: CheckSquare },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071018]/95 backdrop-blur-2xl border-t border-[#243646] px-2 py-1 shadow-2xl safe-area-pb"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          const isEmergency = item.href === '/emergency';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-2 min-w-[56px] min-h-[48px] rounded-2xl transition-all ${
                isActive
                  ? isEmergency
                    ? 'text-[#f43f5e] font-bold bg-[#f43f5e]/15'
                    : 'text-[#f4f8fb] font-bold bg-[#162532] shadow-sm'
                  : isEmergency
                  ? 'text-[#f43f5e]/80 hover:text-[#f43f5e]'
                  : 'text-[#71879a] hover:text-[#f4f8fb]'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive && isEmergency ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] mt-1 font-mono tracking-tight leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
