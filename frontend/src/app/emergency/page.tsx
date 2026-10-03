'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EMERGENCY_CONTACTS } from '@/data/emergencyContactsData';
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
  CheckCircle2
} from 'lucide-react';

export default function EmergencyContactsPage() {
  const { selectedLocation } = useDisaster();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocationBroadcasting, setIsLocationBroadcasting] = useState<boolean>(false);
  const [sosProgress, setSosProgress] = useState<number>(0);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);
  const sosTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroButtonRef = useRef<HTMLAnchorElement>(null);
  const hotlinesListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
    }
    if (heroButtonRef.current) {
      animateEmergencyPulse(heroButtonRef.current);
    }
    if (hotlinesListRef.current) {
      createStaggerReveal(hotlinesListRef.current, '.hotline-card', { stagger: 0.06 });
    }
  }, []);

  
  const handleSosStart = () => {
    if (sosTriggered) return;
    setSosProgress(0);
    const interval = 30; 
    const totalTime = 3000; 
    let current = 0;

    sosTimerRef.current = setInterval(() => {
      current += (interval / totalTime) * 100;
      if (current >= 100) {
        if (sosTimerRef.current) clearInterval(sosTimerRef.current);
        setSosProgress(100);
        setSosTriggered(true);
      } else {
        setSosProgress(Math.min(100, current));
      }
    }, interval);
  };

  const handleSosCancel = () => {
    if (sosTimerRef.current) {
      clearInterval(sosTimerRef.current);
      sosTimerRef.current = null;
    }
    if (!sosTriggered) {
      setSosProgress(0);
    }
  };

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

  const filteredContacts = EMERGENCY_CONTACTS.filter(contact => {
    return (
      contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery) ||
      contact.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const primaryContact = EMERGENCY_CONTACTS.find(c => c.primary) || EMERGENCY_CONTACTS[0];

  return (
    <main ref={containerRef} className="atmosphere-emergency w-full min-h-screen py-6 sm:py-8">
      <div className="page-shell space-y-6 sm:space-y-8">
      
      
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff304f] uppercase tracking-wider">
          <Zap className="h-4 w-4 text-[#ff304f]" />
          <span>Priority Emergency Communications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Official Emergency Hotlines & Speed-Dial
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#16c784]" />
          <span>Direct telephone dispatch lines configured for</span>
          <span className="font-semibold text-white">{selectedLocation}</span>
        </p>
      </div>

      
      <div className="rounded-2xl bg-[#0d121a] border-2 border-[#ff304f] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(255,48,79,0.08)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[rgba(255,48,79,0.15)] border border-[rgba(255,48,79,0.35)] text-[#ff304f] text-xs font-mono font-black uppercase tracking-wider">
              Tier 1 · National Unified Emergency System
            </span>
          </div>
          <span className="h-3 w-3 rounded-full bg-[#ff304f] animate-ping" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight flex items-center gap-3">
            <span>112</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] bg-[#151c26] px-3 py-1 rounded-lg border border-[rgba(255,255,255,0.08)] font-sans">
              24x7 Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {primaryContact.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl leading-relaxed">
            Single nationwide emergency number for Police, Fire, Ambulance, and Disaster Search & Rescue. Instant GPS location triangulation enabled.
          </p>
        </div>

        
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            ref={heroButtonRef}
            href="tel:112"
            className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all active:scale-95 text-center cursor-pointer"
          >
            <PhoneCall className="h-5 w-5" />
            <span>Speed-Dial 112 Now</span>
          </a>

          <button
            type="button"
            onClick={() => setIsLocationBroadcasting(!isLocationBroadcasting)}
            className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isLocationBroadcasting
                ? 'bg-[rgba(22,199,132,0.15)] border-[#16c784] text-[#16c784]'
                : 'bg-[#151c26] border-[rgba(255,255,255,0.08)] text-white hover:bg-[#1b2430]'
            }`}
          >
            <Compass className={`h-4 w-4 ${isLocationBroadcasting ? 'animate-spin' : ''}`} />
            <span>{isLocationBroadcasting ? 'GPS Telemetry Shared: 23.0125° N, 72.5642° E' : 'Broadcast Live GPS Coordinates'}</span>
          </button>
        </div>
      </div>

      
      <div className="rounded-2xl bg-[#0d121a] border border-[rgba(255,48,79,0.3)] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider">
            <AlertOctagon className="h-4 w-4 text-[#ff304f]" />
            <span>Hold-To-Activate Citizen SOS Distress Beacon</span>
          </div>
          <span className="text-[10px] font-mono text-[#64748b]">3-Second Safety Guard</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Press and hold for 3 uninterrupted seconds to broadcast your instant distress packet to local emergency response teams and registered emergency contacts.
            </p>
            
            <div className="w-full h-2 bg-[#151c26] rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-[#ff8a1f] to-[#ff304f] transition-all duration-75"
                style={{ width: `${sosProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onMouseDown={handleSosStart}
            onMouseUp={handleSosCancel}
            onMouseLeave={handleSosCancel}
            onTouchStart={handleSosStart}
            onTouchEnd={handleSosCancel}
            className={`w-full sm:w-auto min-w-[220px] py-3.5 px-6 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all select-none cursor-pointer flex items-center justify-center gap-2 ${
              sosTriggered
                ? 'bg-[#16c784] text-white shadow-lg'
                : 'bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,48,79,0.4)] text-[#ff304f] active:scale-95'
            }`}
          >
            {sosTriggered ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-white" />
                <span>Distress Beacon Broadcasted!</span>
              </>
            ) : sosProgress > 0 ? (
              <span>Holding: {Math.round(sosProgress)}%</span>
            ) : (
              <span>Press & Hold (3s SOS)</span>
            )}
          </button>
        </div>
      </div>

      
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
            Departmental & Specialist Helplines
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search emergency lines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#151c26] text-xs text-[#f5f7fa] placeholder:text-[#64748b] focus-command"
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
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#151c26] hover:bg-[#1b2430] border border-[rgba(255,255,255,0.08)] text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer min-h-[40px]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#16c784]" />
                  <span>Dial Direct</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>
      </div>
    </main>
  );
}
