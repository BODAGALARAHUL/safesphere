'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SafeZone } from '@/data/safeZonesData';

const createCustomIcon = (type: SafeZone['type'], status?: string) => {
  let color = '#10b981'; 
  if (type === 'Hospital') color = '#3b82f6'; 
  if (type === 'Fire') color = '#f97316'; 
  if (type === 'Police') color = '#6366f1'; 

  if (status && status.includes('High Demand')) color = '#eab308';
  if (status && status.includes('Full')) color = '#ef4444';

  const svgMarker = `
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27.5 16 38 16 38C16 38 32 27.5 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
      <circle cx="16" cy="15" r="7" fill="#070b14"/>
      <circle cx="16" cy="15" r="4" fill="white"/>
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
      <div className="w-5 h-5 bg-emerald-400 border-2 border-[#070b14] rounded-full shadow-lg"></div>
      <div className="absolute -inset-1 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
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
  
  const userLocation = { lat: 23.0125, lng: 72.5642 };
  const centerLat = selectedZone ? selectedZone.lat : userLocation.lat;
  const centerLng = selectedZone ? selectedZone.lng : userLocation.lng;

  return (
    <div className="h-full w-full min-h-0 relative">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full min-h-0 rounded-2xl z-10"
        style={{ height: '100%', width: '100%' }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap lat={centerLat} lng={centerLng} />

      
      <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
        <Popup>
          <div className="font-bold text-xs text-[#070a0f]">Your Location: Ahmedabad · Paldi</div>
        </Popup>
      </Marker>

      
      {safeZones.map(zone => (
        <Marker
          key={zone.id}
          position={[zone.lat, zone.lng]}
          icon={createCustomIcon(zone.type, zone.status)}
          eventHandlers={{
            click: () => onSelectZone(zone),
          }}
        >
          <Popup>
            <div className="p-1 space-y-1 text-[#070a0f]">
              <div className="font-bold text-sm text-[#070a0f]">{zone.name}</div>
              <div className="text-xs text-[#4a5568] font-medium">{zone.type} · {zone.distanceKm} km away</div>
              <div className="text-[11px] text-[#16c784] font-bold">{zone.capacityBeds}</div>
              <a
                href={zone.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center px-3 py-1.5 bg-[#070a0f] hover:bg-[#18212d] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
    </div>
  );
}
