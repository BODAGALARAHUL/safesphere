import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { UserController } from './user.controller.js';
import { updateProfileSchema } from './user.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', UserController.getProfile);
router.patch('/', validate(updateProfileSchema), UserController.updateProfile);

export default router;
