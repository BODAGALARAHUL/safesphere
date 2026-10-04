export type PreparednessCategory =
  | 'Water & Food'
  | 'Medical & Safety'
  | 'Tools & Light'
  | 'Documents & Cash';

export interface PreparednessItem {
  id: string;
  title: string;
  category: PreparednessCategory;
  description: string;
  iconName: string;
  defaultChecked?: boolean;
  translations?: Partial<Record<string, {
    title?: string;
    description?: string;
  }>>;
}

export interface PreparednessProgress {
  completedCount: number;
  totalCount: number;
  percentage: number;
  checkedItems: Record<string, boolean>;
}
