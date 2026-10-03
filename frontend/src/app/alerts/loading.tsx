import React from 'react';

export default function AlertsLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      
      <div className="space-y-2">
        <div className="h-4 w-36 bg-[#18212d] rounded-full" />
        <div className="h-8 w-72 bg-[#18212d] rounded-xl" />
        <div className="h-4 w-96 bg-[#18212d] rounded-lg" />
      </div>

      
      <div className="h-28 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 space-y-3">
        <div className="h-10 w-full bg-[#18212d] rounded-xl" />
        <div className="h-6 w-1/2 bg-[#18212d] rounded-lg" />
      </div>

      
      <div className="space-y-4">
        <div className="h-36 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-36 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-36 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
      </div>
    </div>
  );
}
