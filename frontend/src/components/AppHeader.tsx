'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDisaster } from '@/context/DisasterContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/data/translationsData';
import { BrandLogo } from '@/components/shared';
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
  CheckSquare,
  Menu,
  X,
  User,
  Compass
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const { 
    selectedLocation, 
    selectedSector,
    supportedSectors,
    selectSectorById,
    userLocation,
    requestUserLocation,
    setIsSOSOpen, 
    setIsNotificationDrawerOpen,
    assistanceRequests,
    currentLanguage,
    setLanguage,
    isThreatMode
  } = useDisaster();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [sosHoldProgress, setSosHoldProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const isHoldingRef = useRef<boolean>(false);
  const startTimeRef = useRef<number | null>(null);

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
    { href: '/profile', label: 'Citizen Profile', icon: User },
  ];

  const startHold = () => {
    if (isHoldingRef.current) return;
    isHoldingRef.current = true;
    startTimeRef.current = Date.now();
    const duration = 1800; // strictly 1.8s hold

    const updateProgress = () => {
      if (!isHoldingRef.current || startTimeRef.current === null) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setSosHoldProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        isHoldingRef.current = false;
        startTimeRef.current = null;
        setSosHoldProgress(0);
        setIsSOSOpen(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelHold = () => {
    isHoldingRef.current = false;
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setSosHoldProgress(0);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Keyboard accessibility: Escape closes any open dropdowns or mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLocationDropdownOpen(false);
        setIsLangDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsLocationDropdownOpen(false);
    setIsLangDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }

  const handleUseGps = async () => {
    await requestUserLocation();
    setIsLocationDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#243646] bg-[#071018]/95 backdrop-blur-xl transition-colors">
      <div className="w-full flex h-16 items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-10 gap-2 sm:gap-3 lg:gap-6">

        
        <BrandLogo variant="full" href="/" priority />

        
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
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#f4f8fb] bg-[#101c27] hover:bg-[#162532] rounded-lg border border-[#243646] hover:border-[#355066] transition-all cursor-pointer max-w-[100px] min-[380px]:max-w-[130px] sm:max-w-[200px] min-h-[38px]"
              aria-label="Select location sector"
            >
              <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${userLocation.source === 'gps' ? 'bg-[#22d3ee]' : isThreatMode ? 'bg-[#f43f5e]' : 'bg-[#10b981]'} animate-pulse shrink-0`} />
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#22d3ee] shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">{selectedLocation.replace('Ahmedabad · ', '')}</span>
              <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#71879a] shrink-0" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl border border-[#355066] bg-[#101c27] p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
                
                {/* Geolocation Trigger */}
                <div className="border-b border-[#243646] pb-2">
                  <button
                    type="button"
                    onClick={handleUseGps}
                    disabled={userLocation.isLoading}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-[#162532] hover:bg-[#1c3040] border border-[#22d3ee]/30 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-[#22d3ee] animate-ping" />
                      <span>{userLocation.isLoading ? 'Acquiring GPS Fix...' : 'Use My Current Location'}</span>
                    </div>
                    {userLocation.source === 'gps' && (
                      <span className="text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-1.5 py-0.5 rounded">GPS Active</span>
                    )}
                  </button>
                  {userLocation.errorMessage && (
                    <p className="text-[10px] text-[#f59e0b] px-1 pt-1.5 leading-tight">
                      {userLocation.errorMessage}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between px-2 pt-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#71879a] uppercase tracking-wider">
                    Monitored Gujarat Sectors
                  </span>
                  <span className="text-[9px] font-mono text-[#22d3ee]">
                    {userLocation.source === 'gps' ? 'Live GPS' : 'Selected Area'}
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {supportedSectors.map(sector => (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => {
                        selectSectorById(sector.id);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left rounded-xl transition-colors cursor-pointer ${
                        selectedSector.id === sector.id && userLocation.source !== 'gps'
                          ? 'bg-[#162532] text-white border border-[#22d3ee]/40'
                          : 'text-[#f4f8fb] hover:bg-[#162532]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate">{sector.name}</div>
                        {sector.description && (
                          <div className="text-[10px] text-[#71879a] truncate font-normal">{sector.description}</div>
                        )}
                      </div>
                      {selectedSector.id === sector.id && userLocation.source !== 'gps' && (
                        <Check className="h-4 w-4 text-[#10b981] shrink-0 ml-1.5" />
                      )}
                    </button>
                  ))}
                </div>
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

          
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsLocationDropdownOpen(false);
              setIsLangDropdownOpen(false);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            className="flex md:hidden items-center justify-center p-2 rounded-lg bg-[#101c27] hover:bg-[#162532] border border-[#243646] text-[#f4f8fb] transition-colors focus-command cursor-pointer min-h-[38px] min-w-[38px] shrink-0"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4 text-[#22d3ee]" /> : <Menu className="h-4 w-4 text-[#b3c2d0]" />}
          </button>

          {/* SOS Beacon with 1.8s Hold Protection */}
          <div className="relative shrink-0">
            <button
              type="button"
              onPointerDown={(e) => {
                if (e.button === 0) {
                  (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                  startHold();
                }
              }}
              onPointerUp={(e) => {
                (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
                cancelHold();
              }}
              onPointerLeave={cancelHold}
              onPointerCancel={cancelHold}
              onTouchStart={() => {
                // Prevent long-press context menu on mobile
                startHold();
              }}
              onTouchEnd={cancelHold}
              onTouchCancel={cancelHold}
              onContextMenu={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                  e.preventDefault();
                  startHold();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  cancelHold();
                }
              }}
              className="relative overflow-hidden flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs sm:text-sm font-black tracking-wider shadow-lg shadow-[#f43f5e]/25 transition-all active:scale-95 select-none focus-command cursor-pointer min-h-[44px]"
              aria-label="Emergency SOS Beacon (Press and hold for 1.8 seconds to activate)"
              title="Press and hold for 1.8s to activate Emergency SOS"
            >
              {sosHoldProgress > 0 && (
                <span 
                  className="absolute inset-0 bg-[#be123c] transition-all duration-75 origin-left"
                  style={{ width: `${sosHoldProgress}%` }}
                />
              )}
              <AlertOctagon className="h-4 w-4 shrink-0 relative z-10" />
              <span className="relative z-10">
                {sosHoldProgress > 0 ? `${Math.round(sosHoldProgress)}%` : 'SOS'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          role="navigation"
          aria-label="Mobile Navigation Menu"
          className="md:hidden border-t border-[#243646] bg-[#071018]/98 backdrop-blur-2xl px-4 py-4 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto"
        >
          {/* Monitored Sector Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#101c27] border border-[#243646]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#22d3ee]" />
              <div>
                <span className="text-[10px] font-mono text-[#71879a] uppercase block">Selected Sector</span>
                <span className="text-xs font-bold text-white">{selectedLocation}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUseGps}
              className="px-2.5 py-1 rounded-lg bg-[#162532] hover:bg-[#1c3040] border border-[#22d3ee]/30 text-[#22d3ee] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{userLocation.source === 'gps' ? 'GPS Active' : 'Use GPS'}</span>
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;
              const isEmergency = item.href === '/emergency';

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all min-h-[48px] ${
                    isActive
                      ? isEmergency
                        ? 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 shadow-sm'
                        : 'bg-[#162532] text-[#22d3ee] border border-[#22d3ee]/40 shadow-sm'
                      : isEmergency
                      ? 'text-[#f43f5e] hover:bg-[#f43f5e]/10 border border-transparent'
                      : 'text-[#f4f8fb] hover:bg-[#101c27] border border-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#22d3ee]/10' : 'bg-[#101c27]'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Simulated Disclaimer Banner */}
          <div className="p-3 rounded-xl bg-[#101c27] border border-[#243646]/60 text-[11px] text-[#71879a] space-y-1">
            <span className="font-mono text-[10px] text-[#f59e0b] font-bold uppercase block">⚡ Civic Safety Simulation</span>
            <p>SafeSphere runs in simulated readiness mode. In a real-life crisis, dial <a href="tel:112" className="text-[#f43f5e] font-black underline">112</a> directly.</p>
          </div>
        </div>
      )}

      {/* Tablet (md to xl) Navigation Bar */}
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
