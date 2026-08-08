import React from 'react';

export default function SafeZonesLoading() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-8 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>

      {/* Filter & Search Bar Skeleton */}
      <div className="h-11 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />

      {/* Split Map & List Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-[420px] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="lg:col-span-5 space-y-3">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
