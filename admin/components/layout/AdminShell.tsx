'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AuthApi } from '../../lib/api/auth';
import { User } from '../../types/auth';
import { ShieldAlert, X } from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // If on login page, skip shell check
    if (pathname === '/login') {
      setLoading(false);
      return;
    }

    AuthApi.getCurrentUser()
      .then((u) => {
        if (!u || (u.role !== 'ADMIN' && u.role !== 'DISASTER_OPERATOR')) {
          router.push('/login');
        } else {
          setUser(u);
        }
      })
      .catch(() => {
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    await AuthApi.logout();
    router.push('/login');
  };

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040810] flex flex-col items-center justify-center text-slate-200">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
          <ShieldAlert className="w-6 h-6 text-cyan-400 absolute" />
        </div>
        <p className="mt-4 text-xs font-mono tracking-widest text-slate-400 uppercase">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-full">
            <Sidebar user={user} onLogout={handleLogout} onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar user={user} onLogout={handleLogout} />
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header user={user} onOpenMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
