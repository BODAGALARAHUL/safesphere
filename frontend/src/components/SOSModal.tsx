'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { X, Phone, Share2, MapPin, AlertOctagon, CheckCircle2, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { isSOSOpen, setIsSOSOpen, selectedLocation, isAudioSirenPlaying, toggleAudioSiren } = useDisaster();
  
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [locationShared, setLocationShared] = useState<boolean>(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  const HOLD_DURATION_MS = 2500; // 2.5 seconds hold duration

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
    }, 30);
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleReset = () => {
    setIsActivated(false);
    setHoldProgress(0);
    setLocationShared(false);
  };

  const handleClose = () => {
    cancelHolding();
    setIsSOSOpen(false);
    handleReset();
  };

  if (!isSOSOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close SOS modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="h-6 w-6 text-red-600 animate-pulse shrink-0" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Emergency SOS Assistance
          </h2>
        </div>

        {!isActivated ? (
          /* Initial State: Hold to Activate */
          <div className="flex flex-col items-center text-center py-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl mb-6 text-xs text-red-800 dark:text-red-300 font-medium max-w-sm">
              Press and hold the button below for 2.5 seconds to dispatch emergency alerts and broadcast your location.
            </div>

            {/* Circular Hold Button */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Progress Ring */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="86"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="86"
                  className="text-red-600 transition-all duration-75"
                  strokeWidth="10"
                  strokeDasharray={540}
                  strokeDashoffset={540 - (540 * holdProgress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              {/* Interactive Button */}
              <button
                type="button"
                onMouseDown={startHolding}
                onMouseUp={cancelHolding}
                onMouseLeave={cancelHolding}
                onTouchStart={startHolding}
                onTouchEnd={cancelHolding}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') startHolding();
                }}
                onKeyUp={cancelHolding}
                className="absolute w-36 h-36 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex flex-col items-center justify-center font-extrabold shadow-xl transition-transform select-none focus:outline-none focus:ring-4 focus:ring-red-400"
                aria-label="Hold for emergency activation"
              >
                <AlertOctagon className="h-8 w-8 mb-1" />
                <span className="text-lg font-black tracking-wider">HOLD SOS</span>
                <span className="text-[10px] opacity-80 font-normal">Touch / Spacebar</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {holdProgress > 0 ? `Holding... ${Math.round(holdProgress)}%` : 'Release to cancel at any time.'}
            </p>
          </div>
        ) : (
          /* Activated State: Action Center */
          <div className="flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            {/* Status Banner */}
            <div className="rounded-xl bg-red-600 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-white animate-ping" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-red-100">
                    STATUS ACTIVE
                  </div>
                  <div className="text-lg font-black">EMERGENCY STATE ACTIVATED</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleAudioSiren}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                {isAudioSirenPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isAudioSirenPlaying ? 'Mute Siren' : 'Siren Alarm'}</span>
              </button>
            </div>

            {/* Simulated GPS Readout */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedLocation}</span>
                  <div className="text-[11px] text-slate-500">GPS: 23.0125° N, 72.5642° E (High Accuracy 5m)</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[10px]">
                LIVE LOCK
              </span>
            </div>

            {/* Primary Action 1: CALL 112 */}
            <a
              href="tel:112"
              className="flex items-center justify-center gap-3 h-14 rounded-xl bg-red-600 hover:bg-red-700 text-white text-lg font-black shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-400"
            >
              <Phone className="h-6 w-6" />
              <span>CALL 112 NATIONAL EMERGENCY NOW</span>
            </a>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              {/* Share Location via SMS */}
              <button
                type="button"
                onClick={() => setLocationShared(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {locationShared ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Location Broadcasted</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 text-sky-600" />
                    <span>Broadcast Location SMS</span>
                  </>
                )}
              </button>

              {/* Find Nearest Shelter */}
              <Link
                href="/safe-zones"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>Find Nearest Shelter</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 dark:text-slate-400 hover:underline text-center mt-2"
            >
              Deactivate & Reset SOS
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
