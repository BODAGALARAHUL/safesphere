import React from 'react';

export default function SafeZonesLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      
      <div className="space-y-2">
        <div className="h-4 w-40 bg-[#18212d] rounded-full" />
        <div className="h-8 w-72 bg-[#18212d] rounded-xl" />
      </div>

      
      <div className="h-24 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4" />

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-[420px] bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="lg:col-span-5 space-y-3">
          <div className="h-32 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
          <div className="h-32 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
          <div className="h-32 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
