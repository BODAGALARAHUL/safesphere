'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SeverityBadge } from '@/components/SeverityBadge';
import { DisasterIcon } from '@/components/shared';
import { useDisaster } from '@/context/DisasterContext';
import {
  animatePageEnter,
  createScrollCounter,
  createStaggerReveal,
  createScrollReveal
} from '@/lib/animations';
import {
  ShieldAlert,
  MapPin,
  ArrowRight,
  TrendingUp,
  Gauge,
  Layers,
  Clock
} from 'lucide-react';

export default function RiskLevelsPage() {
  const { selectedLocation } = useDisaster();
  const containerRef = useRef<HTMLElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hazardsRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animatePageEnter(containerRef.current);
    if (scoreRef.current) createScrollCounter(scoreRef.current, 92);
    if (heroRef.current) createScrollReveal(heroRef.current, { yOffset: 24 });
    if (hazardsRef.current) createStaggerReveal(hazardsRef.current, '.hazard-row', { stagger: 0.08 });
    if (tiersRef.current) createStaggerReveal(tiersRef.current, '.tier-card', { stagger: 0.08 });
  }, []);

  const hazardsList = [
    {
      name: 'Sabarmati Basin Flood Level',
      type: 'Flood',
      severity: 'CRITICAL' as const,
      riskScore: 92,
      status: 'Active dam release: 134.5 ft river crest (Threshold: 128 ft)',
      trend: 'Rising (+1.2 ft/hr)',
      actionUrl: '/disasters/flood',
    },
    {
      name: 'Arabian Sea Cyclonic Winds',
      type: 'Cyclone',
      severity: 'HIGH_RISK' as const,
      riskScore: 68,
      status: 'Peripheral gale gusts 65 km/h recorded at coastal radars',
      trend: 'Sustained',
      actionUrl: '/disasters/cyclone',
    },
    {
      name: 'Pavagadh Hillside Slope Telemetry',
      type: 'Landslide',
      severity: 'HIGH_RISK' as const,
      riskScore: 74,
      status: 'High soil moisture saturation with rockfall warnings along highway',
      trend: 'Elevated Risk',
      actionUrl: '/disasters/landslide',
    },
    {
      name: 'Urban Industrial Fire Risk',
      type: 'Fire',
      severity: 'MODERATE' as const,
      riskScore: 45,
      status: 'Dry ambient winds with heightened chemical zone fire alert',
      trend: 'Monitored',
      actionUrl: '/disasters/fire',
    },
    {
      name: 'Seismic Fault Line Telemetry',
      type: 'Earthquake',
      severity: 'SAFE' as const,
      riskScore: 12,
      status: 'Zero micro-seismic anomalies detected across Zone 3 sensors',
      trend: 'Stable / Baseline',
      actionUrl: '/disasters/earthquake',
    },
  ];

  const riskComposition = [
    { label: 'River Crest & Flood Exposure', value: 95, color: '#ff304f' },
    { label: 'Meteorological Wind Severity', value: 68, color: '#ff8a1f' },
    { label: 'Safe Haven Proximity & Access', value: 35, color: '#38a8ff' },
    { label: 'Infrastructure & Road Accessibility', value: 72, color: '#f5c542' },
  ];

  const riskSpectrumTiers = [
    { 
      level: 'CRITICAL THREAT', 
      badge: 'CRITICAL',
      color: '#ff304f', 
      range: '80 - 100', 
      desc: 'Imminent life danger. Mandatory evacuation ordered.',
      action: 'Depart for designated shelter immediately. Dial 112 for rescue.'
    },
    { 
      level: 'HIGH RISK', 
      badge: 'HIGH_RISK',
      color: '#ff8a1f', 
      range: '60 - 79', 
      desc: 'Severe hazard conditions. Prepare immediate evacuation.',
      action: 'Pack 72-hour survival kit. Secure loose property and windows.'
    },
    { 
      level: 'MODERATE ADVISORY', 
      badge: 'MODERATE',
      color: '#f5c542', 
      range: '35 - 59', 
      desc: 'Active weather advisory. Restrict non-essential movement.',
      action: 'Monitor local broadcasts. Stay indoors and avoid riverfront areas.'
    },
    { 
      level: 'SAFE AREA', 
      badge: 'SAFE',
      color: '#16c784', 
      range: '0 - 34', 
      desc: 'Baseline telemetry. Standard situational awareness.',
      action: 'All systems normal. Review household readiness provisions.'
    },
  ];

  return (
    <main 
      ref={containerRef}
      className="atmosphere-risk w-full min-h-screen py-6 sm:py-8"
    >
      <div className="page-shell space-y-6 sm:space-y-8">
      
      
      <div className="space-y-1.5 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff304f] uppercase tracking-wider">
          <Gauge className="h-4 w-4 text-[#ff304f]" />
          <span>Regional Multi-Hazard Threat Index</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Citizen Multi-Hazard Risk Spectrum
        </h1>
        <p className="text-xs sm:text-sm text-[#94a3b8] flex items-center gap-1.5">
          <span>Real-time sensor telemetry and composite danger index for</span>
          <span className="font-semibold text-white flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#16c784]" />
            {selectedLocation}
          </span>
        </p>
      </div>

      
      <div ref={heroRef} className="rounded-2xl border border-[rgba(255,48,79,0.35)] bg-[#0d121a] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[rgba(255,48,79,0.12)] text-[#ff304f] border border-[rgba(255,48,79,0.3)]">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <div>
              <span className="font-mono text-xs font-bold text-[#ff304f] uppercase tracking-wider block">Current Composite Risk</span>
              <span className="font-black text-lg text-white">Critical Threat Mode Active</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748b]">
            <Clock className="h-3.5 w-3.5 text-[#94a3b8]" />
            <span>Updated 1m ago</span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
          
          
          <div className="lg:col-span-4 rounded-xl bg-[#151c26] border border-[rgba(255,48,79,0.3)] p-6 text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#94a3b8] tracking-wider block">
              Danger Index
            </span>
            <div ref={scoreRef} className="text-5xl sm:text-6xl font-black font-mono text-[#ff304f] tracking-tight">
              92
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#ff304f]/15 text-[#ff304f] font-mono text-xs font-black">
              CRITICAL HAZARD
            </span>
            <p className="text-[11px] text-[#94a3b8] pt-2">
              Composite score derived from hydrological dams, Doppler radars & elevation mesh.
            </p>
          </div>

          
          <div className="lg:col-span-8 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              Risk Parameter Telemetry Breakdown
            </h3>

            {riskComposition.map(param => (
              <div key={param.label} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold gap-2">
                  <span className="text-white truncate">{param.label}</span>
                  <span className="font-mono shrink-0" style={{ color: param.color }}>{param.value} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#151c26] overflow-hidden p-0.5 border border-[rgba(255,255,255,0.04)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${param.value}%`, backgroundColor: param.color }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      
      <section className="space-y-4">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-[#38a8ff]" />
          <span>Active Hazard Sensor Streams</span>
        </h2>

        <div ref={hazardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hazardsList.map(h => (
            <div
              key={h.name}
              className="hazard-row p-5 rounded-2xl bg-[#0d121a] border border-[rgba(255,255,255,0.08)] hover:bg-[#151c26] transition-all space-y-3.5 shadow-sm"
            >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#151c26] border border-[rgba(255,255,255,0.08)] text-white flex items-center justify-center">
                      <DisasterIcon type={h.type} className="h-5 w-5 text-[#22d3ee]" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-white">{h.name}</h4>
                      <span className="text-xs text-[#94a3b8]">{h.type} Sensor</span>
                    </div>
                  </div>
                  <SeverityBadge severity={h.severity} size="sm" />
                </div>

                <p className="text-xs text-[#94a3b8] bg-[#151c26] p-3 rounded-xl border border-[rgba(255,255,255,0.04)] leading-relaxed">
                  {h.status}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="font-mono text-[#64748b] flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-[#ff8a1f]" /> {h.trend}
                  </span>
                  <Link href={h.actionUrl} className="font-bold text-[#38a8ff] hover:underline flex items-center gap-1">
                    <span>Protocol</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </section>

      
      <section className="space-y-4">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
          National 4-Tier Disaster Action Matrix
        </h2>

        <div ref={tiersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskSpectrumTiers.map(tier => (
            <div
              key={tier.level}
              className="tier-card p-5 rounded-2xl bg-[#0d121a] border transition-all space-y-3 shadow-sm"
              style={{ borderColor: `${tier.color}40` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${tier.color}20`, color: tier.color }}>
                  {tier.level}
                </span>
                <span className="font-mono text-xs text-[#64748b]">{tier.range}</span>
              </div>
              <p className="text-xs font-bold text-white">{tier.desc}</p>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed pt-1 border-t border-[rgba(255,255,255,0.05)]">
                {tier.action}
              </p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
