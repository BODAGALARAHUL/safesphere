import { z } from 'zod';
import { UserRole, UserStatus } from '@prisma/client';

export const updateUserRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
  body: z.object({
    role: z.nativeEnum(UserRole),
  }),
});

export const updateUserStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
  body: z.object({
    status: z.nativeEnum(UserStatus),
    reason: z.string().trim().max(300).optional(),
  }),
});

export const listUsersQuerySchema = z.object({
  query: z.object({
    role: z.nativeEnum(UserRole).optional(),
    status: z.nativeEnum(UserStatus).optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const listAuditLogsQuerySchema = z.object({
  query: z.object({
    userId: z.string().uuid().optional(),
    action: z.string().optional(),
    resourceType: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>['body'];
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>['body'];
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>['query'];
export type ListAuditLogsQuery = z.infer<typeof listAuditLogsQuerySchema>['query'];
