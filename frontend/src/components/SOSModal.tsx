'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import {
  X,
  Phone,
  Share2,
  MapPin,
  AlertOctagon,
  Volume2,
  VolumeX,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const SOSModal: React.FC = () => {
  const {
    isSOSOpen,
    setIsSOSOpen,
    selectedLocation,
    isAudioSirenPlaying,
    toggleAudioSiren
  } = useDisaster();
  
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [locationShared, setLocationShared] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  const HOLD_DURATION_MS = 1800;

  const startHolding = () => {
    if (isActivated) return;
    holdStartTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      if (!holdStartTimeRef.current) return;
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(intervalRef.current!);
        setIsActivated(true);
        setHoldProgress(100);
      }
    }, 25);
  };

  const cancelHolding = () => {
    if (isActivated) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    holdStartTimeRef.current = null;
    setHoldProgress(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActivated) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActivated]);

  useEffect(() => {
    const currentInterval = intervalRef.current;
    return () => {
      if (currentInterval) clearInterval(currentInterval);
    };
  }, []);

  const handleReset = () => {
    setIsActivated(false);
    setHoldProgress(0);
    setLocationShared(false);
    setCountdown(5);
  };

  const handleClose = () => {
    cancelHolding();
    setIsSOSOpen(false);
    handleReset();
  };

  if (!isSOSOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.12)] p-6 sm:p-7 shadow-2xl text-[#f8fafc] overflow-hidden">
        
        
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#18212d] text-[#718096] hover:text-white transition-colors focus-command"
          aria-label="Close SOS modal"
        >
          <X className="h-5 w-5" />
        </button>

        
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldAlert className="h-6 w-6 text-[#ff304f] animate-pulse shrink-0" />
          <h2 className="text-xl font-black text-white tracking-tight">
            Emergency SOS Confirmation
          </h2>
        </div>

        {!isActivated ? (
          
          <div className="flex flex-col items-center text-center py-2 space-y-4">
            <div className="p-3 bg-[#18212d] border border-[rgba(255,255,255,0.08)] rounded-xl text-xs text-[#aab7c7] font-medium max-w-sm">
              Press and hold for 2 seconds to initiate national emergency dispatch (112) and transmit your GPS coordinates.
            </div>

            
            <div className="relative my-2 flex items-center justify-center">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  className="stroke-[#18212d]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  className="stroke-[#ff304f] transition-all duration-75"
                  strokeWidth="8"
                  strokeDasharray={490}
                  strokeDashoffset={490 - (490 * holdProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <button
                type="button"
                onMouseDown={startHolding}
                onMouseUp={cancelHolding}
                onMouseLeave={cancelHolding}
                onTouchStart={startHolding}
                onTouchEnd={cancelHolding}
                className="absolute flex flex-col items-center justify-center h-32 w-32 rounded-full bg-[#ff304f] hover:bg-[#e02441] active:scale-95 text-white font-black shadow-2xl transition-transform select-none focus-command"
              >
                <AlertOctagon className="h-8 w-8 mb-1" />
                <span className="text-sm font-black tracking-wider">HOLD SOS</span>
                <span className="text-[10px] opacity-80 font-semibold">2 SECONDS</span>
              </button>
            </div>

            
            <div className="w-full pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#718096]">
              <span>Need immediate bypass?</span>
              <button
                type="button"
                onClick={() => setIsActivated(true)}
                className="text-[#ff304f] hover:underline font-bold"
              >
                Tap to Activate Instantly
              </button>
            </div>
          </div>
        ) : (
          
          <div className="space-y-4 py-2">
            
            
            <div className="p-4 rounded-xl bg-[rgba(255,48,79,0.1)] border border-[rgba(255,48,79,0.35)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff304f] text-white font-black text-lg">
                  {countdown}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {countdown > 0 ? 'Transmitting Distress Signal' : 'Distress Signal Transmitted'}
                  </h4>
                  <p className="text-xs text-[#aab7c7]">
                    {countdown > 0 ? `Auto-dispatching in ${countdown}s` : 'SDMA & Police Notified'}
                  </p>
                </div>
              </div>

              {countdown > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-[#18212d] hover:bg-[#202b3a] text-xs font-bold text-white border border-[rgba(255,255,255,0.1)]"
                >
                  Cancel
                </button>
              )}
            </div>

            
            <div className="p-3.5 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#718096] tracking-wider block">
                GPS Coordinates Transmitted
              </span>
              <p className="font-bold text-[#f8fafc] flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#16c784] shrink-0" />
                {selectedLocation} (Lat: 23.0125° N, Lng: 72.5642° E)
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={toggleAudioSiren}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-colors ${
                  isAudioSirenPlaying
                    ? 'bg-[rgba(245,197,66,0.2)] border-[#f5c542] text-[#f5c542]'
                    : 'bg-[#18212d] border-[rgba(255,255,255,0.08)] text-[#f8fafc] hover:bg-[#202b3a]'
                }`}
              >
                {isAudioSirenPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isAudioSirenPlaying ? 'Mute Siren' : 'Play Alarm Siren'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLocationShared(true);
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(`EMERGENCY SOS: I need help at ${selectedLocation}. Lat: 23.0125, Lng: 72.5642`);
                  }
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] text-xs font-bold text-[#f8fafc] hover:bg-[#202b3a] transition-colors"
              >
                <Share2 className="h-4 w-4 text-[#38a8ff]" />
                <span>{locationShared ? 'Copied Location' : 'Share Location'}</span>
              </button>
            </div>

            
            <a
              href="tel:112"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-sm shadow-xl transition-all"
            >
              <Phone className="h-5 w-5" />
              <span>Call 112 National Emergency Now</span>
            </a>

            
            <div className="text-center pt-1">
              <Link
                href="/safe-zones"
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38a8ff] hover:underline"
              >
                <span>Navigate to Paldi Community Shelter (1.2 km)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
