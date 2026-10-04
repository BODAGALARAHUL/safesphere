import type { DisasterAlert } from '@/types';
import { MOCK_DISASTER_ALERTS } from '@/data/disastersData';

export const AlertService = {
  getAlerts(): DisasterAlert[] {
    return MOCK_DISASTER_ALERTS;
  },

  getActiveAlerts(): DisasterAlert[] {
    return MOCK_DISASTER_ALERTS;
  },

  getAlertById(id: string): DisasterAlert | undefined {
    return MOCK_DISASTER_ALERTS.find((a) => a.id === id);
  },

  getAlertsForSector(sectorName: string): DisasterAlert[] {
    const city = sectorName.split('·')[0].trim().toLowerCase();
    const locality = (sectorName.split('·')[1] || '').trim().toLowerCase();

    return MOCK_DISASTER_ALERTS.filter((alert) => {
      const loc = alert.location.toLowerCase();
      return (
        loc.includes(city) ||
        (locality && loc.includes(locality)) ||
        (city === 'vadodara' && loc.includes('central'))
      );
    });
  },

  getPrimaryAlertForSector(sectorName: string): DisasterAlert | undefined {
    const sectorAlerts = this.getAlertsForSector(sectorName);
    if (sectorAlerts.length > 0) {
      // Prioritize critical alert first
      return (
        sectorAlerts.find((a) => a.severity === 'CRITICAL') ||
        sectorAlerts.find((a) => a.severity === 'HIGH_RISK') ||
        sectorAlerts[0]
      );
    }
    return undefined;
  },

  filterAlerts(
    alerts: DisasterAlert[],
    options: {
      severity?: string;
      disasterType?: string;
      searchQuery?: string;
      area?: string;
    }
  ): DisasterAlert[] {
    const {
      severity = 'ALL',
      disasterType = 'ALL',
      searchQuery = '',
      area = 'ALL',
    } = options;

    return alerts.filter((alert) => {
      const matchesSeverity = severity === 'ALL' || alert.severity === severity;
      const matchesType = disasterType === 'ALL' || alert.disasterType === disasterType;
      
      const matchesArea =
        area === 'ALL' ||
        area === 'All' ||
        alert.location.toLowerCase().includes(area.split('·')[0].trim().toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.disasterType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSeverity && matchesType && matchesArea && matchesSearch;
    });
  },
};

export const {
  getAlerts,
  getActiveAlerts,
  getAlertById,
  getAlertsForSector,
  getPrimaryAlertForSector,
  filterAlerts,
} = AlertService;

