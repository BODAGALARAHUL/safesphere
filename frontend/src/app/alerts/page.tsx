'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertCard } from '@/components/AlertCard';
import { useDisaster } from '@/context/DisasterContext';
import { AlertService } from '@/services';
import {
  animatePageEnter,
  createScrollCounter,
  createStaggerReveal
} from '@/lib/animations';
import { Search, Filter, CheckCircle2, MapPin, Radio, Layers } from 'lucide-react';

export default function AlertsPage() {
  const { selectedLocation } = useDisaster();
  const containerRef = useRef<HTMLElement>(null);
  const criticalCounterRef = useRef<HTMLSpanElement>(null);
  const highCounterRef = useRef<HTMLSpanElement>(null);
  const moderateCounterRef = useRef<HTMLSpanElement>(null);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allAlerts = AlertService.getAlerts();
  const criticalCount = allAlerts.filter(a => a.severity === 'CRITICAL').length;
  const highCount = allAlerts.filter(a => a.severity === 'HIGH_RISK').length;
  const moderateCount = allAlerts.filter(a => a.severity === 'MODERATE').length;

  useEffect(() => {
    animatePageEnter(containerRef.current);
    if (criticalCounterRef.current) createScrollCounter(criticalCounterRef.current, criticalCount);
    if (highCounterRef.current) createScrollCounter(highCounterRef.current, highCount);
    if (moderateCounterRef.current) createScrollCounter(moderateCounterRef.current, moderateCount);
  }, [criticalCount, highCount, moderateCount]);

  useEffect(() => {
    if (feedContainerRef.current) {
      createStaggerReveal(feedContainerRef.current, '.alert-feed-item', { stagger: 0.08, yOffset: 20 });
    }
  }, [selectedSeverity, selectedType, selectedArea, searchQuery]);

  const severityTabs = [
    { id: 'ALL', label: 'All Severities' },
    { id: 'CRITICAL', label: 'Critical' },
    { id: 'HIGH_RISK', label: 'High Risk' },
    { id: 'MODERATE', label: 'Moderate' },
  ];

  const disasterTypes = ['ALL', 'Flood', 'Cyclone', 'Earthquake', 'Landslide', 'Fire', 'Heatwave'];

  const filteredAlerts = AlertService.filterAlerts(allAlerts, {
    severity: selectedSeverity,
    disasterType: selectedType,
    searchQuery,
    area: selectedArea,
  });

  return (
    <main 
      ref={containerRef}
      className="atmosphere-alerts w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-6">
      
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff304f] uppercase tracking-wider">
            <Radio className="h-4 w-4 text-[#ff304f] animate-pulse" />
            <span>Incident Intelligence Stream</span>
          </div>
          <span className="text-xs font-mono text-[#64748b] hidden sm:inline">
            Official EOC Feed
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Active Disaster Warnings & Advisories
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] flex items-center gap-1.5">
          <span>Continuous official broadcasts from IMD, GSDMA & NDMA telemetry for</span>
          <span className="font-semibold text-white flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#16c784]" />
            {selectedLocation}
          </span>
        </p>

        
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 font-mono text-xs">
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#0d121a] border border-[rgba(255,48,79,0.3)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs text-[#94a3b8] truncate">Critical</span>
            <span className="font-black text-sm sm:text-base text-[#ff304f] whitespace-nowrap">
              <span ref={criticalCounterRef}>{criticalCount}</span> <span className="text-[9px] sm:text-xs font-normal">Active</span>
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#0d121a] border border-[rgba(255,138,31,0.3)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs text-[#94a3b8] truncate">High Risk</span>
            <span className="font-black text-sm sm:text-base text-[#ff8a1f] whitespace-nowrap">
              <span ref={highCounterRef}>{highCount}</span> <span className="text-[9px] sm:text-xs font-normal">Zones</span>
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#0d121a] border border-[rgba(245,197,66,0.3)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs text-[#94a3b8] truncate">Advisories</span>
            <span className="font-black text-sm sm:text-base text-[#f5c542] whitespace-nowrap">
              <span ref={moderateCounterRef}>{moderateCount}</span> <span className="text-[9px] sm:text-xs font-normal">Monitored</span>
            </span>
          </div>
        </div>
      </div>

      
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] space-y-4 shadow-sm w-full min-w-0">
        
        
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search active warnings by keyword or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#151c26] text-sm text-[#f5f7fa] placeholder:text-[#64748b] focus-command transition-all"
          />
        </div>

        
        <div className="flex flex-col gap-2.5 pt-1 border-t border-[rgba(255,255,255,0.06)] w-full min-w-0">
          
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full min-w-0">
            <span className="text-xs font-semibold text-[#64748b] mr-1 flex items-center gap-1 shrink-0 font-mono">
              <Filter className="h-3.5 w-3.5" /> Severity:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {severityTabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSeverity(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedSeverity === tab.id
                      ? 'bg-[#151c26] text-white border border-[rgba(255,255,255,0.16)] shadow-sm'
                      : 'bg-[#06080d] text-[#94a3b8] hover:text-white border border-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full min-w-0">
            <span className="text-xs font-semibold text-[#64748b] mr-1 flex items-center gap-1 shrink-0 font-mono">
              <Layers className="h-3.5 w-3.5 text-[#22d3ee]" /> Hazard:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {disasterTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedType === type
                      ? 'bg-[#22d3ee] text-[#071018] font-black shadow-md'
                      : 'bg-[#06080d] text-[#94a3b8] hover:text-white border border-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  {type === 'ALL' ? 'All Hazards' : type}
                </button>
              ))}
            </div>
          </div>

          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full min-w-0">
            <span className="text-xs font-semibold text-[#64748b] mr-1 flex items-center gap-1 shrink-0 font-mono">
              <MapPin className="h-3.5 w-3.5 text-[#10b981]" /> Region:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {[
                { id: 'ALL', label: 'All Gujarat' },
                { id: 'Ahmedabad', label: 'Ahmedabad' },
                { id: 'Kutch', label: 'Kutch / Saurashtra' },
                { id: 'Panchmahal', label: 'Panchmahal' },
                { id: 'Vadodara', label: 'Central Gujarat' },
              ].map(area => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedArea(area.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedArea === area.id
                      ? 'bg-[#10b981] text-[#071018] font-black shadow-md'
                      : 'bg-[#06080d] text-[#94a3b8] hover:text-white border border-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      
      <div ref={feedContainerRef} className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <div key={alert.id} className="alert-feed-item">
              <AlertCard alert={alert} />
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.06)] space-y-3">
            <CheckCircle2 className="h-10 w-10 text-[#16c784] mx-auto" />
            <h3 className="text-lg font-bold text-white">No Active Alerts Found</h3>
            <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
              No matching meteorological or seismic incidents reported for the selected filter parameters.
            </p>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}
