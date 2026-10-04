'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { SafeZoneService } from '@/services';
import {
  X,
  Phone,
  Share2,
  MapPin,
  AlertOctagon,
  Volume2,
  VolumeX,
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';

export const SOSModal: React.FC = () => {
  const {
    isSOSOpen,
    setIsSOSOpen,
    selectedLocation,
    userLocation,
    isAudioSirenPlaying,
    toggleAudioSiren
  } = useDisaster();
  
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [locationShared, setLocationShared] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const HOLD_DURATION_MS = 1800; // strictly 1.8s hold

  const nearestShelter = SafeZoneService.getNearestSafeZone(userLocation.coordinates, selectedLocation);

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

  const cancelHolding = React.useCallback(() => {
    if (isActivated) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    holdStartTimeRef.current = null;
    setHoldProgress(0);
  }, [isActivated]);

  const handleReset = React.useCallback(() => {
    setIsActivated(false);
    setHoldProgress(0);
    setLocationShared(false);
    setCountdown(5);
  }, []);

  const handleClose = React.useCallback(() => {
    cancelHolding();
    setIsSOSOpen(false);
    handleReset();
  }, [setIsSOSOpen, handleReset, cancelHolding]);

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

  // Escape key to close modal
  useEffect(() => {
    if (!isSOSOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSOSOpen, handleClose]);

  if (!isSOSOpen) return null;

  const lat = userLocation.coordinates.latitude.toFixed(4);
  const lng = userLocation.coordinates.longitude.toFixed(4);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
      aria-describedby="sos-modal-desc"
      ref={modalContainerRef}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.12)] p-5 sm:p-7 shadow-2xl text-[#f8fafc] overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Close Modal Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#18212d] text-[#718096] hover:text-white transition-colors focus-command cursor-pointer"
          aria-label="Close emergency modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <ShieldAlert className="h-6 w-6 text-[#ff304f] animate-pulse shrink-0" />
          <h2 id="sos-modal-title" className="text-lg sm:text-xl font-black text-white tracking-tight">
            Emergency Distress Confirmation
          </h2>
        </div>

        {!isActivated ? (
          /* Hold to Confirm Screen */
          <div className="flex flex-col items-center text-center py-1 space-y-4">
            <p id="sos-modal-desc" className="p-3 bg-[#18212d] border border-[rgba(255,255,255,0.08)] rounded-xl text-xs text-[#aab7c7] font-medium max-w-sm leading-relaxed">
              Press and hold for 1.8 seconds to trigger simulated civic rescue protocol and package your active coordinates for 112 emergency services.
            </p>

            {/* Circular Progress Ring with SOS Button */}
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
                onTouchCancel={cancelHolding}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                    e.preventDefault();
                    startHolding();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cancelHolding();
                  }
                }}
                className="absolute flex flex-col items-center justify-center h-32 w-32 rounded-full bg-[#ff304f] hover:bg-[#e02441] active:scale-95 text-white font-black shadow-2xl transition-transform select-none focus-command cursor-pointer"
                aria-label="Hold button for 1.8 seconds to confirm emergency SOS"
              >
                <AlertOctagon className="h-8 w-8 mb-0.5" />
                <span className="text-sm font-black tracking-wider">HOLD SOS</span>
                <span className="text-[10px] opacity-80 font-mono font-bold">1.8 SECONDS</span>
              </button>
            </div>

            {/* Simulated Disclaimer */}
            <div className="w-full p-2.5 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.06)] flex items-center gap-2 text-[11px] text-[#94a3b8] text-left">
              <Info className="h-4 w-4 text-[#f59e0b] shrink-0" />
              <span>Simulated Safety Demo. For live life-saving distress in India, dial <strong>112</strong> immediately.</span>
            </div>

            <div className="w-full pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-bold text-[#94a3b8] hover:text-white px-4 py-2 rounded-lg bg-[#18212d] border border-[rgba(255,255,255,0.08)] cursor-pointer"
              >
                Cancel Action
              </button>
            </div>
          </div>
        ) : (
          /* Activated Protocol Screen */
          <div className="space-y-4 py-1">
            
            {/* Status Banner */}
            <div className="p-4 rounded-xl bg-[rgba(255,48,79,0.1)] border border-[rgba(255,48,79,0.35)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff304f] text-white font-black text-lg">
                  {countdown}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {countdown > 0 ? 'Transmitting Simulated Distress Signal' : 'Simulated Distress Transmitted'}
                  </h3>
                  <p className="text-xs text-[#aab7c7]">
                    {countdown > 0 ? `Auto-dispatching in ${countdown}s` : 'Civil Protection Demo Protocol Active'}
                  </p>
                </div>
              </div>

              {countdown > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-[#18212d] hover:bg-[#202b3a] text-xs font-bold text-white border border-[rgba(255,255,255,0.1)] cursor-pointer min-h-[36px]"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Transmitted Location */}
            <div className="p-3.5 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#718096] tracking-wider block">
                {userLocation.source === 'gps' ? 'Live GPS Telemetry' : 'Sector Area Coordinates'}
              </span>
              <p className="font-bold text-[#f8fafc] flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#16c784] shrink-0" />
                <span>{selectedLocation} (Lat: {lat}°, Lng: {lng}°)</span>
              </p>
            </div>

            {/* Siren & Share Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={toggleAudioSiren}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer min-h-[44px] ${
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
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText(`EMERGENCY SOS: I need assistance at ${selectedLocation}. Lat: ${lat}, Lng: ${lng}`);
                  }
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] text-xs font-bold text-[#f8fafc] hover:bg-[#202b3a] transition-colors cursor-pointer min-h-[44px]"
              >
                <Share2 className="h-4 w-4 text-[#38a8ff]" />
                <span>{locationShared ? 'Copied Location' : 'Share Location'}</span>
              </button>
            </div>

            {/* 112 Speed-Dial Primary Action */}
            <a
              href="tel:112"
              className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl bg-[#ff304f] hover:bg-[#e02441] text-white font-black text-sm shadow-xl transition-all min-h-[48px] cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              <span>Call 112 National Emergency Now</span>
            </a>

            {/* Nearest Safe Haven Link */}
            {nearestShelter && (
              <div className="text-center pt-1">
                <Link
                  href="/safe-zones"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38a8ff] hover:underline p-1"
                >
                  <span>Navigate to {nearestShelter.name} ({nearestShelter.distanceKm} km)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
