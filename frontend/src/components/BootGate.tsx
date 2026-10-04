'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Radio, Lock, Activity, Cpu } from 'lucide-react';
import { isReducedMotion } from '@/lib/animations';

interface BootGateProps {
  children: React.ReactNode;
}

const BOOT_STATUSES = [
  { threshold: 0, text: 'INITIALIZING CIVIC INTELLIGENCE' },
  { threshold: 22, text: 'CONNECTING EOC TELEMETRY' },
  { threshold: 45, text: 'SYNCHRONIZING GEOSPATIAL NETWORK' },
  { threshold: 68, text: 'LOADING EMERGENCY SERVICES' },
  { threshold: 86, text: 'VERIFYING SAFETY DATA' },
  { threshold: 98, text: 'SYSTEM READY' },
];

export const BootGate: React.FC<BootGateProps> = ({ children }) => {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('INITIALIZING CIVIC INTELLIGENCE');
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const bootContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (isReducedMotion()) {
      const frame = requestAnimationFrame(() => setIsBooting(false));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1800; 
    const interval = 25; 
    const step = (interval / duration) * 100;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += step;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText('SYSTEM READY');
        clearInterval(timer);

        
        setTimeout(() => {
          setIsExiting(true);
          
          setTimeout(() => {
            setIsBooting(false);
          }, 450);
        }, 180);
      } else {
        setProgress(Math.round(currentProgress));

        
        for (let i = BOOT_STATUSES.length - 1; i >= 0; i--) {
          if (currentProgress >= BOOT_STATUSES[i].threshold) {
            setStatusText(BOOT_STATUSES[i].text);
            break;
          }
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (isBooting) {
    return (
      <div
        ref={bootContainerRef}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071018] text-[#f4f8fb] select-none transition-all duration-400 ease-out ${
          isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 30%, rgba(34, 211, 238, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            linear-gradient(to bottom, #071018, #0b141d)
          `,
        }}
      >
        
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        
        <div className="absolute w-72 h-72 rounded-full bg-[rgba(34,211,238,0.06)] blur-3xl pointer-events-none animate-pulse" />

        
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-md space-y-4">
          
          
          <div className="flex flex-col items-center text-center space-y-2">
            
            <div className="relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
              <Image
                src="/safesphere-emblem-v2.png"
                alt="SafeSphere"
                width={262}
                height={232}
                priority
                className="w-full h-full object-contain select-none drop-shadow-[0_0_24px_rgba(34,211,238,0.5)]"
              />
              <div className="absolute top-1.5 right-2 flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]" />
              </div>
            </div>

            
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center leading-none">
                Safe<span className="text-[#22d3ee]">Sphere</span>
              </h1>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#22d3ee] uppercase">
                Civic Disaster Safety Platform
              </div>
            </div>
          </div>

          
          <div className="w-full space-y-2.5 py-3 border-y border-[#1E293B]/80">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8] flex items-center gap-2 font-medium tracking-wider text-[11px] sm:text-xs truncate max-w-[75%]">
                <Activity className="h-4 w-4 text-[#22D3EE] animate-pulse shrink-0" />
                <span className="truncate">{statusText}</span>
              </span>
              <span className="font-mono font-bold text-sm sm:text-base text-[#22D3EE] tracking-tight tabular-nums drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                {progress}%
              </span>
            </div>

            
            <div className="w-full h-2.5 bg-[#0A1622] rounded-full overflow-hidden border border-[#1E293B] p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#22D3EE] via-[#0EA5E9] to-[#10B981] rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          
          <div className="grid grid-cols-3 gap-2 w-full pt-2 font-mono text-[10px]">
            <div className="p-2.5 rounded-xl bg-[#0B1520] border border-[#1E293B] flex flex-col items-center justify-center gap-1">
              <Radio className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="font-semibold text-[#94A3B8]">EOC NODE</span>
              <span className="text-[#10B981] font-bold">ONLINE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0B1520] border border-[#1E293B] flex flex-col items-center justify-center gap-1">
              <Lock className="h-3.5 w-3.5 text-[#22D3EE]" />
              <span className="font-semibold text-[#94A3B8]">256-BIT</span>
              <span className="text-[#22D3EE] font-bold">SECURE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0B1520] border border-[#1E293B] flex flex-col items-center justify-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span className="font-semibold text-[#94A3B8]">SENSOR MESH</span>
              <span className="text-[#F59E0B] font-bold">ACTIVE</span>
            </div>
          </div>

          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1520] border border-[#1E293B] text-[11px] font-mono text-[#94A3B8]">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>SECURE EOC COMMAND CONNECTION</span>
          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
};
