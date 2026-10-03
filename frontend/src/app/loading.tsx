import React from 'react';
import { Radio } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      
      <div className="h-56 sm:h-64 w-full rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.06)] p-6 space-y-4">
        <div className="h-5 w-36 rounded-full bg-[#18212d]" />
        <div className="h-8 w-3/4 rounded-xl bg-[#18212d]" />
        <div className="h-4 w-1/2 rounded-lg bg-[#18212d]" />
        <div className="h-12 w-48 rounded-xl bg-[#18212d] mt-4" />
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="h-28 rounded-xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
        <div className="h-28 rounded-xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
        <div className="h-28 rounded-xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
        <div className="h-28 rounded-xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-64 rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
        <div className="lg:col-span-5 h-64 rounded-2xl bg-[#10151d] border border-[rgba(255,255,255,0.06)]" />
      </div>

      <div className="flex items-center justify-center py-6 gap-2 text-xs font-bold text-[#718096]">
        <Radio className="h-4 w-4 animate-pulse text-[#38a8ff]" />
        <span>Synchronizing SafeSphere EOC Telemetry Feed...</span>
      </div>
    </div>
  );
}
