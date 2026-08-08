'use client';

import React, { useState } from 'react';
import { EMERGENCY_CONTACTS, EmergencyContact } from '@/data/emergencyContactsData';
import { Phone, Search, ShieldAlert, Share2, CheckCircle2, Ambulance, Flame, Shield, Radio, HeartHandshake, LifeBuoy } from 'lucide-react';

export default function EmergencyContactsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocationBroadcasting, setIsLocationBroadcasting] = useState<boolean>(false);

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
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
          <Phone className="h-4 w-4" />
          <span>OFFICIAL EMERGENCY HOTLINES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Emergency Contacts
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Direct tap-to-call emergency services across India. Available 24 hours a day, 7 days a week.
        </p>
      </div>

      {/* 112 DOMINANT PRIMARY HERO CARD */}
      <div className="rounded-2xl bg-red-600 text-white p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-red-800 text-red-100 text-xs font-black uppercase tracking-wider">
            PRIMARY NATIONAL HELPLINE
          </span>
          <span className="h-3 w-3 rounded-full bg-white animate-ping" />
        </div>

        <div className="space-y-1">
          <div className="text-4xl sm:text-5xl font-black tracking-tight">{primaryContact.number}</div>
          <h2 className="text-xl font-extrabold">{primaryContact.title}</h2>
          <p className="text-xs sm:text-sm text-red-100">{primaryContact.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`tel:${primaryContact.number}`}
            className="flex flex-1 items-center justify-center gap-2 h-14 rounded-xl bg-white text-red-700 hover:bg-red-50 font-black text-lg shadow-md transition-colors"
          >
            <Phone className="h-6 w-6" />
            <span>CALL 112 NOW</span>
          </a>

          <button
            type="button"
            onClick={() => setIsLocationBroadcasting(true)}
            className="flex items-center justify-center gap-2 h-14 px-5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs border border-red-500 transition-colors"
          >
            {isLocationBroadcasting ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <span>GPS Location Broadcasted</span>
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5" />
                <span>Broadcast Location SMS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by department name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all shadow-sm"
        />
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.filter(c => !c.primary).map(contact => {
          const IconComponent = getContactIcon(contact.iconName);

          return (
            <div
              key={contact.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {contact.title}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">
                      {contact.subtitle}
                    </div>
                  </div>
                </div>

                <span className="text-xl font-black text-slate-900 dark:text-white shrink-0 font-mono">
                  {contact.number}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {contact.description}
              </p>

              <a
                href={`tel:${contact.number}`}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Phone className="h-4 w-4" />
                <span>CALL {contact.number}</span>
              </a>
            </div>
          );
        })}
      </div>

    </main>
  );
}
