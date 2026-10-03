import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { EmergencyContactController } from './emergency-contact.controller.js';
import {
  createEmergencyContactSchema,
  updateEmergencyContactSchema,
  contactIdParamSchema,
} from './emergency-contact.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', EmergencyContactController.list);
router.post('/', validate(createEmergencyContactSchema), EmergencyContactController.create);
router.get('/:id', validate(contactIdParamSchema), EmergencyContactController.getById);
router.patch('/:id', validate(updateEmergencyContactSchema), EmergencyContactController.update);
router.delete('/:id', validate(contactIdParamSchema), EmergencyContactController.delete);

export default router;
