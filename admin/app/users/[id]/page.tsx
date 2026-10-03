'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  ChevronLeft,
  Shield,
  Phone,
  Mail,
  Calendar,
  Clock,
  Radio,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { AdminApi } from '../../../lib/api/admin';
import { AdminUser } from '../../../types/admin';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  const router = useRouter();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals & Action state
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await AdminApi.getUserById(userId);
      setUser(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load user details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleRoleChange = async (newRole: 'CITIZEN' | 'DISASTER_OPERATOR' | 'ADMIN') => {
    if (!confirm(`Are you sure you want to promote/change this account role to ${newRole}?`)) return;
    try {
      setActionLoading(true);
      setActionMessage(null);
      await AdminApi.updateUserRole(userId, newRole);
      setActionMessage({ type: 'success', text: `Role changed to ${newRole} successfully.` });
      fetchUser();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err?.message || 'Failed to update role.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED') => {
    const reason = prompt(`Enter justification for setting account status to ${newStatus}:`, 'Administrative action');
    if (reason === null) return;

    try {
      setActionLoading(true);
      setActionMessage(null);
      await AdminApi.updateUserStatus(userId, newStatus, reason);
      setActionMessage({ type: 'success', text: `Status updated to ${newStatus}.` });
      fetchUser();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err?.message || 'Failed to update status.' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-12 text-center text-slate-400 text-xs font-mono">
        <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-3" />
        Retrieving user credentials and operational records...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-[#091222] border border-red-500/40 rounded-2xl">
        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h2 className="text-base font-bold text-white mb-2">User Not Found or Inaccessible</h2>
        <p className="text-xs text-red-300 mb-6">{error || 'Could not locate record with this ID.'}</p>
        <Link
          href="/users"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-mono"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to User Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/users')}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {user.profile?.name || 'Citizen Account Profile'}
            </h1>
            <p className="text-xs font-mono text-slate-400">UUID: {user.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user.status === 'ACTIVE' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ACTIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 border border-red-500/40 rounded-full text-red-400 text-xs font-mono">
              <XCircle className="w-3.5 h-3.5" />
              {user.status}
            </span>
          )}
        </div>
      </div>

      {actionMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 border ${
            actionMessage.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/50 border-red-500/40 text-red-300'
          }`}
        >
          {actionMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Essential Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3">
              Account Attributes & Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Full Legal Name</span>
                <p className="font-medium text-white text-sm">{user.profile?.name || 'Not Provided'}</p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Primary Email</span>
                <p className="font-mono text-cyan-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email || 'None'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Mobile Contact</span>
                <p className="font-mono text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {user.phone || 'None'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Assigned Privilege Role</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                  <Shield className="w-3.5 h-3.5" />
                  {user.role}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Registered Location</span>
                <p className="text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {user.profile?.location || 'Unspecified'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Preferred Language</span>
                <p className="font-mono text-slate-300 uppercase">
                  {user.preferredLanguage || 'en'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Registration Timestamp</span>
                <p className="font-mono text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Last Authentication</span>
                <p className="font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never logged in'}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Registered Emergency Contacts ({user.emergencyContacts?.length || 0})
            </h2>

            {!user.emergencyContacts || user.emergencyContacts.length === 0 ? (
              <p className="text-xs text-slate-500 font-mono">No emergency contacts saved by user.</p>
            ) : (
              <div className="space-y-3">
                {user.emergencyContacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 bg-[#050b14] border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-white flex items-center gap-2">
                        <span>{c.name}</span>
                        {c.isPrimary && (
                          <span className="px-1.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded text-[10px] font-mono">
                            PRIMARY
                          </span>
                        )}
                      </p>
                      <p className="text-slate-400 text-[11px]">{c.relationship}</p>
                    </div>
                    <span className="font-mono text-cyan-300">{c.phone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Operational Stats & Admin Controls */}
        <div className="space-y-6">
          {/* User Emergency Activity Counts */}
          <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Emergency Activity Summary
            </h2>

            <div className="space-y-2.5">
              <div className="p-3 bg-[#050b14] border border-slate-800 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-400" />
                  SOS Events Triggered
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {user._count?.emergencyEvents || 0}
                </span>
              </div>

              <div className="p-3 bg-[#050b14] border border-slate-800 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  Assistance Requests
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {user._count?.assistanceRequests || 0}
                </span>
              </div>

              <div className="p-3 bg-[#050b14] border border-slate-800 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  Preparedness Items
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {user._count?.preparednessProgress || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Command Actions */}
          <div className="bg-[#091222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Administrative Actions
            </h2>

            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Role Privilege Delegation:</div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['CITIZEN', 'DISASTER_OPERATOR', 'ADMIN'] as const).map((r) => (
                  <button
                    key={r}
                    disabled={user.role === r || actionLoading}
                    onClick={() => handleRoleChange(r)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-mono border transition cursor-pointer disabled:opacity-40 ${
                      user.role === r
                        ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {r === 'DISASTER_OPERATOR' ? 'OPERATOR' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Account Moderation:</div>
              {user.status !== 'ACTIVE' ? (
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusChange('ACTIVE')}
                  className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Restore to ACTIVE Status
                </button>
              ) : (
                <>
                  <button
                    disabled={actionLoading}
                    onClick={() => handleStatusChange('SUSPENDED')}
                    className="w-full py-2 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Suspend Account (Revoke Tokens)
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handleStatusChange('DEACTIVATED')}
                    className="w-full py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/40 text-red-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Deactivate Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
