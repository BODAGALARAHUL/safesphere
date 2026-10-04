import type { DisasterGuide } from '@/types';
import { DISASTER_GUIDES, getGuideBySlug } from '@/data/guidanceData';

export const GuidanceService = {
  getAllGuidance(): DisasterGuide[] {
    return DISASTER_GUIDES;
  },

  getDisasterGuides(): DisasterGuide[] {
    return DISASTER_GUIDES;
  },

  getDisasterGuideBySlug(slug: string): DisasterGuide | undefined {
    return getGuideBySlug(slug);
  },

  getGuidanceByType(disasterType: string): DisasterGuide | undefined {
    return DISASTER_GUIDES.find(
      (g) => g.disasterType.toLowerCase() === disasterType.toLowerCase()
    );
  },
};

export const {
  getAllGuidance,
  getDisasterGuides,
  getDisasterGuideBySlug,
  getGuidanceByType,
} = GuidanceService;
