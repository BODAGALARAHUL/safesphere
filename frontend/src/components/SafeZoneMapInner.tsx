'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SafeZone } from '@/data/safeZonesData';

// Fix Leaflet default icon paths in Next.js
const createCustomIcon = (type: SafeZone['type']) => {
  let color = '#16a34a'; // Shelter Green
  if (type === 'Hospital') color = '#dc2626'; // Hospital Red
  if (type === 'Fire') color = '#d97706'; // Fire Amber
  if (type === 'Police') color = '#2563eb'; // Police Blue

  const svgMarker = `
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27.5 16 38 16 38C16 38 32 27.5 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
      <circle cx="16" cy="15" r="7" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgMarker,
    className: 'custom-leaflet-marker',
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    popupAnchor: [0, -34],
  });
};

const UserIcon = L.divIcon({
  html: `
    <div className="relative">
      <div className="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg"></div>
      <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
    </div>
  `,
  className: 'user-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

interface SafeZoneMapInnerProps {
  safeZones: SafeZone[];
  selectedZone?: SafeZone;
  onSelectZone: (zone: SafeZone) => void;
}

export default function SafeZoneMapInner({ safeZones, selectedZone, onSelectZone }: SafeZoneMapInnerProps) {
  // Default centered on Ahmedabad Paldi coordinates
  const userLocation = { lat: 23.0125, lng: 72.5642 };
  const centerLat = selectedZone ? selectedZone.lat : userLocation.lat;
  const centerLng = selectedZone ? selectedZone.lng : userLocation.lng;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-2xl z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap lat={centerLat} lng={centerLng} />

      {/* User Location Marker */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
        <Popup>
          <div className="font-bold text-xs">Your Current Location</div>
        </Popup>
      </Marker>

      {/* Safe Zone Markers */}
      {safeZones.map(zone => (
        <Marker
          key={zone.id}
          position={[zone.lat, zone.lng]}
          icon={createCustomIcon(zone.type)}
          eventHandlers={{
            click: () => onSelectZone(zone),
          }}
        >
          <Popup>
            <div className="p-1">
              <div className="font-bold text-sm text-slate-900">{zone.name}</div>
              <div className="text-xs text-slate-600 font-medium">{zone.type} · {zone.distanceKm} km away</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">{zone.status}</div>
              <a
                href={zone.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded"
              >
                Open Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
