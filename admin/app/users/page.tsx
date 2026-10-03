'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { AdminApi } from '../../lib/api/admin';
import { AdminUser } from '../../types/admin';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modal States
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState<'CITIZEN' | 'DISASTER_OPERATOR' | 'ADMIN'>('CITIZEN');
  const [targetStatus, setTargetStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED'>('ACTIVE');
  const [statusReason, setStatusReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await AdminApi.getUsers({
        page,
        limit: 10,
        search: search.trim() || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
      });

      setUsers(res.data || []);
      if (res.meta?.pagination) {
        setTotalPages(res.meta.pagination.totalPages);
        setTotalItems(res.meta.pagination.totalItems);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleOpenRoleModal = (user: AdminUser) => {
    setSelectedUser(user);
    setTargetRole(user.role);
    setActionError('');
    setActionSuccess('');
    setRoleModalOpen(true);
  };

  const handleOpenStatusModal = (user: AdminUser) => {
    setSelectedUser(user);
    setTargetStatus(user.status);
    setStatusReason('');
    setActionError('');
    setActionSuccess('');
    setStatusModalOpen(true);
  };

  const submitRoleChange = async () => {
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      setActionError('');
      await AdminApi.updateUserRole(selectedUser.id, targetRole);
      setActionSuccess(`User role updated to ${targetRole} successfully.`);
      setTimeout(() => {
        setRoleModalOpen(false);
        fetchUsers();
      }, 1000);
    } catch (err: any) {
      setActionError(err?.message || 'Failed to update user role.');
    } finally {
      setActionLoading(false);
    }
  };

  const submitStatusChange = async () => {
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      setActionError('');
      await AdminApi.updateUserStatus(selectedUser.id, targetStatus, statusReason || undefined);
      setActionSuccess(`User status changed to ${targetStatus}.`);
      setTimeout(() => {
        setStatusModalOpen(false);
        fetchUsers();
      }, 1000);
    } catch (err: any) {
      setActionError(err?.message || 'Failed to change account status.');
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-purple-950/60 text-purple-300 border border-purple-500/40">
            <ShieldAlert className="w-3 h-3" />
            ADMIN
          </span>
        );
      case 'DISASTER_OPERATOR':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-950/60 text-amber-300 border border-amber-500/40">
            <Shield className="w-3 h-3" />
            OPERATOR
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-950/60 text-blue-300 border border-blue-500/40">
            CITIZEN
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            ACTIVE
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-950/50 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" />
            SUSPENDED
          </span>
        );
      case 'DEACTIVATED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-950/50 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" />
            DEACTIVATED
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>User & Access Directory</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Browse registered citizens, disaster operators, role elevation, and security status.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 bg-[#050b14] border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#050b14] border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="">All Roles</option>
              <option value="CITIZEN">Citizen</option>
              <option value="DISASTER_OPERATOR">Disaster Operator</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#050b14] border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="">All Account Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="DEACTIVATED">Deactivated</option>
            </select>
          </div>

          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full h-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-xl transition flex items-center justify-center cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Users Table Card */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {error ? (
          <div className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-3 px-3 py-1.5 bg-red-900/40 border border-red-500/40 text-white text-xs rounded-lg font-mono"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-mono">
            <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
            Loading SafeSphere users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs font-mono">
            No users found matching the query criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-[#060c18] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Registered</th>
                  <th className="py-3.5 px-4">Last Login</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <Link
                          href={`/users/${u.id}`}
                          className="font-medium text-white hover:text-cyan-400 transition flex items-center gap-1"
                        >
                          <span>{u.profile?.name || 'Unnamed Citizen'}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </Link>
                        <p className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                          {u.email || 'No email provided'}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {u.phone || '—'}
                    </td>
                    <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(u.status)}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenRoleModal(u)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[11px] text-cyan-300 font-mono transition cursor-pointer"
                      >
                        Role
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal(u)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[11px] text-amber-300 font-mono transition cursor-pointer"
                      >
                        Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="p-4 bg-[#070d1a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            Showing page {page} of {totalPages} ({totalItems} total users)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className="p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className="p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Role Management Modal */}
      {roleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1524] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Modify Account Role</h2>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Updating role for <span className="text-cyan-400">{selectedUser.email || selectedUser.profile?.name}</span>
            </p>

            {actionError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {actionError}
              </div>
            )}
            {actionSuccess && (
              <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs">
                {actionSuccess}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-mono text-slate-300 uppercase">Select Role Privilege</label>
              {(['CITIZEN', 'DISASTER_OPERATOR', 'ADMIN'] as const).map((r) => (
                <label
                  key={r}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    targetRole === r
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-white'
                      : 'bg-[#070e1b] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold">{r}</p>
                    <p className="text-[10px] text-slate-400">
                      {r === 'ADMIN'
                        ? 'Full platform command, user management & system audits.'
                        : r === 'DISASTER_OPERATOR'
                        ? 'Issue warnings, manage shelters & emergency response dispatch.'
                        : 'Public civic features, personal profile & SOS triggers.'}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="role"
                    checked={targetRole === r}
                    onChange={() => setTargetRole(r)}
                    className="accent-cyan-400"
                  />
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitRoleChange}
                disabled={actionLoading}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-xs transition disabled:opacity-50"
              >
                {actionLoading ? 'Updating...' : 'Save Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Management Modal */}
      {statusModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1524] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Update Account Status</h2>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Modifying status for <span className="text-cyan-400">{selectedUser.email || selectedUser.profile?.name}</span>
            </p>

            {actionError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {actionError}
              </div>
            )}
            {actionSuccess && (
              <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs">
                {actionSuccess}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Account State</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ACTIVE', 'SUSPENDED', 'DEACTIVATED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setTargetStatus(st)}
                      className={`py-2 px-2 rounded-xl text-xs font-mono border transition ${
                        targetStatus === st
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-[#070e1b] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {targetStatus !== 'ACTIVE' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                    Reason for Suspension / Deactivation
                  </label>
                  <textarea
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    placeholder="Enter security justification or violation reason..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[#050b14] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                  <p className="text-[10px] text-amber-400 font-mono mt-1">
                    * Active refresh tokens will be immediately revoked upon suspension.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitStatusChange}
                disabled={actionLoading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-xs transition disabled:opacity-50"
              >
                {actionLoading ? 'Updating...' : 'Commit Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
