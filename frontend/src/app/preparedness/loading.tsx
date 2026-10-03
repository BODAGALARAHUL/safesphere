import React from 'react';

export default function PreparednessLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      <div className="h-44 w-full bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-3">
        <div className="h-6 w-1/3 bg-[#18212d] rounded-lg" />
        <div className="h-4 w-1/2 bg-[#18212d] rounded-lg" />
        <div className="h-3 w-full bg-[#18212d] rounded-full mt-4" />
      </div>

      <div className="space-y-3">
        <div className="h-20 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-20 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-20 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
      </div>
    </div>
  );
}
