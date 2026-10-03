'use client';

import React, { useState } from 'react';
import { useDisaster, SpecialAssistanceRequest } from '@/context/DisasterContext';
import { X, HeartHandshake } from 'lucide-react';

export const SpecialAssistanceModal: React.FC = () => {
  const { isAssistanceModalOpen, setIsAssistanceModalOpen, addAssistanceRequest, selectedLocation } = useDisaster();

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
    
    setName('');
    setPhone('');
    setDetails('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.12)] p-6 sm:p-7 shadow-2xl text-[#f8fafc] overflow-hidden max-h-[90vh] overflow-y-auto">
        
        
        <button
          type="button"
          onClick={() => setIsAssistanceModalOpen(false)}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#18212d] text-[#718096] hover:text-white transition-colors focus-command"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Special Evacuation Dispatch Request
            </h2>
            <p className="text-xs text-[#aab7c7]">
              Priority rescue transport for vulnerable citizens during active disaster operations.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
              Assistance Category
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SpecialAssistanceRequest['type'])}
              className="w-full h-11 px-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#18212d] text-xs sm:text-sm font-bold text-[#f8fafc] focus-command"
            >
              <option value="Elderly / Senior Care">Elderly / Senior Care (Age 65+ Support)</option>
              <option value="Wheelchair / Mobility Escort">Wheelchair / Mobility Escort</option>
              <option value="Medical Oxygen / ICU Support">Medical Oxygen / ICU Critical Support</option>
              <option value="Infant / Maternal Care">Infant & Maternal Emergency Care</option>
              <option value="Pet Evacuation">Household Pet Evacuation Support</option>
            </select>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
                Citizen Name
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#18212d] text-xs sm:text-sm text-[#f8fafc] placeholder:text-[#718096] focus-command"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#18212d] text-xs sm:text-sm text-[#f8fafc] placeholder:text-[#718096] focus-command"
              />
            </div>
          </div>

          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
              Current Pickup Address / Floor / Landmark
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Flat 302, Ankur Apts, Paldi, Ahmedabad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#18212d] text-xs sm:text-sm text-[#f8fafc] placeholder:text-[#718096] focus-command"
            />
          </div>

          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
              Special Requirements / Medical Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Stretcher needed, bedridden patient, oxygen cylinder required..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#18212d] text-xs sm:text-sm text-[#f8fafc] placeholder:text-[#718096] focus-command"
            />
          </div>

          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#718096]">
              Triage Priority Classification
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['Critical Evacuation', 'Medical Priority', 'Standard Assistance'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-2 rounded-lg font-bold border transition-colors ${
                    priority === p
                      ? 'border-[#ff304f] bg-[rgba(255,48,79,0.15)] text-[#ff304f]'
                      : 'border-[rgba(255,255,255,0.08)] bg-[#18212d] text-[#aab7c7]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#38a8ff] hover:bg-[#2b8edd] text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Transmit Request to Municipal Rescue Ops
          </button>
        </form>

      </div>
    </div>
  );
};
