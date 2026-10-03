import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { EmergencyEventController } from './emergency-event.controller.js';
import {
  createEmergencyEventSchema,
  updateEmergencyStatusSchema,
  listEmergencyEventsQuerySchema,
  emergencyEventIdParamSchema,
} from './emergency-event.schema.js';

const router = Router();

router.use(authenticate);

// Citizen & operational trigger
router.post('/', validate(createEmergencyEventSchema), EmergencyEventController.create);
router.get('/:id', validate(emergencyEventIdParamSchema), EmergencyEventController.getById);
router.post('/:id/cancel', validate(emergencyEventIdParamSchema), EmergencyEventController.cancel);

// Operator / Admin feed & status updates
router.get(
  '/',
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(listEmergencyEventsQuerySchema),
  EmergencyEventController.listAll
);

router.patch(
  '/:id/status',
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateEmergencyStatusSchema),
  EmergencyEventController.updateStatus
);

export default router;
