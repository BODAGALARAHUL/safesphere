import React from 'react';

export default function DisastersLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-48 bg-[#18212d] rounded-full" />
        <div className="h-8 w-72 bg-[#18212d] rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-48 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-48 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-48 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-48 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
      </div>
    </div>
  );
}
