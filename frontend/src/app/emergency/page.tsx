'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { EmergencyService, SafeZoneService } from '@/services';
import { useDisaster } from '@/context/DisasterContext';
import { animatePageEnter, createStaggerReveal, animateEmergencyPulse } from '@/lib/animations';
import {
  Phone,
  Search,
  ShieldAlert,
  Ambulance,
  Flame,
  Shield,
  Radio,
  HeartHandshake,
  LifeBuoy,
  MapPin,
  Zap,
  PhoneCall,
  Compass,
  AlertOctagon,
  ArrowRight,
  Info,
  Navigation
} from 'lucide-react';

export default function EmergencyContactsPage() {
  const { selectedLocation, userLocation, setIsSOSOpen, setIsAssistanceModalOpen } = useDisaster();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocationBroadcasting, setIsLocationBroadcasting] = useState<boolean>(false);
  const [sosProgress, setSosProgress] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isHoldingRef = useRef<boolean>(false);
  const startTimeRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroButtonRef = useRef<HTMLAnchorElement>(null);
  const hotlinesListRef = useRef<HTMLDivElement>(null);

  const nearestShelter = SafeZoneService.getNearestSafeZone(userLocation.coordinates, selectedLocation);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (heroButtonRef.current) {
      animateEmergencyPulse(heroButtonRef.current);
    }
    if (hotlinesListRef.current) {
      createStaggerReveal(hotlinesListRef.current, '.hotline-card', { stagger: 0.05 });
    }
  }, []);

  const startSosHold = () => {
    if (isHoldingRef.current) return;
    isHoldingRef.current = true;
    startTimeRef.current = Date.now();
    const duration = 1800; // 1.8 seconds hold

    const updateProgress = () => {
      if (!isHoldingRef.current || startTimeRef.current === null) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setSosProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        isHoldingRef.current = false;
        startTimeRef.current = null;
        setSosProgress(0);
        setIsSOSOpen(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelSosHold = () => {
    isHoldingRef.current = false;
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setSosProgress(0);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Ambulance':
        return Ambulance;
      case 'Flame':
        return Flame;
      case 'Shield':
        return Shield;
      case 'Radio':
        return Radio;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'LifeBuoy':
        return LifeBuoy;
      default:
        return Phone;
    }
  };

  const allContacts = EmergencyService.getEmergencyContacts();
  const primaryContact = EmergencyService.getPrimaryContact();

  const filteredContacts = allContacts.filter(contact => {
    return (
      contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery) ||
      contact.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const lat = userLocation.coordinates.latitude.toFixed(4);
  const lng = userLocation.coordinates.longitude.toFixed(4);

  return (
    <main ref={containerRef} className="atmosphere-emergency w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6 sm:space-y-8">
      
        {/* Header Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff304f] uppercase tracking-wider">
            <Zap className="h-4 w-4 text-[#ff304f]" />
            <span>Priority Emergency Communications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Official Emergency Hotlines & Speed-Dial
          </h1>
          <p className="text-xs sm:text-sm text-[#94a3b8] flex items-center gap-1.5 flex-wrap">
            <MapPin className="h-3.5 w-3.5 text-[#16c784] shrink-0" />
            <span>Direct dispatch channels configured for</span>
            <span className="font-semibold text-white">{selectedLocation}</span>
            <span className="text-[11px] font-mono text-[#64748b]">({userLocation.source === 'gps' ? 'Live GPS' : 'Monitored Sector'})</span>
          </p>
        </div>

        {/* 1. SOS Distress Beacon + 112 Speed-Dial Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* 112 National Speed-Dial Hero Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0d121a] border-2 border-[#ff304f] p-6 sm:p-7 shadow-2xl space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(255,48,79,0.08)] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[rgba(255,48,79,0.15)] border border-[rgba(255,48,79,0.35)] text-[#ff304f] text-xs font-mono font-black uppercase tracking-wider">
                  Tier 1 · National Unified Emergency System
                </span>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff304f] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff304f]" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight flex items-center gap-3">
                  <span>112</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] bg-[#151c26] px-3 py-1 rounded-lg border border-[rgba(255,255,255,0.08)] font-sans">
                    24x7 Toll-Free
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {primaryContact.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  Single nationwide emergency line in India connecting Police, Fire, Ambulance, and Disaster Response.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <a
                ref={heroButtonRef}
                href="tel:112"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all active:scale-95 text-center cursor-pointer min-h-[48px]"
                aria-label="Speed dial national emergency number 112"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Speed-Dial 112 Now</span>
              </a>
            </div>
          </div>

          {/* SOS Hold-To-Activate Distress Beacon Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,48,79,0.3)] p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider">
                  <AlertOctagon className="h-4 w-4 text-[#ff304f]" />
                  <span>Citizen SOS Distress Beacon</span>
                </div>
                <span className="text-[10px] font-mono text-[#64748b]">1.8s Hold Protection</span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Press and hold for 1.8 seconds to trigger the distress protocol with active coordinates ({lat}°, {lng}°).
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="w-full h-2 bg-[#151c26] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff8a1f] to-[#ff304f] transition-all duration-75"
                  style={{ width: `${sosProgress}%` }}
                />
              </div>

              <button
                type="button"
                onPointerDown={(e) => {
                  if (e.button === 0) {
                    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                    startSosHold();
                  }
                }}
                onPointerUp={(e) => {
                  (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
                  cancelSosHold();
                }}
                onPointerLeave={cancelSosHold}
                onPointerCancel={cancelSosHold}
                onTouchStart={startSosHold}
                onTouchEnd={cancelSosHold}
                onTouchCancel={cancelSosHold}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                    e.preventDefault();
                    startSosHold();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cancelSosHold();
                  }
                }}
                className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all select-none cursor-pointer flex items-center justify-center gap-2 bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,48,79,0.4)] text-[#ff304f] active:scale-95 min-h-[48px]"
                aria-label="Press and hold for 1.8 seconds to open SOS Distress Protocol"
              >
                <AlertOctagon className="h-4 w-4" />
                <span>{sosProgress > 0 ? `Holding: ${Math.round(sosProgress)}%` : 'Press & Hold SOS (1.8s)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* 2. Immediate Resource Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Nearest Safe Haven Card */}
          <div className="p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22d3ee] uppercase">
                <Navigation className="h-4 w-4" />
                <span>Nearest Safe Haven</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {nearestShelter ? nearestShelter.name : 'Evacuation Shelter'}
              </h3>
              <p className="text-xs text-[#94a3b8]">
                {nearestShelter ? `Located in ${nearestShelter.area} · ~${nearestShelter.distanceKm} km distance` : 'Check local shelters in your sector'}
              </p>
            </div>
            <Link
              href="/safe-zones"
              className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[#22d3ee]/30 text-white font-bold text-xs transition-all min-h-[44px]"
            >
              <span>View Map & Routes</span>
              <ArrowRight className="h-4 w-4 text-[#22d3ee]" />
            </Link>
          </div>

          {/* Special Evacuation Assistance Request */}
          <div className="p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#a855f7] uppercase">
                <HeartHandshake className="h-4 w-4" />
                <span>Special Assistance</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Vulnerable Citizen Escort
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Priority rescue transport for seniors, mobility impaired, infants, and medical patients.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAssistanceModalOpen(true)}
              className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-purple-500/30 text-white font-bold text-xs transition-all cursor-pointer min-h-[44px]"
            >
              <span>Request Dispatch</span>
              <ArrowRight className="h-4 w-4 text-[#a855f7]" />
            </button>
          </div>

          {/* Broadcast Live GPS Telemetry */}
          <div className="p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10b981] uppercase">
                <Compass className="h-4 w-4" />
                <span>Coordinates Telemetry</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Share Location Telemetry
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Lat: {lat}°, Lng: {lng}° ({selectedLocation})
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsLocationBroadcasting(!isLocationBroadcasting);
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(`Emergency Location: ${selectedLocation}, Lat: ${lat}, Lng: ${lng}`);
                }
              }}
              className={`inline-flex items-center justify-between w-full p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                isLocationBroadcasting
                  ? 'bg-[rgba(22,199,132,0.15)] border-[#16c784] text-[#16c784]'
                  : 'bg-[#151c26] border-[rgba(255,255,255,0.08)] text-white hover:bg-[#1b2430]'
              }`}
            >
              <span>{isLocationBroadcasting ? 'Telemetry Copied & Active' : 'Copy Coordinates to Share'}</span>
              <Compass className={`h-4 w-4 ${isLocationBroadcasting ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>

        {/* 3. Departmental & Specialist Helplines */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              Departmental & Specialist Helplines ({filteredContacts.length} Available)
            </h2>

            <div className="relative w-full sm:w-72" role="search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search police, fire, ambulance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#151c26] text-xs text-[#f5f7fa] placeholder:text-[#64748b] focus-command"
                aria-label="Search emergency lines"
              />
            </div>
          </div>

          <div ref={hotlinesListRef} className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredContacts.filter(c => !c.primary).map(contact => {
              const Icon = getContactIcon(contact.iconName);

              return (
                <div
                  key={contact.id}
                  className="hotline-card flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.06)] hover:bg-[#151c26] transition-all shadow-sm gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="p-3 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white shrink-0 mt-0.5 sm:mt-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-lg font-black text-white">
                          {contact.number}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151c26] text-[#94a3b8] border border-[rgba(255,255,255,0.04)]">
                          {contact.subtitle}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs text-[#94a3b8] truncate">
                        {contact.title}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={`tel:${contact.number}`}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.08)] text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer min-h-[44px]"
                    aria-label={`Dial ${contact.title} at ${contact.number}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#16c784]" />
                    <span>Dial Direct</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Simulated Platform Notice */}
        <div className="p-4 rounded-2xl bg-[#0d121a] border border-[#243646] flex items-start gap-3 text-xs text-[#94a3b8]">
          <Info className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-white uppercase text-[11px]">Civic Safety Platform Notice</span>
            <p>SafeSphere coordinates disaster preparedness and resource allocation in a simulated civic environment. In life-threatening emergencies, dial <strong>112</strong> immediately on your phone.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
