export type LocationSource = 'gps' | 'selected' | 'demo';

export type GeolocationPermissionState =
  | 'prompt'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'unsupported';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface SectorOption {
  id: string;
  name: string;
  city: string;
  district: string;
  coordinates: LocationCoordinates;
  description?: string;
  isDefault?: boolean;
}

export interface UserLocationState {
  coordinates: LocationCoordinates;
  sectorName: string;
  source: LocationSource;
  permissionState: GeolocationPermissionState;
  isLoading: boolean;
  errorMessage?: string;
}
