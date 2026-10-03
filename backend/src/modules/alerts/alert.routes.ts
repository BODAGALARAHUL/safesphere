import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { AlertController } from './alert.controller.js';
import {
  createAlertSchema,
  updateAlertSchema,
  listAlertsQuerySchema,
  alertIdParamSchema,
} from './alert.schema.js';

const router = Router();

// Public citizen alert feeds
router.get('/', validate(listAlertsQuerySchema), AlertController.list);
router.get('/active', AlertController.getActive);
router.get('/:id', validate(alertIdParamSchema), AlertController.getById);

// Restricted operator/admin endpoints
router.post(
  '/',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(createAlertSchema),
  AlertController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateAlertSchema),
  AlertController.update
);

router.post(
  '/:id/resolve',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(alertIdParamSchema),
  AlertController.resolve
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(alertIdParamSchema),
  AlertController.delete
);

export default router;
