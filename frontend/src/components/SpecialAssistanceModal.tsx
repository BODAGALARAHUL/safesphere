'use client';

import React, { useState } from 'react';
import { useDisaster, SpecialAssistanceRequest } from '@/context/DisasterContext';
import { X, HeartHandshake, MapPin, Phone, User, ShieldAlert } from 'lucide-react';

export const SpecialAssistanceModal: React.FC = () => {
  const { isAssistanceModalOpen, setIsAssistanceModalOpen, addAssistanceRequest, selectedLocation, t } = useDisaster();

  const [type, setType] = useState<SpecialAssistanceRequest['type']>('Elderly / Senior Care');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(selectedLocation);
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState<SpecialAssistanceRequest['priority']>('Critical Evacuation');

  if (!isAssistanceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) return;

    addAssistanceRequest({
      type,
      name,
      phone,
      location,
      details: details || 'Requires priority evacuation and transport to nearest shelter.',
      priority,
    });

    setIsAssistanceModalOpen(false);
    // Reset form
    setName('');
    setPhone('');
    setDetails('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAssistanceModalOpen(false)}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 shrink-0">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('specialAssistanceTitle')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('specialAssistanceDesc')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          {/* Assistance Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t('assistanceType')}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SpecialAssistanceRequest['type'])}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="Elderly / Senior Care">Elderly / Senior Care (Age 65+ Support)</option>
              <option value="Wheelchair / Mobility Escort">Wheelchair / Mobility Escort</option>
              <option value="Medical Oxygen / ICU Support">Medical Oxygen / ICU Support</option>
              <option value="Infant / Maternal Care">Infant / Maternal Care</option>
              <option value="Pet Evacuation">Pet Evacuation Support</option>
            </select>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {t('fullName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {t('phoneNo')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Location Landmark */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t('locationAddress')}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Flat 302, Ankur Apartments, Paldi, Ahmedabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Priority Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t('priorityLevel')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Critical Evacuation', 'Medical Priority', 'Standard Assistance'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all ${
                    priority === p
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t('additionalDetails')}
            </label>
            <textarea
              rows={2}
              placeholder="Needs stretcher carry down 3 flight of stairs; wheelchair required."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg transition-colors mt-2"
          >
            <ShieldAlert className="h-5 w-5" />
            <span>{t('submitAssistanceReq')}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
