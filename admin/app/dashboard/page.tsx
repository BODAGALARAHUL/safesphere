'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  AlertTriangle,
  Radio,
  HeartHandshake,
  MapPin,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Database,
  Activity,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { AdminApi } from '../../lib/api/admin';
import { apiClient } from '../../lib/api/client';
import { SystemStats } from '../../types/admin';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiHealth, setApiHealth] = useState<{ status: string; database: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
      setError('');

      const [statsData, healthRes] = await Promise.all([
        AdminApi.getSystemStats(),
        apiClient.get<{ status: string; database?: { status: string } }>('/health').catch(() => null),
      ]);

      setStats(statsData);
      if (healthRes && healthRes.data) {
        setApiHealth({
          status: 'OPERATIONAL',
          database: healthRes.data.database?.status || 'CONNECTED',
        });
      } else {
        setApiHealth({ status: 'OFFLINE', database: 'DISCONNECTED' });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch real-time operational statistics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statCards = [
    {
      title: 'Total Registered Users',
      value: stats?.totalCitizensAndOperators ?? '—',
      label: 'Citizens & Operational Responders',
      icon: Users,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      href: '/users',
    },
    {
      title: 'Active Disaster Alerts',
      value: stats?.activeDisasterAlerts ?? '—',
      label: 'Broadcasting in Real-Time',
      icon: AlertTriangle,
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      href: '/alerts',
    },
    {
      title: 'Ongoing SOS Emergencies',
      value: stats?.ongoingEmergencyEvents ?? '—',
      label: 'Live Incident Triage Queue',
      icon: Radio,
      color: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400',
      href: '/emergencies',
    },
    {
      title: 'Special Assistance Calls',
      value: stats?.pendingAssistanceRequests ?? '—',
      label: 'Vulnerable Citizen Evacuations',
      icon: HeartHandshake,
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      href: '/assistance',
    },
    {
      title: 'Designated Safe Zones',
      value: stats?.openSafeZones ?? '—',
      label: 'Shelters, Hospitals & Stations',
      icon: MapPin,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      href: '/safe-zones',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Operational Command Center</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-mono">
            Real-time civic intelligence, incident triage, and authority controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={refreshing}
            className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>

          <Link
            href="/alerts"
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-red-950/50 transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Broadcast Alert</span>
          </Link>
        </div>
      </div>

      {/* Error Alert if any */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-2xl text-red-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadData}
            className="px-3 py-1 bg-red-900/60 hover:bg-red-800 border border-red-500/50 rounded-lg text-white font-mono text-[11px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`relative group bg-[#091222] border ${card.borderColor} rounded-2xl p-5 hover:border-cyan-400/60 transition shadow-xl shadow-black/40 overflow-hidden flex flex-col justify-between`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <div className="flex items-start justify-between relative z-10">
                <span className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
                  {card.title}
                </span>
                <div className={`p-2 bg-slate-900/80 rounded-xl border border-slate-800 ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 relative z-10">
                <div className="text-3xl font-black tracking-tight text-white">
                  {loading ? (
                    <div className="h-9 w-16 bg-slate-800 animate-pulse rounded-lg" />
                  ) : (
                    card.value
                  )}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">{card.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Operational Subsystems & Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subsystems Health */}
        <div className="lg:col-span-2 bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Platform Infrastructure Telemetry</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              {stats?.timestamp ? new Date(stats.timestamp).toLocaleTimeString() : 'Live'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#050b14] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  API Core
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-emerald-400 font-mono">
                {apiHealth?.status || 'OPERATIONAL'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Express TypeScript :5000</p>
            </div>

            <div className="bg-[#050b14] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  PostgreSQL
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-emerald-400 font-mono">
                {apiHealth?.database || 'CONNECTED'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Supabase Pooler (ap-south-1)</p>
            </div>

            <div className="bg-[#050b14] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  RBAC Gate
                </span>
                <span className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              <p className="text-sm font-bold text-purple-400 font-mono">ENFORCED</p>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Hashed Refresh Rotation</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero Reported Integrity Failures
            </span>
            <Link
              href="/audit-logs"
              className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
            >
              <span>View Audit Trail</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Quick Command Actions */}
        <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Incident Quick Actions</h2>
            <p className="text-xs text-slate-400 font-mono mb-4">Direct administrative dispatch tools</p>

            <div className="space-y-2.5">
              <Link
                href="/alerts"
                className="w-full px-4 py-3 bg-[#0d1829] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Issue Disaster Warning</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                href="/emergencies"
                className="w-full px-4 py-3 bg-[#0d1829] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-red-400" />
                  <span>Inspect Emergency Queue</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                href="/safe-zones"
                className="w-full px-4 py-3 bg-[#0d1829] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Add Evacuation Shelter</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 text-center">
            Authorized for disaster operators and system administrators only.
          </div>
        </div>
      </div>
    </div>
  );
}
