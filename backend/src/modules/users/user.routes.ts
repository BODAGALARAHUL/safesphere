import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { UserController } from './user.controller.js';
import { updateUserSchema, updateProfileSchema } from './user.schema.js';

const router = Router();

router.use(authenticate);

// User settings endpoints
router.get('/me', UserController.getMe);
router.patch('/me', validate(updateUserSchema), UserController.updateMe);

// User profile endpoints
router.get('/profile', UserController.getProfile);
router.patch('/profile', validate(updateProfileSchema), UserController.updateProfile);

export default router;
