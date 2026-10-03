import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { GuidanceController } from './guidance.controller.js';
import {
  createGuidanceSchema,
  updateGuidanceSchema,
  guidanceTypeParamSchema,
  guidanceIdParamSchema,
} from './guidance.schema.js';

const router = Router();

// Public routes
router.get('/', GuidanceController.list);
router.get('/:disasterType', validate(guidanceTypeParamSchema), GuidanceController.getByType);

// Restricted operator/admin routes
router.post(
  '/',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(createGuidanceSchema),
  GuidanceController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateGuidanceSchema),
  GuidanceController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(guidanceIdParamSchema),
  GuidanceController.delete
);

export default router;
