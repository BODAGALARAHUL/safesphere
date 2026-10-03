import { prisma } from '../../database/prisma.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js';
import { ListNotificationsQuery } from './notification.schema.js';

export class NotificationService {
  static async getUserNotifications(userId: string, query: ListNotificationsQuery) {
    const { page, limit, skip, take } = parsePagination(query, 20, 100);

    const isUnread = query.unreadOnly === 'true';

    const where: Record<string, unknown> = {
      recipientId: userId,
      ...(isUnread ? { isRead: false } : {}),
    };

    const [items, totalItems, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: where as any,
        skip,
        take,
        orderBy: [{ createdAt: 'desc' }],
      }),
      prisma.notification.count({ where: where as any }),
      prisma.notification.count({
        where: { recipientId: userId, isRead: false },
      }),
    ]);

    const paginated = buildPaginatedResult(items, totalItems, page, limit);

    return {
      ...paginated,
      unreadCount,
    };
  }

  static async markAsRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    if (notification.recipientId !== userId) {
      throw new ForbiddenError('Access to this notification is forbidden');
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  static async markAllAsRead(userId: string) {
    const result = await prisma.notification.updateMany({
      where: {
        recipientId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { count: result.count };
  }
}
