'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDisaster } from '@/context/DisasterContext';
import { MOCK_DISASTER_ALERTS, getLocalizedAlert } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import {
  X,
  Bell,
  MapPin,
  Plus,
  CheckCircle2,
  ChevronRight,
  User,
  Phone
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    setIsAssistanceModalOpen,
    assistanceRequests,
    isThreatMode,
    currentLanguage
  } = useDisaster();

  const [activeTab, setActiveTab] = useState<'BROADCASTS' | 'ASSISTANCE'>('BROADCASTS');

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      
      
      <div
        className="absolute inset-0"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      
      <div className="relative w-full max-w-md bg-[#10151d] border-l border-[rgba(255,255,255,0.08)] h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300 text-[#f8fafc]">
        
        
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between bg-[#070a0f]">
          <div className="flex items-center gap-2.5">
            <div className="relative p-2.5 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] text-white">
              <Bell className="h-5 w-5 text-[#38a8ff]" />
              {isThreatMode && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff304f] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff304f]" />
                </span>
              )}
            </div>
            <div>
              <h2 className="font-bold text-base text-[#f8fafc] leading-tight">
                Emergency Activity Feed
              </h2>
              <span className="text-xs text-[#718096]">
                Broadcasts & Dispatch Status
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-2 rounded-lg bg-[#18212d] text-[#718096] hover:text-white transition-colors focus-command"
            aria-label="Close notification drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        
        <div className="flex p-2.5 bg-[#070a0f] border-b border-[rgba(255,255,255,0.08)] gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('BROADCASTS')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'BROADCASTS'
                ? 'bg-[#18212d] text-white border border-[rgba(255,255,255,0.12)]'
                : 'text-[#718096] hover:text-white'
            }`}
          >
            Broadcasts ({MOCK_DISASTER_ALERTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ASSISTANCE')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'ASSISTANCE'
                ? 'bg-[#18212d] text-white border border-[rgba(255,255,255,0.12)]'
                : 'text-[#718096] hover:text-white'
            }`}
          >
            Requests ({assistanceRequests.length})
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {activeTab === 'BROADCASTS' ? (
            MOCK_DISASTER_ALERTS.map(alert => {
              const localized = getLocalizedAlert(alert, currentLanguage);
              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <SeverityBadge severity={localized.severity} size="sm" />
                    <span className="text-[11px] text-[#718096] font-medium">{localized.issuedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#f8fafc] leading-snug">
                    {localized.title}
                  </h4>
                  <p className="text-xs text-[#aab7c7] line-clamp-2">
                    {localized.summary}
                  </p>
                  <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs">
                    <span className="text-[#718096] truncate">{localized.officialSource}</span>
                    <Link
                      href={`/alerts/${localized.id}`}
                      onClick={() => setIsNotificationDrawerOpen(false)}
                      className="text-[#38a8ff] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="space-y-3.5">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationDrawerOpen(false);
                  setIsAssistanceModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#38a8ff] hover:bg-[#2b8edd] text-white font-bold text-xs shadow-md transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Special Assistance Request</span>
              </button>

              {assistanceRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-[#18212d] border border-[rgba(255,255,255,0.08)] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {req.type}
                    </span>
                    <span className="text-[11px] text-[#718096]">{req.timestamp}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#f8fafc] flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-[#aab7c7]" />
                      {req.name}
                    </h4>
                    <p className="text-xs text-[#aab7c7] flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-[#aab7c7]" />
                      {req.location}
                    </p>
                  </div>
                  <p className="text-xs text-[#aab7c7] bg-[#10151d] p-2.5 rounded-lg border border-[rgba(255,255,255,0.06)]">
                    {req.details}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="font-bold text-[#16c784] flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {req.status}
                    </span>
                    <a
                      href={`tel:${req.phone}`}
                      className="text-[#38a8ff] font-bold flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
