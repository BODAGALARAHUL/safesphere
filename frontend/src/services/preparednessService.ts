import type { PreparednessItem, PreparednessCategory } from '@/types';
import { PREPAREDNESS_ITEMS } from '@/data/preparednessData';

export const PreparednessService = {
  getPreparednessItems(): PreparednessItem[] {
    return PREPAREDNESS_ITEMS;
  },

  getChecklist(): PreparednessItem[] {
    return PREPAREDNESS_ITEMS;
  },

  getCategories(): PreparednessCategory[] {
    return [
      'Water & Food',
      'Medical & Safety',
      'Tools & Light',
      'Documents & Cash',
    ];
  },

  getItemsByCategory(category: PreparednessCategory): PreparednessItem[] {
    return PREPAREDNESS_ITEMS.filter((item) => item.category === category);
  },
};

export const {
  getPreparednessItems,
  getChecklist,
  getCategories,
  getItemsByCategory,
} = PreparednessService;
