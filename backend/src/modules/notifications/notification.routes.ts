import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { NotificationController } from './notification.controller.js';
import {
  listNotificationsQuerySchema,
  notificationIdParamSchema,
} from './notification.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', validate(listNotificationsQuerySchema), NotificationController.list);
router.post('/:id/read', validate(notificationIdParamSchema), NotificationController.markRead);
router.post('/read-all', NotificationController.markAllRead);

export default router;
