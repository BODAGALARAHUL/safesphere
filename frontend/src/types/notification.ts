export type NotificationType =
  | 'DISASTER_ALERT'
  | 'EMERGENCY_UPDATE'
  | 'ASSISTANCE_DISPATCH'
  | 'SYSTEM';

export type NotificationPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  priority: NotificationPriority;
  isRead: boolean;
  timestamp: string;
  relatedResourceType?: string;
  relatedResourceId?: string;
}

export type Notification = AppNotification;
