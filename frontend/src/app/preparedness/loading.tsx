import React from 'react';

export default function PreparednessLoading() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      <div className="h-36 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      <div className="space-y-3">
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
}
