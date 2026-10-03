import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import { authRateLimiter } from '../../middleware/rateLimiter.js';
import { AuthController } from './auth.controller.js';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} from './auth.schema.js';

const router = Router();

router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  AuthController.login
);

router.post(
  '/refresh',
  authRateLimiter,
  validate(refreshSchema),
  AuthController.refresh
);

router.post(
  '/logout',
  authenticate,
  validate(logoutSchema),
  AuthController.logout
);

router.get(
  '/me',
  authenticate,
  AuthController.getMe
);

export default router;
