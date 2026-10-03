'use client';

import React, { useEffect, useState } from 'react';
import {
  HeartHandshake,
  AlertTriangle,
  RefreshCw,
  Clock,
  MapPin,
  Phone,
  User,
  Shield,
  Truck,
} from 'lucide-react';
import { AssistanceApi } from '../../lib/api/assistance';
import { AssistanceRequestItem } from '../../types/emergencies';

export default function AssistancePage() {
  const [requests, setRequests] = useState<AssistanceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modal State
  const [activeRequest, setActiveRequest] = useState<AssistanceRequestItem | null>(null);
  const [nextStatus, setNextStatus] = useState<'RECEIVED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>('ASSIGNED');
  const [assignedUnit, setAssignedUnit] = useState('Medical Evacuation Unit 2');
  const [dispatchNotes, setDispatchNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await AssistanceApi.getAssistanceRequests({
        page,
        limit: 20,
        status: statusFilter || undefined,
        type: typeFilter || undefined,
      });
      setRequests(res.data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve special assistance queue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, typeFilter, page]);

  const handleOpenModal = (req: AssistanceRequestItem) => {
    setActiveRequest(req);
    setNextStatus(
      req.status === 'RECEIVED'
        ? 'ASSIGNED'
        : req.status === 'ASSIGNED'
        ? 'IN_PROGRESS'
        : 'COMPLETED'
    );
    setAssignedUnit(req.assignedTo || 'Special Assistance Unit 1');
    setDispatchNotes('');
    setActionError('');
  };

  const handleCommitUpdate = async () => {
    if (!activeRequest) return;
    try {
      setSaving(true);
      setActionError('');
      await AssistanceApi.updateAssistanceStatus(
        activeRequest.id,
        nextStatus,
        dispatchNotes.trim() || undefined,
        assignedUnit.trim() || undefined
      );
      setActiveRequest(null);
      fetchRequests();
    } catch (err: any) {
      setActionError(err?.message || 'Failed to update assistance request.');
    } finally {
      setSaving(false);
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-500/40">
            CRITICAL
          </span>
        );
      case 'MEDICAL_PRIORITY':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
            MEDICAL PRIORITY
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/40">
            STANDARD
          </span>
        );
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'RECEIVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-500/50 text-amber-300 animate-pulse">
            PENDING TRIAGE
          </span>
        );
      case 'ASSIGNED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 border border-blue-500/50 text-blue-300">
            TEAM ASSIGNED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/50 text-purple-300">
            IN EVACUATION
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
            COMPLETED
          </span>
        );
      default:
        return <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-mono">{s}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-purple-400" />
            <span>Special Assistance & Vulnerable Evacuation</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dispatch prioritized evacuation for elderly, mobility-impaired, maternal, and oxygen-dependent citizens.
          </p>
        </div>

        <button
          onClick={fetchRequests}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-purple-400' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['', 'RECEIVED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-[#050b14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {st || 'ALL ASSISTANCE'}
            </button>
          ))}
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#050b14] border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-400"
          >
            <option value="">All Assistance Types</option>
            <option value="ELDERLY">Elderly Support</option>
            <option value="MOBILITY">Mobility / Wheelchair</option>
            <option value="OXYGEN_ICU">Oxygen / ICU Dependent</option>
            <option value="MATERNAL">Maternal / Infant</option>
            <option value="PET">Pet & Animal Rescue</option>
            <option value="OTHER">Other Specialized Needs</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      {error ? (
        <div className="p-8 text-center bg-[#091222] border border-red-500/40 rounded-2xl">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      ) : loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 animate-spin text-purple-400 mx-auto mb-2" />
          Loading special assistance requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          No special assistance requests currently in queue.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-[#091222] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  {getStatusBadge(req.status)}
                  {getPriorityBadge(req.priority)}
                  <span className="text-xs font-mono text-purple-300 font-bold uppercase">{req.type}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    {req.user?.profile?.name || req.user?.email || 'Citizen User'}
                  </span>
                  {req.user?.phone && (
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {req.user.phone}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>
                    {req.address || `${req.latitude.toFixed(4)}, ${req.longitude.toFixed(4)}`}
                  </span>
                </p>

                <p className="text-xs text-slate-300 bg-[#050b14] p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {req.description}
                </p>

                {req.assignedTo && (
                  <p className="text-xs text-cyan-300 font-mono flex items-center gap-1.5 pt-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Assigned Unit: {req.assignedTo}</span>
                  </p>
                )}
              </div>

              <div className="shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                {req.status !== 'COMPLETED' && req.status !== 'CANCELLED' ? (
                  <button
                    onClick={() => handleOpenModal(req)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-950/40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Update Triage & Unit</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Request Resolved</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-purple-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Update Assistance Dispatch</h2>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Category: <span className="text-purple-300 font-bold">{activeRequest.type}</span>
            </p>

            {actionError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {actionError}
              </div>
            )}

            <div className="space-y-4 mb-6 text-xs">
              <div>
                <label className="block text-slate-300 font-mono uppercase mb-1.5">Response State</label>
                <select
                  value={nextStatus}
                  onChange={(e: any) => setNextStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="ASSIGNED">ASSIGNED (Rescue Unit Allocated)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (En Route / In Transit)</option>
                  <option value="COMPLETED">COMPLETED (Citizen Safe)</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono uppercase mb-1.5">Assigned Rescue Team / Vehicle</label>
                <input
                  type="text"
                  value={assignedUnit}
                  onChange={(e) => setAssignedUnit(e.target.value)}
                  placeholder="e.g. Rapid Medical Squad 3"
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono uppercase mb-1.5">Operational Log Notes</label>
                <textarea
                  rows={3}
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  placeholder="Special medical equipment needed, oxygen cylinders loaded..."
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveRequest(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCommitUpdate}
                disabled={saving}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Save Dispatch Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
