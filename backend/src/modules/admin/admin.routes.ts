import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { AdminController } from './admin.controller.js';
import {
  listUsersQuerySchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
  listAuditLogsQuerySchema,
  userIdParamSchema,
} from './admin.schema.js';

const router = Router();

router.use(authenticate);

router.get('/system-stats', authorize(UserRole.ADMIN, UserRole.DISASTER_OPERATOR), AdminController.getSystemStats);

// The following routes require full ADMIN role
router.use(authorize(UserRole.ADMIN));

router.get('/users', validate(listUsersQuerySchema), AdminController.listUsers);
router.get('/users/:id', validate(userIdParamSchema), AdminController.getUserById);
router.patch('/users/:id/role', validate(updateUserRoleSchema), AdminController.updateUserRole);
router.patch('/users/:id/status', validate(updateUserStatusSchema), AdminController.updateUserStatus);
router.get('/audit-logs', validate(listAuditLogsQuerySchema), AdminController.listAuditLogs);

export default router;
