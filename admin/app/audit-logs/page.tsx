'use client';

import React, { useEffect, useState } from 'react';
import {
  FileText,
  AlertTriangle,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  X,
} from 'lucide-react';
import { AdminApi } from '../../lib/api/admin';
import { AuditLogItem } from '../../types/admin';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSearch, setActionSearch] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // JSON viewer modal
  const [inspectLog, setInspectLog] = useState<AuditLogItem | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await AdminApi.getAuditLogs({
        page,
        limit: 15,
        action: actionSearch.trim() || undefined,
        resourceType: resourceTypeFilter || undefined,
      });

      setLogs(res.data || []);
      if (res.meta?.pagination) {
        setTotalPages(res.meta.pagination.totalPages);
        setTotalItems(res.meta.pagination.totalItems);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve immutable audit trail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, resourceTypeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const getActionBadge = (action: string) => {
    if (action.includes('ROLE') || action.includes('STATUS')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-500/40 text-amber-300">
          {action}
        </span>
      );
    }
    if (action.includes('ALERT') || action.includes('EMERGENCY')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/80 border border-red-500/40 text-red-300">
          {action}
        </span>
      );
    }
    if (action.includes('LOGIN')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/80 border border-blue-500/40 text-blue-300">
          {action}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
        {action}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Immutable Security Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Tamper-evident logs of administrative actions, role delegations, status changes, and alert broadcasts.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={actionSearch}
              onChange={(e) => setActionSearch(e.target.value)}
              placeholder="Search action keyword (e.g. ROLE_CHANGED, ALERT_CREATED)..."
              className="w-full pl-10 pr-4 py-2 bg-[#050b14] border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={resourceTypeFilter}
              onChange={(e) => {
                setResourceTypeFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-[#050b14] border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Resource Types</option>
              <option value="User">User</option>
              <option value="DisasterAlert">DisasterAlert</option>
              <option value="EmergencyEvent">EmergencyEvent</option>
              <option value="AssistanceRequest">AssistanceRequest</option>
              <option value="SafeZone">SafeZone</option>
              <option value="UserPreparednessProgress">UserPreparednessProgress</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-xl transition flex items-center justify-center cursor-pointer"
            >
              Filter Logs
            </button>
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {error ? (
          <div className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        ) : loading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-mono">
            <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
            Retrieving tamper-evident audit logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs font-mono">
            No audit records found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-[#060c18] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Actor</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Resource</th>
                  <th className="py-3.5 px-4">IP Address</th>
                  <th className="py-3.5 px-4 text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {logs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.user ? (
                        <div>
                          <p className="font-mono text-white text-xs">{item.user.email}</p>
                          <span className="text-[10px] font-mono text-cyan-400">{item.user.role}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono text-[11px]">System Daemon</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">{getActionBadge(item.action)}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                      <span className="text-white font-medium">{item.resourceType}</span>
                      {item.resourceId && (
                        <span className="text-slate-500 block truncate max-w-xs">{item.resourceId}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {item.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.metadata ? (
                        <button
                          onClick={() => setInspectLog(item)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-[10px] font-mono border border-slate-700 transition cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>JSON</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 bg-[#070d1a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            Page {page} of {totalPages} ({totalItems} recorded events)
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

      {/* JSON Inspector Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white font-mono">
                Audit Record Payload [{inspectLog.action}]
              </h2>
              <button onClick={() => setInspectLog(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#050b14] border border-slate-800 rounded-xl p-4 overflow-x-auto max-h-80 text-[11px] font-mono text-cyan-300">
              <pre>{JSON.stringify(inspectLog.metadata, null, 2)}</pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
