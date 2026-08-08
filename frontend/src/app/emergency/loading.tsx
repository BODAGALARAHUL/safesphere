import React from 'react';

export default function EmergencyLoading() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
}
