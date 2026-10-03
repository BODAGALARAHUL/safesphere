import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { DisasterController } from './disaster.controller.js';
import {
  createDisasterSchema,
  updateDisasterSchema,
  disasterIdParamSchema,
} from './disaster.schema.js';

const router = Router();

// Public routes
router.get('/', DisasterController.list);
router.get('/:id', validate(disasterIdParamSchema), DisasterController.getById);

// Restricted operator/admin routes
router.post(
  '/',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(createDisasterSchema),
  DisasterController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateDisasterSchema),
  DisasterController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(disasterIdParamSchema),
  DisasterController.delete
);

export default router;
