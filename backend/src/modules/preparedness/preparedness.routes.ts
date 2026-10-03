import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorization.js';
import { validate } from '../../middleware/validate.js';
import { PreparednessController } from './preparedness.controller.js';
import {
  updateProgressSchema,
  createTemplateSchema,
  templateIdParamSchema,
} from './preparedness.schema.js';

const router = Router();

// Public / Semi-public checklist view
router.get('/', (req, res, next) => {
  // Optional auth
  if (req.headers.authorization) {
    return authenticate(req, res, () => PreparednessController.getChecklist(req, res, next));
  }
  return PreparednessController.getChecklist(req, res, next);
});

// Authenticated user progress
router.get('/progress', authenticate, PreparednessController.getProgress);
router.patch(
  '/:templateId',
  authenticate,
  validate(updateProgressSchema),
  PreparednessController.updateProgress
);

// Admin template management
router.post(
  '/templates',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createTemplateSchema),
  PreparednessController.createTemplate
);

router.delete(
  '/templates/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(templateIdParamSchema),
  PreparednessController.deleteTemplate
);

export default router;
