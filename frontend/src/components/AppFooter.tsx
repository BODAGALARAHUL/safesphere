'use client';

import React from 'react';
import Image from 'next/image';
import { useDisaster } from '@/context/DisasterContext';
import { 
  Radio, 
  ArrowUpRight, 
  WifiOff, 
  Lock, 
  Eye 
} from 'lucide-react';

export const AppFooter: React.FC = () => {
  const { 
    selectedLocation, 
    isOffline 
  } = useDisaster();

  return (
    <footer className="hidden md:block w-full bg-[#04080c] border-t border-[#243646] text-[#b3c2d0] mt-auto">
      
      
      <div className="border-b border-[#243646]/60 bg-[#071018]/80 py-3">
        <div className="page-shell flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#101c27] border border-[#243646] text-[#f4f8fb] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>EOC Node: {selectedLocation}</span>
            </div>

            {isOffline ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] font-semibold">
                <WifiOff className="h-3.5 w-3.5" />
                <span>Low-Bandwidth Telemetry Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] font-semibold">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                <span>NDMA & GSDMA Stream Connected</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#71879a]">24/7 National Emergency Hotline</span>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 font-bold text-[#f43f5e] hover:underline"
            >
              <span>Dial 112 Speed-Dispatch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      
      <div className="page-shell py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/safesphere-logo.png"
                alt="SafeSphere - Public Safety Intelligence Platform"
                width={886}
                height={248}
                className="h-10 sm:h-11 w-auto max-w-[220px] object-contain select-none"
              />
            </div>
            <p className="text-xs text-[#71879a] leading-relaxed">
              Real-time civic disaster intelligence system delivering automated hydrological flood perimeter warnings, 
              geospatial safe haven routing, and verified multi-hazard survival protocols.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#71879a]">
              <span className="px-2 py-0.5 rounded bg-[#101c27] border border-[#243646]">SIH1462 Initiative</span>
              <span className="px-2 py-0.5 rounded bg-[#101c27] border border-[#243646]">Release v2.5</span>
            </div>
          </div>

          
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white">Emergency Hotlines</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:112" className="text-[#f43f5e] font-black hover:underline flex items-center justify-between">
                  <span>112 National Emergency</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f43f5e]/15">Primary</span>
                </a>
              </li>
              <li>
                <a href="tel:108" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>108 Medical Ambulance</span>
                  <span className="text-[#71879a]">Free 24x7</span>
                </a>
              </li>
              <li>
                <a href="tel:101" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>101 Fire & Rescue Command</span>
                  <span className="text-[#71879a]">Direct</span>
                </a>
              </li>
              <li>
                <a href="tel:100" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>100 Police Control Room</span>
                  <span className="text-[#71879a]">City</span>
                </a>
              </li>
              <li>
                <a href="tel:1078" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>1078 NDRF Headquarters</span>
                  <span className="text-[#71879a]">National</span>
                </a>
              </li>
            </ul>
          </div>

          
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white">System Operations</h4>
            <ul className="space-y-2 text-[#b3c2d0]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span>EOC Command Node Active</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span>Emergency Helplines Verified</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span>Offline Data Cache Synced</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
                <span>Doppler Radar Sensor Grid Live</span>
              </li>
            </ul>
          </div>

          
          <div className="space-y-3 text-xs">
            <h4 className="font-mono font-bold uppercase tracking-wider text-white">Public Safety Advisory</h4>
            <p className="text-xs text-[#71879a] leading-relaxed">
              SafeSphere operates as an integrated public safety platform. In imminent life-threatening emergencies, 
              prioritize physical evacuation to designated high-ground safe havens and dial 112 immediately.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-[#71879a]">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-[#22d3ee]" /> GPS Secured
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-[#10b981]" /> WCAG AA Compliant
              </span>
            </div>
          </div>

        </div>

        
        <div className="mt-8 pt-6 border-t border-[#243646]/60 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#71879a]">
          <p>© 2026 SafeSphere Civic Intelligence Platform · Smart India Hackathon (SIH1462)</p>
          <div className="flex items-center gap-4">
            <span>Verified NDMA & State Disaster Protocol Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
