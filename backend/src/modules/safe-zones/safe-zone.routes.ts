import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { SafeZoneController } from './safe-zone.controller.js';
import {
  createSafeZoneSchema,
  updateSafeZoneSchema,
  listSafeZonesQuerySchema,
  safeZoneIdParamSchema,
} from './safe-zone.schema.js';

const router = Router();

// Public routes
router.get('/', validate(listSafeZonesQuerySchema), SafeZoneController.list);
router.get('/:id', validate(safeZoneIdParamSchema), SafeZoneController.getById);

// Restricted operator/admin endpoints
router.post(
  '/',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(createSafeZoneSchema),
  SafeZoneController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateSafeZoneSchema),
  SafeZoneController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(safeZoneIdParamSchema),
  SafeZoneController.delete
);

export default router;
