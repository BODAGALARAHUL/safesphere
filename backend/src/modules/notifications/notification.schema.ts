import { z } from 'zod';

export const listNotificationsQuerySchema = z.object({
  query: z.object({
    unreadOnly: z.enum(['true', 'false']).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid notification ID format'),
  }),
});

export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>['query'];
