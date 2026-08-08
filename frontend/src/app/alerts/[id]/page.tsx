'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_DISASTER_ALERTS } from '@/data/disastersData';
import { SeverityBadge } from '@/components/SeverityBadge';
import {
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Phone,
  Navigation,
  Shield,
  Share2
} from 'lucide-react';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alertId = params?.id as string;

  const alert = MOCK_DISASTER_ALERTS.find(a => a.id === alertId) || MOCK_DISASTER_ALERTS[0];

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Alerts</span>
      </button>

      {/* Header Info */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SeverityBadge severity={alert.severity} size="lg" />
          <span className="text-xs text-slate-500 font-medium">Source: {alert.officialSource}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          {alert.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-b border-slate-100 dark:border-slate-800 py-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-red-600 shrink-0" />
            <span>{alert.location}</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Issued {alert.issuedAt}</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1.5 text-red-600 font-bold">
            <Shield className="h-4 w-4" />
            <span>{alert.affectedRadius}</span>
          </div>
        </div>
      </div>

      {/* WHAT IS HAPPENING? */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
          WHAT IS HAPPENING?
        </h2>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          {alert.summary}
        </p>
        <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <span className="font-bold text-slate-900 dark:text-white">Status Update: </span>
          {alert.statusText}
        </div>
      </section>

      {/* WHAT YOU SHOULD DO NOW */}
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <h2 className="text-xs font-black uppercase tracking-wider">
            WHAT YOU SHOULD DO RIGHT NOW
          </h2>
        </div>

        <ol className="space-y-3">
          {alert.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200 font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-snug">{action}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* AVOID BLOCK */}
      <section className="rounded-2xl border-2 border-red-500 bg-red-50 dark:bg-red-950/40 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-900 dark:text-red-200 font-black">
          <AlertOctagon className="h-5 w-5 text-red-600 shrink-0" />
          <h2 className="text-xs uppercase tracking-wider">STRICTLY AVOID</h2>
        </div>

        <ul className="space-y-2">
          {alert.avoidItems.map((avoid, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-900 dark:text-red-200 font-bold">
              <span className="text-red-600">✕</span>
              <span>{avoid}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* DIRECT EMERGENCY ACTIONS BAR */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Link
          href="/safe-zones"
          className="flex items-center justify-center gap-2 h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-colors"
        >
          <Navigation className="h-5 w-5" />
          <span>FIND NEAREST SAFE LOCATION</span>
        </Link>

        <a
          href="tel:112"
          className="flex items-center justify-center gap-2 h-14 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-colors"
        >
          <Phone className="h-5 w-5" />
          <span>CALL 112 EMERGENCY</span>
        </a>
      </section>

    </main>
  );
}
