'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  X,
  Volume2,
  Radio,
} from 'lucide-react';
import { AlertsApi } from '../../lib/api/alerts';
import { DisasterAlertItem, CreateAlertData } from '../../types/alerts';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<DisasterAlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ACTIVE');
  const [severityFilter, setSeverityFilter] = useState('');
  const [search, setSearch] = useState('');

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  // Form inputs
  const [formDisasterType, setFormDisasterType] = useState<'FLOOD' | 'CYCLONE' | 'EARTHQUAKE' | 'LANDSLIDE' | 'FIRE'>('FLOOD');
  const [formSeverity, setFormSeverity] = useState<'CRITICAL' | 'HIGH_RISK' | 'MODERATE' | 'SAFE'>('CRITICAL');
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formLat, setFormLat] = useState('23.0225');
  const [formLng, setFormLng] = useState('72.5714');
  const [formRadius, setFormRadius] = useState('5.0');
  const [formSummary, setFormSummary] = useState('');
  const [formActions, setFormActions] = useState('Move to higher ground.\nTurn off main gas/electric valves.\nKeep emergency kit accessible.');
  const [formAvoid, setFormAvoid] = useState('Do not walk through moving flood water.\nAvoid submerged power lines and trees.');
  const [formSource, setFormSource] = useState('State Disaster Management Authority & Meteorological Dept');

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await AlertsApi.getAlerts({
        status: statusFilter || undefined,
        severity: severityFilter || undefined,
        search: search.trim() || undefined,
      });
      setAlerts(res.data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve disaster alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [statusFilter, severityFilter]);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);

    try {
      const actionsList = formActions
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const avoidList = formAvoid
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: CreateAlertData = {
        disasterType: formDisasterType,
        severity: formSeverity,
        title: formTitle.trim(),
        location: formLocation.trim(),
        latitude: parseFloat(formLat),
        longitude: parseFloat(formLng),
        affectedRadiusKm: parseFloat(formRadius),
        summary: formSummary.trim(),
        actions: actionsList,
        avoidItems: avoidList,
        officialSource: formSource.trim() || undefined,
        riskColor: formSeverity === 'CRITICAL' ? 'red' : formSeverity === 'HIGH_RISK' ? 'orange' : 'amber',
      };

      await AlertsApi.createAlert(payload);
      setCreateModalOpen(false);
      // Reset form
      setFormTitle('');
      setFormLocation('');
      setFormSummary('');
      fetchAlerts();
    } catch (err: any) {
      setCreateError(err?.message || 'Failed to broadcast disaster alert.');
    } finally {
      setCreating(false);
    }
  };

  const handleResolveAlert = async (id: string) => {
    if (!confirm('Are you sure you want to mark this emergency alert as RESOLVED? This will update citizen dashboards.')) return;
    try {
      setResolvingId(id);
      await AlertsApi.resolveAlert(id);
      fetchAlerts();
    } catch (err: any) {
      alert(err?.message || 'Failed to resolve alert.');
    } finally {
      setResolvingId(null);
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 border border-red-500/50 text-red-300">
            CRITICAL
          </span>
        );
      case 'HIGH_RISK':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-950/80 border border-orange-500/50 text-orange-300">
            HIGH RISK
          </span>
        );
      case 'MODERATE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-500/50 text-amber-300">
            MODERATE
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
            SAFE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-red-400" />
            <span>Emergency Broadcast Alert Center</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Publish official evacuation orders, hazard radius warnings, and life-safety instructions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAlerts}
            disabled={loading}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Disaster Warning</span>
          </button>
        </div>
      </div>

      {/* Filter and Status Toolbar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['ACTIVE', 'RESOLVED', 'ALL'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st === 'ALL' ? '' : st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                (st === 'ALL' && !statusFilter) || statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-[#050b14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {st} ALERTS
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#050b14] border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH_RISK">High Risk</option>
            <option value="MODERATE">Moderate</option>
            <option value="SAFE">Safe / Advisory</option>
          </select>
        </div>
      </div>

      {/* Alerts Grid / Cards */}
      {error ? (
        <div className="p-8 text-center bg-[#091222] border border-red-500/40 rounded-2xl">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      ) : loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
          Synchronizing broadcast warnings with backend...
        </div>
      ) : alerts.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          No disaster alerts recorded under the current filter criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((al) => (
            <div
              key={al.id}
              className={`bg-[#091222] border rounded-2xl p-5 shadow-xl transition flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                al.status === 'ACTIVE'
                  ? al.severity === 'CRITICAL'
                    ? 'border-red-500/40 bg-gradient-to-r from-red-950/20 to-slate-900/40'
                    : 'border-amber-500/40'
                  : 'border-slate-800 opacity-75'
              }`}
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  {getSeverityBadge(al.severity)}
                  <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider">
                    {al.disasterType}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(al.issuedAt).toLocaleString()}
                  </span>
                  {al.status === 'RESOLVED' && (
                    <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono rounded">
                      RESOLVED
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{al.title}</h3>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>
                    {al.location} (Impact Radius: {al.affectedRadiusKm} km)
                  </span>
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">{al.summary}</p>

                {al.officialSource && (
                  <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 pt-1">
                    <Volume2 className="w-3 h-3 text-slate-500" />
                    Source: {al.officialSource}
                  </p>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {al.status === 'ACTIVE' ? (
                  <button
                    disabled={resolvingId === al.id}
                    onClick={() => handleResolveAlert(al.id)}
                    className="px-4 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{resolvingId === al.id ? 'Resolving...' : 'Resolve Alert'}</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Hazard Cleared</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Broadcast Alert Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1322] border border-red-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h2 className="text-base font-bold">Issue Disaster Warning Broadcast</h2>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createError && (
              <div className="mb-4 p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Disaster Classification</label>
                  <select
                    value={formDisasterType}
                    onChange={(e: any) => setFormDisasterType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                  >
                    <option value="FLOOD">Flood & Water-Logging</option>
                    <option value="CYCLONE">Cyclone & High Wind</option>
                    <option value="EARTHQUAKE">Earthquake & Seismic</option>
                    <option value="LANDSLIDE">Landslide & Hill Slide</option>
                    <option value="FIRE">Industrial & Urban Fire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Severity Level</label>
                  <select
                    value={formSeverity}
                    onChange={(e: any) => setFormSeverity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                  >
                    <option value="CRITICAL">CRITICAL (Immediate Danger / Evacuate)</option>
                    <option value="HIGH_RISK">HIGH RISK (Severe Threat)</option>
                    <option value="MODERATE">MODERATE (Watch & Prepare)</option>
                    <option value="SAFE">SAFE / ADVISORY (Low Threat)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 uppercase">Alert Headline Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. FLASH FLOOD WARNING: Sabarmati River Rising Rapidly"
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Target Location / Area</label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Paldi, Vasna & Riverfront"
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Latitude / Longitude</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="any"
                      required
                      value={formLat}
                      onChange={(e) => setFormLat(e.target.value)}
                      placeholder="Lat"
                      className="w-1/2 px-2 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                    <input
                      type="number"
                      step="any"
                      required
                      value={formLng}
                      onChange={(e) => setFormLng(e.target.value)}
                      placeholder="Lng"
                      className="w-1/2 px-2 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Affected Radius (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formRadius}
                    onChange={(e) => setFormRadius(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 uppercase">Emergency Summary & Situation</label>
                <textarea
                  required
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Describe the current hazard escalation and urgency level..."
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-400 font-mono mb-1 uppercase">Required Actions (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formActions}
                    onChange={(e) => setFormActions(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-mono mb-1 uppercase">Items to Avoid (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formAvoid}
                    onChange={(e) => setFormAvoid(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 uppercase">Issuing Official Authority</label>
                <input
                  type="text"
                  value={formSource}
                  onChange={(e) => setFormSource(e.target.value)}
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/40 transition disabled:opacity-50"
                >
                  {creating ? 'Broadcasting Alert...' : 'Broadcast Immediate Warning'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
