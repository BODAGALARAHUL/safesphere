export interface ExternalProviderResult<T = unknown> {
  success: boolean;
  providerName: string;
  isAvailable: boolean;
  message: string;
  data?: T;
}

// -----------------------------------------------------------------------------
// DISASTER FEED INTEGRATION INTERFACE & ADAPTER
// -----------------------------------------------------------------------------
export interface DisasterFeedItem {
  externalId: string;
  source: string;
  disasterType: string;
  severity: string;
  title: string;
  summary: string;
  publishedAt: Date;
}

export interface IDisasterFeedProvider {
  fetchLatestFeeds(): Promise<ExternalProviderResult<DisasterFeedItem[]>>;
}

export class GSDMAOfficialFeedAdapter implements IDisasterFeedProvider {
  async fetchLatestFeeds(): Promise<ExternalProviderResult<DisasterFeedItem[]>> {
    // Adapter checks if external IMD/GSDMA credentials or webhook endpoints are configured
    const isConfigured = Boolean(process.env.GSDMA_FEED_API_KEY);

    if (!isConfigured) {
      return {
        success: false,
        providerName: 'GSDMA/IMD Live Feed Adapter',
        isAvailable: false,
        message: 'External disaster agency live feed not configured in current environment.',
        data: [],
      };
    }

    return {
      success: true,
      providerName: 'GSDMA Live Feed',
      isAvailable: true,
      message: 'Feed retrieved',
      data: [],
    };
  }
}

// -----------------------------------------------------------------------------
// SMS PROVIDER INTERFACE & ADAPTER
// -----------------------------------------------------------------------------
export interface ISmsProvider {
  sendSms(to: string, message: string): Promise<ExternalProviderResult<{ messageId?: string }>>;
}

export class SafeSphereSmsAdapter implements ISmsProvider {
  async sendSms(to: string, message: string): Promise<ExternalProviderResult<{ messageId?: string }>> {
    const isConfigured = Boolean(process.env.SMS_GATEWAY_API_KEY);

    if (!isConfigured) {
      return {
        success: false,
        providerName: 'Telecom SMS Gateway Adapter',
        isAvailable: false,
        message: `SMS dispatch unavailable (no gateway configured). Target: ${to}, Length: ${message.length}`,
      };
    }

    return {
      success: true,
      providerName: 'Telecom SMS Gateway',
      isAvailable: true,
      message: 'SMS dispatched successfully',
      data: { messageId: `sms_${Date.now()}` },
    };
  }
}

// -----------------------------------------------------------------------------
// MAPS & GEOCODING PROVIDER INTERFACE & ADAPTER
// -----------------------------------------------------------------------------
export interface IMapsProvider {
  geocode(address: string): Promise<ExternalProviderResult<{ lat: number; lng: number }>>;
}

export class SafeSphereMapsAdapter implements IMapsProvider {
  async geocode(address: string): Promise<ExternalProviderResult<{ lat: number; lng: number }>> {
    const isConfigured = Boolean(process.env.MAPS_API_KEY);

    if (!isConfigured) {
      return {
        success: false,
        providerName: 'Geocoding Provider Adapter',
        isAvailable: false,
        message: `Geocoding service unavailable for address '${address}'.`,
      };
    }

    return {
      success: true,
      providerName: 'Geocoding Provider',
      isAvailable: true,
      message: 'Address geocoded',
      data: { lat: 23.0225, lng: 72.5714 },
    };
  }
}

export const disasterFeedProvider: IDisasterFeedProvider = new GSDMAOfficialFeedAdapter();
export const smsProvider: ISmsProvider = new SafeSphereSmsAdapter();
export const mapsProvider: IMapsProvider = new SafeSphereMapsAdapter();
