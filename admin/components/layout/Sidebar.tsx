'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Zap,
  Users,
  AlertTriangle,
  MapPin,
  Radio,
  HeartHandshake,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import { User } from '../../types/auth';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: Zap },
  { name: 'User Management', href: '/users', icon: Users, adminOnly: true },
  { name: 'Disaster Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Safe Zones', href: '/safe-zones', icon: MapPin },
  { name: 'Emergency SOS', href: '/emergencies', icon: Radio },
  { name: 'Special Assistance', href: '/assistance', icon: HeartHandshake },
  { name: 'Security Audit Logs', href: '/audit-logs', icon: FileText, adminOnly: true },
  { name: 'System Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  user?: User | null;
  onLogout: () => void;
  onCloseMobile?: () => void;
}

export function Sidebar({ user, onLogout, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const filteredNav = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && user && user.role !== 'ADMIN') {
      return false;
    }
    return true;
  });

  return (
    <div className="w-64 bg-[#070e1c] border-r border-slate-800/80 flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-950 to-slate-900 border border-cyan-500/40 rounded-xl shadow-lg shadow-cyan-950/40">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <div className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
            <span>SafeSphere</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-normal border ${
              user?.role === 'ADMIN'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {user?.role === 'ADMIN' ? 'ADMIN' : 'OPERATOR'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 tracking-wider">COMMAND CONSOLE</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Citizen Portal Link */}
      <div className="px-3 py-2">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-300 hover:bg-slate-800/30 border border-dashed border-slate-700/60 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Citizen Portal (3000)</span>
          </span>
        </a>
      </div>

      {/* Logout button */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#060c18]">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-800/60 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-300 text-xs font-mono rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </div>
  );
}
