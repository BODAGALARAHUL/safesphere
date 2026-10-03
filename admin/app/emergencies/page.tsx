'use client';

import React, { useEffect, useState } from 'react';
import {
  Radio,
  AlertTriangle,
  RefreshCw,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  Truck,
  Activity,
} from 'lucide-react';
import { EmergenciesApi } from '../../lib/api/emergencies';
import { EmergencyEventItem } from '../../types/emergencies';

const STATUS_TRANSITIONS: Record<
  string,
  Array<'RECEIVED' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>
> = {
  RECEIVED: ['ACKNOWLEDGED', 'CANCELLED'],
  ACKNOWLEDGED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export default function EmergenciesPage() {
  const [events, setEvents] = useState<EmergencyEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);

  // Transition state
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [transitionNotes, setTransitionNotes] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState<EmergencyEventItem | null>(null);
  const [selectedNextStatus, setSelectedNextStatus] = useState<
    'RECEIVED' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | ''
  >('');
  const [actionError, setActionError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await EmergenciesApi.getEmergencyEvents({
        page,
        limit: 20,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      });
      setEvents(res.data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve emergency queue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, priorityFilter, page]);

  const handleOpenStatusModal = (event: EmergencyEventItem) => {
    setActiveModalEvent(event);
    const available = STATUS_TRANSITIONS[event.status] || [];
    setSelectedNextStatus(available[0] || '');
    setTransitionNotes('');
    setActionError('');
  };

  const handleCommitTransition = async () => {
    if (!activeModalEvent || !selectedNextStatus) return;
    try {
      setUpdatingId(activeModalEvent.id);
      setActionError('');
      await EmergenciesApi.updateEmergencyStatus(
        activeModalEvent.id,
        selectedNextStatus,
        transitionNotes.trim() || undefined
      );
      setActiveModalEvent(null);
      fetchEvents();
    } catch (err: any) {
      setActionError(err?.message || 'Failed to transition emergency event status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 border border-red-500/50 text-red-300 animate-pulse">
            <Radio className="w-3 h-3 text-red-400" />
            RECEIVED
          </span>
        );
      case 'ACKNOWLEDGED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-500/50 text-amber-300">
            ACKNOWLEDGED
          </span>
        );
      case 'DISPATCHED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 border border-blue-500/50 text-blue-300">
            <Truck className="w-3 h-3 text-blue-400" />
            DISPATCHED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/50 text-purple-300">
            <Activity className="w-3 h-3 text-purple-400" />
            IN PROGRESS
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-400">
            <XCircle className="w-3 h-3" />
            CANCELLED
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-500/40">
            CRITICAL PRIORITY
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-950 text-orange-300 border border-orange-500/40">
            HIGH
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {p}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-red-400 animate-pulse" />
            <span>Emergency SOS Triage Queue</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time citizen SOS events, priority routing, and verified response stage transitions.
          </p>
        </div>

        <button
          onClick={fetchEvents}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['', 'RECEIVED', 'ACKNOWLEDGED', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                  : 'bg-[#050b14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {st || 'ALL ACTIVE & RESOLVED'}
            </button>
          ))}
        </div>

        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#050b14] border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-red-400"
          >
            <option value="">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Emergency Events List */}
      {error ? (
        <div className="p-8 text-center bg-[#091222] border border-red-500/40 rounded-2xl">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      ) : loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 animate-spin text-red-400 mx-auto mb-2" />
          Retrieving live emergency signals from backend...
        </div>
      ) : events.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          No emergency events currently in queue. All systems normal.
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => {
            const availableTransitions = STATUS_TRANSITIONS[ev.status] || [];
            return (
              <div
                key={ev.id}
                className={`bg-[#091222] border rounded-2xl p-5 shadow-xl transition flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  ev.status === 'RECEIVED'
                    ? 'border-red-500/50 bg-gradient-to-r from-red-950/20 to-slate-900/40'
                    : ev.status === 'DISPATCHED' || ev.status === 'IN_PROGRESS'
                    ? 'border-blue-500/40'
                    : 'border-slate-800'
                }`}
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {getStatusBadge(ev.status)}
                    {getPriorityBadge(ev.priority)}
                    <span className="text-xs font-mono text-white font-bold">{ev.type}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(ev.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      {ev.user?.profile?.name || ev.user?.email || 'Citizen User'}
                    </span>
                    {ev.user?.phone && (
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {ev.user.phone}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>
                      {ev.address || `${ev.latitude.toFixed(4)}, ${ev.longitude.toFixed(4)}`}
                    </span>
                  </p>

                  {ev.notes && (
                    <div className="p-2.5 bg-[#050b14] border border-slate-800 rounded-xl text-xs text-slate-300">
                      <span className="text-[10px] font-mono text-slate-500 block mb-0.5">DISPATCH NOTES</span>
                      {ev.notes}
                    </div>
                  )}
                </div>

                <div className="shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {availableTransitions.length > 0 ? (
                    <button
                      onClick={() => handleOpenStatusModal(ev)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-950/40 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Activity className="w-4 h-4" />
                      <span>Advance Incident Status</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Lifecycle Concluded</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* State Transition Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Advance Emergency Response Stage</h2>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Current Status:{' '}
              <span className="text-amber-400 font-bold">{activeModalEvent.status}</span>
            </p>

            {actionError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {actionError}
              </div>
            )}

            <div className="space-y-4 mb-6 text-xs">
              <div>
                <label className="block text-slate-300 font-mono uppercase mb-1.5">Next Permitted Status</label>
                <div className="space-y-2">
                  {(STATUS_TRANSITIONS[activeModalEvent.status] || []).map((st) => (
                    <label
                      key={st}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        selectedNextStatus === st
                          ? 'bg-cyan-950/60 border-cyan-400 text-white font-bold'
                          : 'bg-[#060c18] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{st}</span>
                      <input
                        type="radio"
                        name="nextStatus"
                        checked={selectedNextStatus === st}
                        onChange={() => setSelectedNextStatus(st)}
                        className="accent-cyan-400"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono uppercase mb-1.5">
                  Dispatcher Notes / Unit Assignment
                </label>
                <textarea
                  rows={3}
                  value={transitionNotes}
                  onChange={(e) => setTransitionNotes(e.target.value)}
                  placeholder="e.g. Unit 4 dispatched from Central Station. Estimated arrival 4 mins."
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCommitTransition}
                disabled={!selectedNextStatus || updatingId !== null}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition disabled:opacity-50"
              >
                {updatingId ? 'Updating...' : 'Commit Status Transition'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
