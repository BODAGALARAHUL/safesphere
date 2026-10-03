import { apiClient } from './apiClient';
import { PREPAREDNESS_ITEMS, PreparednessItem } from '@/data/preparednessData';

export const PreparednessService = {
  async getChecklist(): Promise<PreparednessItem[]> {
    try {
      const res = await apiClient.get<PreparednessItem[]>('/preparedness');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return PREPAREDNESS_ITEMS;
    } catch {
      return PREPAREDNESS_ITEMS;
    }
  },

  async updateItemProgress(itemId: string, isChecked: boolean): Promise<boolean> {
    try {
      await apiClient.patch(`/preparedness/${itemId}`, { isChecked });
      return true;
    } catch {
      return false;
    }
  },
};
