'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDisaster } from '@/context/DisasterContext';
import { Home, Bell, MapPin, BookOpen, Phone, User, ShieldAlert } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const { setIsSOSOpen, t } = useDisaster();

  const navItems = [
    { href: '/', label: t('navHome'), icon: Home },
    { href: '/alerts', label: t('navAlerts'), icon: Bell },
    { href: '/risk-levels', label: t('navRiskMatrix'), icon: ShieldAlert },
    { href: '/safe-zones', label: t('navSafeZones'), icon: MapPin },
    { href: '/disasters', label: t('navGuidance'), icon: BookOpen },
    { href: '/emergency', label: t('navEmergency'), icon: Phone },
  ];

  return (
    <>
      {/* Desktop Top Navigation Bar (Shown on md+ screens below AppHeader) */}
      <nav className="hidden md:block bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-sm font-medium">
          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/preparedness"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                pathname === '/preparedness'
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t('navChecklist')}
            </Link>
            <Link
              href="/profile"
              aria-label="Profile Settings"
              className={`p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 ${
                pathname === '/profile' ? 'bg-slate-800 text-white' : ''
              }`}
            >
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar (Shown on sm/mobile screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-1 shadow-lg">
        <div className="flex items-center justify-around relative">
          
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[52px] min-h-[44px] rounded-lg transition-colors ${
              pathname === '/'
                ? 'text-slate-900 dark:text-white font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{t('navHome')}</span>
          </Link>

          {/* Alerts */}
          <Link
            href="/alerts"
            className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[52px] min-h-[44px] rounded-lg transition-colors ${
              pathname.startsWith('/alerts')
                ? 'text-slate-900 dark:text-white font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{t('navAlerts')}</span>
          </Link>

          {/* Central Elevated SOS Button */}
          <div className="relative -top-4 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsSOSOpen(true)}
              className="flex h-13 w-13 items-center justify-center rounded-full bg-red-600 text-white font-extrabold shadow-lg border-4 border-white dark:border-slate-900 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-300"
              aria-label="Trigger SOS Emergency Mode"
            >
              <span className="text-xs font-black tracking-wider">SOS</span>
            </button>
            <span className="text-[9px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mt-0.5">
              EMERGENCY
            </span>
          </div>

          {/* Safe Zones */}
          <Link
            href="/safe-zones"
            className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[52px] min-h-[44px] rounded-lg transition-colors ${
              pathname.startsWith('/safe-zones')
                ? 'text-slate-900 dark:text-white font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{t('navSafeZones')}</span>
          </Link>

          {/* Guidance */}
          <Link
            href="/disasters"
            className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[52px] min-h-[44px] rounded-lg transition-colors ${
              pathname.startsWith('/disasters')
                ? 'text-slate-900 dark:text-white font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{t('navGuidance')}</span>
          </Link>

        </div>
      </nav>
    </>
  );
};
