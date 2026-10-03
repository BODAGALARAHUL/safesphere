'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useDisaster } from '@/context/DisasterContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/data/translationsData';
import { 
  MapPin, 
  Bell, 
  ChevronDown, 
  Check, 
  AlertOctagon,
  Home,
  ShieldAlert,
  Phone,
  BookOpen,
  CheckSquare
} from 'lucide-react';

const LOCATIONS = [
  'Ahmedabad · Paldi',
  'Ahmedabad · Vasna',
  'Ahmedabad · Satellite',
  'Ahmedabad · Ellisbridge',
];

export const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const { 
    selectedLocation, 
    setSelectedLocation, 
    setIsSOSOpen, 
    setIsNotificationDrawerOpen,
    assistanceRequests,
    currentLanguage,
    setLanguage,
    isThreatMode
  } = useDisaster();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [sosHoldProgress, setSosHoldProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const activeLangOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const pendingCount = assistanceRequests.filter(r => r.status.includes('Dispatched') || r.status.includes('Assigned')).length;

  const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/safe-zones', label: 'Safe Havens', icon: MapPin },
    { href: '/risk-levels', label: 'Risk Spectrum', icon: ShieldAlert },
    { href: '/emergency', label: '112 Speed-Dial', icon: Phone },
    { href: '/disasters', label: 'Field SOPs', icon: BookOpen },
    { href: '/preparedness', label: 'Readiness Kit', icon: CheckSquare },
  ];

  const startHold = () => {
    const startTime = Date.now();
    const duration = 1800;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setSosHoldProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsSOSOpen(true);
        setSosHoldProgress(0);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelHold = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setSosHoldProgress(0);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsLocationDropdownOpen(false);
    setIsLangDropdownOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#243646] bg-[#071018]/95 backdrop-blur-xl transition-colors">
      <div className="w-full flex h-16 items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-10 gap-2 sm:gap-3 lg:gap-6">

        
        <Link href="/" className="flex items-center shrink-0 focus-command rounded-xl min-w-0" aria-label="SafeSphere Home">
          
          <div className="hidden sm:flex items-center h-12 w-auto">
            <Image
              src="/safesphere-logo.png"
              alt="SafeSphere - Civic Intelligence Platform"
              width={886}
              height={248}
              priority
              className="h-10 lg:h-11 w-auto max-w-[190px] lg:max-w-[240px] object-contain select-none drop-shadow-[0_0_14px_rgba(34,211,238,0.25)]"
            />
          </div>

          
          <div className="flex sm:hidden items-center shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101c27] border border-[#243646] p-1 shadow-md">
              <Image
                src="/safesphere-emblem-v2.png"
                alt="SafeSphere"
                width={262}
                height={232}
                priority
                className="h-full w-full object-contain select-none drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              />
            </div>
          </div>
        </Link>

        
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold" aria-label="Desktop Navigation">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            const isEmergency = item.href === '/emergency';

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  isActive
                    ? isEmergency
                      ? 'bg-[#f43f5e]/15 text-[#f43f5e] border-[#f43f5e]/30 shadow-sm'
                      : 'bg-[#162532] text-white border-[#243646] shadow-sm'
                    : isEmergency
                    ? 'text-[#f43f5e] border-transparent hover:bg-[#f43f5e]/10'
                    : 'text-[#b3c2d0] border-transparent hover:text-[#f4f8fb] hover:bg-[#101c27]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0 min-w-0">
          
          
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLocationDropdownOpen(!isLocationDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#f4f8fb] bg-[#101c27] hover:bg-[#162532] rounded-lg border border-[#243646] hover:border-[#355066] transition-all cursor-pointer max-w-[85px] min-[380px]:max-w-[110px] sm:max-w-[180px] min-h-[38px]"
              aria-label="Select location sector"
            >
              <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${isThreatMode ? 'bg-[#f43f5e]' : 'bg-[#10b981]'} animate-pulse shrink-0`} />
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#22d3ee] shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">{selectedLocation.replace('Ahmedabad · ', '')}</span>
              <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#71879a] shrink-0" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-60 rounded-2xl border border-[#355066] bg-[#101c27] p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-[#71879a] uppercase tracking-wider">
                  Current Monitored Sector
                </div>
                {LOCATIONS.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left text-[#f4f8fb] hover:bg-[#162532] rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="truncate">{loc}</span>
                    {selectedLocation === loc && <Check className="h-4 w-4 text-[#10b981] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsLocationDropdownOpen(false);
              }}
              className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-[#b3c2d0] hover:text-[#f4f8fb] bg-[#101c27] hover:bg-[#162532] rounded-lg border border-[#243646] transition-colors cursor-pointer min-h-[38px]"
              aria-label="Change language"
            >
              <span>{activeLangOption.code.toUpperCase()}</span>
              <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#71879a]" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-[#355066] bg-[#101c27] p-1.5 shadow-2xl z-50">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code as SupportedLanguage);
                      setIsLangDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left text-[#f4f8fb] hover:bg-[#162532] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{lang.nativeName}</span>
                    {currentLanguage === lang.code && <Check className="h-3.5 w-3.5 text-[#10b981]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-1.5 sm:p-2 rounded-lg bg-[#101c27] hover:bg-[#162532] border border-[#243646] text-[#f4f8fb] transition-colors focus-command cursor-pointer shrink-0 min-h-[38px] min-w-[34px] flex items-center justify-center"
            title="Incident Broadcast Center"
            aria-label="Open notifications"
          >
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#b3c2d0]" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-[#f43f5e] text-[8px] sm:text-[9px] font-black text-white shadow-md">
                {pendingCount}
              </span>
            )}
          </button>

          
          <div className="relative shrink-0">
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              onClick={() => setIsSOSOpen(true)}
              className="relative overflow-hidden flex items-center justify-center gap-1 px-2.5 sm:px-4 py-1.5 rounded-lg bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs sm:text-sm font-black tracking-wider shadow-lg shadow-[#f43f5e]/25 transition-all active:scale-95 select-none focus-command cursor-pointer min-h-[38px]"
              aria-label="Emergency SOS Beacon"
            >
              {sosHoldProgress > 0 && (
                <span 
                  className="absolute inset-0 bg-[#be123c] transition-all duration-75 origin-left"
                  style={{ width: `${sosHoldProgress}%` }}
                />
              )}
              <AlertOctagon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 relative z-10" />
              <span className="relative z-10">SOS</span>
            </button>
          </div>

        </div>
      </div>

      
      <div className="hidden md:flex xl:hidden border-t border-[#243646] bg-[#071018]/90 px-4 sm:px-6 lg:px-8 xl:px-10 py-2 overflow-x-auto gap-2 text-xs font-semibold no-scrollbar">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          const isEmergency = item.href === '/emergency';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap border text-xs font-semibold transition-colors ${
                isActive
                  ? isEmergency
                    ? 'bg-[#f43f5e]/15 text-[#f43f5e] border-[#f43f5e]/30 shadow-sm'
                    : 'bg-[#162532] text-white border-[#243646] shadow-sm'
                  : isEmergency
                  ? 'text-[#f43f5e] border-transparent hover:bg-[#f43f5e]/10'
                  : 'text-[#b3c2d0] border-transparent hover:text-white hover:bg-[#101c27]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
