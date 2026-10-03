'use client';

import React, { useEffect, useState } from 'react';
import {
  Building,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Phone,
  Clock,
  AlertTriangle,
  X,
  MapPin,
} from 'lucide-react';
import { SafeZonesApi } from '../../lib/api/safe-zones';
import { SafeZoneItem, CreateSafeZoneData } from '../../types/safe-zones';

export default function SafeZonesPage() {
  const [safeZones, setSafeZones] = useState<SafeZoneItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals & Form
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<'SHELTER' | 'HOSPITAL' | 'POLICE' | 'FIRE' | 'EMERGENCY_CENTER'>('SHELTER');
  const [formStatus, setFormStatus] = useState<'AVAILABLE' | 'HIGH_DEMAND' | 'FULL' | 'CLOSED'>('AVAILABLE');
  const [formAddress, setFormAddress] = useState('');
  const [formArea, setFormArea] = useState('');
  const [formLat, setFormLat] = useState('23.0225');
  const [formLng, setFormLng] = useState('72.5714');
  const [formCapacity, setFormCapacity] = useState('500');
  const [formOccupancy, setFormOccupancy] = useState('0');
  const [formPhone, setFormPhone] = useState('+91 79 2755 0000');
  const [formHours, setFormHours] = useState('24x7 Emergency Services');
  const [formFacilities, setFormFacilities] = useState('Emergency Beds, Medical Staff, Clean Water, Backup Generator, Food Supply');

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchSafeZones = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await SafeZonesApi.getSafeZones({
        type: typeFilter || undefined,
        status: statusFilter || undefined,
      });
      setSafeZones(res.data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve safe zones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSafeZones();
  }, [typeFilter, statusFilter]);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormName('');
    setFormType('SHELTER');
    setFormStatus('AVAILABLE');
    setFormAddress('');
    setFormArea('Ahmedabad');
    setFormLat('23.0225');
    setFormLng('72.5714');
    setFormCapacity('500');
    setFormOccupancy('0');
    setFormPhone('+91 79 2755 0000');
    setFormHours('24x7 Emergency Operations');
    setFormFacilities('Emergency Beds, Medical Staff, Clean Water, Power Generator');
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (zone: SafeZoneItem) => {
    setEditingId(zone.id);
    setFormName(zone.name);
    setFormType(zone.type);
    setFormStatus(zone.status);
    setFormAddress(zone.address);
    setFormArea(zone.area);
    setFormLat(zone.latitude.toString());
    setFormLng(zone.longitude.toString());
    setFormCapacity(zone.capacity?.toString() || '0');
    setFormOccupancy(zone.currentOccupancy?.toString() || '0');
    setFormPhone(zone.contactNumber || '');
    setFormHours(zone.operatingHours || '');
    setFormFacilities(zone.facilities ? zone.facilities.join(', ') : '');
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      const facilitiesList = formFacilities
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: CreateSafeZoneData = {
        name: formName.trim(),
        type: formType,
        status: formStatus,
        address: formAddress.trim(),
        area: formArea.trim(),
        latitude: parseFloat(formLat),
        longitude: parseFloat(formLng),
        capacity: formCapacity ? parseInt(formCapacity, 10) : undefined,
        currentOccupancy: formOccupancy ? parseInt(formOccupancy, 10) : undefined,
        contactNumber: formPhone.trim() || undefined,
        operatingHours: formHours.trim() || undefined,
        facilities: facilitiesList,
      };

      if (editingId) {
        await SafeZonesApi.updateSafeZone(editingId, payload);
      } else {
        await SafeZonesApi.createSafeZone(payload);
      }

      setModalOpen(false);
      fetchSafeZones();
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save safe zone.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove safe zone "${name}"?`)) return;
    try {
      await SafeZonesApi.deleteSafeZone(id);
      fetchSafeZones();
    } catch (err: any) {
      alert(err?.message || 'Failed to delete safe zone.');
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'AVAILABLE':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            AVAILABLE
          </span>
        );
      case 'HIGH_DEMAND':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/60 border border-amber-500/40 text-amber-300">
            HIGH DEMAND
          </span>
        );
      case 'FULL':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/60 border border-red-500/40 text-red-300">
            AT CAPACITY (FULL)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-400">
            CLOSED
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
            <Building className="w-6 h-6 text-emerald-400" />
            <span>Safe Zones & Evacuation Shelters</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Register and manage safe zones, capacity levels, and medical stations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSafeZones}
            disabled={loading}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Safe Zone</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#091222] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['', 'SHELTER', 'HOSPITAL', 'POLICE', 'FIRE', 'EMERGENCY_CENTER'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                typeFilter === t
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-[#050b14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {t || 'ALL TYPES'}
            </button>
          ))}
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#050b14] border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="HIGH_DEMAND">High Demand</option>
            <option value="FULL">Full</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Safe Zones Cards */}
      {error ? (
        <div className="p-8 text-center bg-[#091222] border border-red-500/40 rounded-2xl">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      ) : loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto mb-2" />
          Loading designated emergency facilities...
        </div>
      ) : safeZones.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono bg-[#091222] border border-slate-800 rounded-2xl">
          No safe zones found matching the query criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {safeZones.map((zone) => (
            <div
              key={zone.id}
              className="bg-[#091222] border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      {zone.type}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">{zone.name}</h3>
                  </div>
                  {getStatusBadge(zone.status)}
                </div>

                <p className="text-xs text-slate-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {zone.address}, {zone.area}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                  <div className="p-2 bg-[#050b14] rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Capacity</span>
                    <span className="font-bold text-white">
                      {zone.currentOccupancy || 0} / {zone.capacity || '—'}
                    </span>
                  </div>

                  <div className="p-2 bg-[#050b14] rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Coordinates</span>
                    <span className="text-[11px] text-slate-300">
                      {zone.latitude.toFixed(3)}, {zone.longitude.toFixed(3)}
                    </span>
                  </div>
                </div>

                {zone.contactNumber && (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <span>{zone.contactNumber}</span>
                  </p>
                )}

                {zone.operatingHours && (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{zone.operatingHours}</span>
                  </p>
                )}

                {zone.facilities && zone.facilities.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {zone.facilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded text-[10px] text-slate-300 font-mono"
                      >
                        {fac}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEditModal(zone)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-lg transition cursor-pointer"
                  title="Edit Safe Zone"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(zone.id, zone.name)}
                  className="p-2 bg-slate-800 hover:bg-red-950/60 text-red-400 border border-slate-700 hover:border-red-500/50 rounded-lg transition cursor-pointer"
                  title="Delete Safe Zone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1322] border border-emerald-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {editingId ? 'Edit Safe Zone Facility' : 'Register New Safe Zone / Shelter'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1 uppercase">Facility Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Paldi Community Disaster Relief Shelter"
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Facility Type</label>
                  <select
                    value={formType}
                    onChange={(e: any) => setFormType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="SHELTER">Evacuation Shelter</option>
                    <option value="HOSPITAL">Hospital / Trauma Center</option>
                    <option value="POLICE">Police Station</option>
                    <option value="FIRE">Fire & Rescue Station</option>
                    <option value="EMERGENCY_CENTER">Emergency Command Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Operational Status</label>
                  <select
                    value={formStatus}
                    onChange={(e: any) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="HIGH_DEMAND">High Demand</option>
                    <option value="FULL">At Capacity (Full)</option>
                    <option value="CLOSED">Closed / Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Near Mahalaxmi Cross Roads"
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Area / Sector</label>
                  <input
                    type="text"
                    required
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    placeholder="Paldi, Ahmedabad"
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formLat}
                    onChange={(e) => setFormLat(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formLng}
                    onChange={(e) => setFormLng(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Max Capacity</label>
                  <input
                    type="number"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Occupancy</label>
                  <input
                    type="number"
                    value={formOccupancy}
                    onChange={(e) => setFormOccupancy(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Contact Helpline</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 uppercase">Operating Hours</label>
                  <input
                    type="text"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 uppercase">
                  Available Facilities (comma separated)
                </label>
                <input
                  type="text"
                  value={formFacilities}
                  onChange={(e) => setFormFacilities(e.target.value)}
                  className="w-full px-3 py-2 bg-[#060c18] border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Safe Zone' : 'Register Safe Zone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
