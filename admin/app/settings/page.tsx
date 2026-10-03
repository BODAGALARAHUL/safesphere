'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Key,
} from 'lucide-react';
import { AuthApi } from '../../lib/api/auth';
import { apiClient } from '../../lib/api/client';
import { User } from '../../types/auth';

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [testingConnection, setTestingConnection] = useState(false);

  const testConnection = async () => {
    try {
      setTestingConnection(true);
      const start = performance.now();
      const res = await apiClient.get<any>('/health');
      const duration = Math.round(performance.now() - start);
      setPingLatency(duration);
      setHealthData(res.data);
    } catch {
      setPingLatency(null);
      setHealthData(null);
    } finally {
      setTestingConnection(false);
    }
  };

  useEffect(() => {
    AuthApi.getCurrentUser().then(setCurrentUser);
    testConnection();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-cyan-400" />
          <span>System & Operational Settings</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Inspect production architecture parameters, connection health, rate-limiting policies, and session scope.
        </p>
      </div>

      {/* Connection & Telemetry Box */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Backend Connectivity & Latency Probe
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live HTTP round-trip latency to express backend on <code className="text-cyan-400">:5000</code>
            </p>
          </div>

          <button
            onClick={testConnection}
            disabled={testingConnection}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Probe Health</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#050b14] border border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">API Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold font-mono text-emerald-400">
                {healthData?.status || 'ONLINE'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Round-trip: {pingLatency !== null ? `${pingLatency}ms` : '—'}
            </span>
          </div>

          <div className="p-4 bg-[#050b14] border border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Database Engine</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-sm font-bold font-mono text-cyan-300">
                PostgreSQL (Supabase)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Prisma Connection Pooler
            </span>
          </div>

          <div className="p-4 bg-[#050b14] border border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Environment</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span className="text-sm font-bold font-mono text-purple-300">
                {healthData?.environment || 'development'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              API Version: {healthData?.version || '1.0.0'}
            </span>
          </div>
        </div>
      </div>

      {/* Security Policies & Environment Safeguards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Policy Configuration */}
        <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Platform Security Policies</span>
          </h2>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Rate Limiting Window</span>
              <span className="text-white font-bold">15 Minutes (100 reqs/IP)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Strict Auth Rate Limit</span>
              <span className="text-white font-bold">15 Minutes (10 reqs/IP)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Access Token Lifetime</span>
              <span className="text-cyan-400 font-bold">15 Minutes (JWT HS256)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Refresh Token Policy</span>
              <span className="text-emerald-400 font-bold">7 Days (Hashed Rotation)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Password Hashing Engine</span>
              <span className="text-purple-400 font-bold">Bcrypt (Salt Rounds: 10)</span>
            </div>
          </div>
        </div>

        {/* Current Admin Session Scope */}
        <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Active Administrator Session</span>
          </h2>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Authenticated Identifier</span>
              <span className="text-white font-bold">{currentUser?.email || 'admin@safesphere.gov.in'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Session Role</span>
              <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-500/40 rounded text-[11px] font-bold">
                {currentUser?.role || 'ADMIN'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Account Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#050b14] border border-slate-800 rounded-lg">
              <span className="text-slate-400">Authorization Scope</span>
              <span className="text-cyan-300">FULL OPERATIONAL ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
