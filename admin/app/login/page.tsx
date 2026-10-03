'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, AlertTriangle, RefreshCw, ArrowUpRight } from 'lucide-react';
import { AuthApi } from '../../lib/api/auth';

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await AuthApi.login(identifier.trim(), password);
      if (res.user.role !== 'ADMIN' && res.user.role !== 'DISASTER_OPERATOR') {
        setError('Access Forbidden: Your account does not have Administrator or Operator privileges.');
        await AuthApi.logout();
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'Invalid administrator credentials. Please check and retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background illumination effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl shadow-xl shadow-cyan-950/40 mb-4">
            <ShieldAlert className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">SafeSphere Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono tracking-wide">
            CIVIC INTELLIGENCE // COMMAND & DISPATCH CONSOLE
          </p>
        </div>

        <div className="bg-[#0b1322]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/60">
          {error && (
            <div className="mb-5 p-3.5 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Identifier
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@safesphere.gov.in"
                className="w-full px-4 py-2.5 bg-[#070e1a] border border-slate-700/70 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Master Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-[#070e1a] border border-slate-700/70 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Admin Console</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider text-center">
              Quick-Fill Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('admin@safesphere.gov.in');
                  setPassword('SafeSphere@2026');
                  setError('');
                }}
                className="p-2 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 rounded-xl text-left transition cursor-pointer group"
              >
                <div className="text-[11px] font-semibold text-cyan-400 group-hover:text-cyan-300">
                  Chief Admin
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  admin@safesphere.gov.in
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier('operator@gsdma.gov.in');
                  setPassword('SafeSphere@2026');
                  setError('');
                }}
                className="p-2 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 rounded-xl text-left transition cursor-pointer group"
              >
                <div className="text-[11px] font-semibold text-amber-400 group-hover:text-amber-300">
                  Disaster Operator
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  operator@gsdma.gov.in
                </div>
              </button>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition font-mono"
            >
              <span>Return to Public Citizen Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
