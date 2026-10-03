import React from 'react';

export default function RiskLevelsLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      <div className="h-48 w-full bg-[#10151d] border border-[rgba(255,48,79,0.3)] rounded-2xl p-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-44 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-44 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-44 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
        <div className="h-44 bg-[#10151d] border border-[rgba(255,255,255,0.06)] rounded-2xl" />
      </div>
    </div>
  );
}
