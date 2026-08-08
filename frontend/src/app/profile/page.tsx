'use client';

import React, { useState } from 'react';
import { useDisaster } from '@/context/DisasterContext';
import { User, MapPin, Bell, Eye, ShieldCheck, Check, Radio } from 'lucide-react';

export default function ProfilePage() {
  const { selectedLocation, setSelectedLocation } = useDisaster();

  const [smsAlerts, setSmsAlerts] = useState<boolean>(true);
  const [highPrioritySound, setHighPrioritySound] = useState<boolean>(true);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);

  const locations = [
    'Ahmedabad (Paldi / Vasna)',
    'Ahmedabad (Satellite / SG Highway)',
    'Mumbai Coast (Colaba / Worli)',
    'Surat (Hazira Coastal Belt)',
    'Delhi NCR (Yamuna Floodplain)',
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <User className="h-4 w-4 text-slate-700 dark:text-slate-300" />
          <span>APP PREFERENCES & REGION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings & Profile
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Configure regional monitoring area, notification priorities, and accessibility preferences.
        </p>
      </div>

      {/* Location Region Card */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Primary Monitoring Region
            </h2>
            <div className="text-xs text-slate-500">
              Disaster warnings and nearest safe zones will default to this area.
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {locations.map(loc => (
            <button
              key={loc}
              type="button"
              onClick={() => setSelectedLocation(loc)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                selectedLocation === loc
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <span>{loc}</span>
              {selectedLocation === loc && (
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Notification Preferences
            </h2>
            <div className="text-xs text-slate-500">
              High-priority broadcast channels for critical evacuation alerts.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* SMS Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                SMS Disaster Broadcasts
              </div>
              <div className="text-[11px] text-slate-500">
                Receive offline SMS alerts when mobile data is unavailable.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                smsAlerts ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  smsAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sound Alarm Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                High-Priority Emergency Alarm Sound
              </div>
              <div className="text-[11px] text-slate-500">
                Override silent mode for CRITICAL flood and cyclone warnings.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHighPrioritySound(!highPrioritySound)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                highPrioritySound ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  highPrioritySound ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Accessibility Options */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Accessibility Controls
            </h2>
            <div className="text-xs text-slate-500">
              Enhanced contrast and legibility for outdoor sunlight visibility.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                High-Contrast Display Mode
              </div>
              <div className="text-[11px] text-slate-500">
                Maximizes contrast for direct outdoor sunlight viewing.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                highContrast ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Large Emergency Typography
              </div>
              <div className="text-[11px] text-slate-500">
                Increases text font sizes across alert cards and emergency guides.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                largeText ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  largeText ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SIH Prototype Meta Card */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-sm flex items-center gap-4">
        <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
        <div className="text-xs space-y-1">
          <div className="font-extrabold text-sm text-white">SafeSphere (SIH1462) Prototype</div>
          <div className="text-slate-300">
            Designed and built for Smart India Hackathon. Operates on local mock telemetry for high reliability during network outages.
          </div>
        </div>
      </div>

    </main>
  );
}
