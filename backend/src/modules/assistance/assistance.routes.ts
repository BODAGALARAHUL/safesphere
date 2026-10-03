import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { AssistanceController } from './assistance.controller.js';
import {
  createAssistanceSchema,
  updateAssistanceStatusSchema,
  listAssistanceQuerySchema,
  assistanceIdParamSchema,
} from './assistance.schema.js';

const router = Router();

router.use(authenticate);

// Citizen endpoints
router.post('/', validate(createAssistanceSchema), AssistanceController.create);
router.get('/my', AssistanceController.getMy);
router.get('/:id', validate(assistanceIdParamSchema), AssistanceController.getById);
router.post('/:id/cancel', validate(assistanceIdParamSchema), AssistanceController.cancel);

// Operator / Admin endpoints
router.get(
  '/',
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(listAssistanceQuerySchema),
  AssistanceController.listAll
);

router.patch(
  '/:id/status',
  authorize(UserRole.DISASTER_OPERATOR, UserRole.ADMIN),
  validate(updateAssistanceStatusSchema),
  AssistanceController.updateStatus
);

export default router;
