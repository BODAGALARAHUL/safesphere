import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-44 sm:h-52 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Content Skeleton */}
      <div className="h-36 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

      <div className="flex items-center justify-center py-6 gap-2 text-xs font-bold text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading SafeSphere Emergency Data...</span>
      </div>
    </div>
  );
}
