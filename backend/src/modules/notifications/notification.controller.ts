import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { NotificationService } from './notification.service.js';
import { ListNotificationsQuery } from './notification.schema.js';

export class NotificationController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await NotificationService.getUserNotifications(
        req.user!.userId,
        req.query as ListNotificationsQuery
      );
      sendSuccess(res, result.items, 'Notifications retrieved', HTTP_STATUS.OK, {
        pagination: result.pagination,
        unreadCount: result.unreadCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async markRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notification = await NotificationService.markAsRead(
        req.user!.userId,
        req.params.id as string
      );
      sendSuccess(res, notification, 'Notification marked as read', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async markAllRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await NotificationService.markAllAsRead(req.user!.userId);
      sendSuccess(res, result, 'All notifications marked as read', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
