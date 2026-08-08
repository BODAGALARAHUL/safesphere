import React from 'react';

export default function AlertsLoading() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-11 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />

      {/* Alert Cards Skeleton */}
      <div className="space-y-4">
        <div className="h-40 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-40 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-40 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}
