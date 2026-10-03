'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, UserCheck, Menu } from 'lucide-react';
import { User } from '../../types/auth';

interface HeaderProps {
  user: User | null;
  onOpenMobileMenu: () => void;
}

export function Header({ user, onOpenMobileMenu }: HeaderProps) {
  return (
    <header className="px-4 md:px-8 py-3.5 bg-[#070e1c]/80 backdrop-blur border-b border-slate-800/80 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">SAFE SPHERE // CIVIC INTELLIGENCE PLATFORM</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-cyan-400">ADMINISTRATIVE CONSOLE</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">LIVE API CONNECTED</span>
        </div>

        {user && (
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-semibold hidden sm:inline">
              {user.profile?.name || user.email}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/40 rounded">
              {user.role}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
