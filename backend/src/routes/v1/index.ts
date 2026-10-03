import { Router } from 'express';
import healthRouter from './health.js';
import authRouter from '../../modules/auth/auth.routes.js';
import userRouter from '../../modules/users/user.routes.js';
import profileRouter from '../../modules/users/profile.routes.js';
import emergencyContactRouter from '../../modules/emergency-contacts/emergency-contact.routes.js';
import disasterRouter from '../../modules/disasters/disaster.routes.js';
import alertRouter from '../../modules/alerts/alert.routes.js';
import guidanceRouter from '../../modules/guidance/guidance.routes.js';
import safeZoneRouter from '../../modules/safe-zones/safe-zone.routes.js';
import emergencyEventRouter from '../../modules/emergency-events/emergency-event.routes.js';
import assistanceRouter from '../../modules/assistance/assistance.routes.js';
import preparednessRouter from '../../modules/preparedness/preparedness.routes.js';
import notificationRouter from '../../modules/notifications/notification.routes.js';
import adminRouter from '../../modules/admin/admin.routes.js';

const router = Router();

// System health & diagnostics
router.use('/health', healthRouter);
router.get('/ready', async (_req, res) => {
  const isDbConnected = await (await import('../../database/prisma.js')).checkDatabaseConnection();
  if (!isDbConnected) {
    res.status(503).json({
      success: false,
      message: 'Service unavailable: Database probe failed',
      status: 'unready',
    });
    return;
  }
  const { sendSuccess } = await import('../../utils/response.js');
  sendSuccess(res, { status: 'ready', database: 'connected' }, 'SafeSphere API is ready');
});

// Authentication & Session
router.use('/auth', authRouter);

// Users & Profile
router.use('/users', userRouter);
router.use('/profile', profileRouter);

// Citizen Emergency Contacts
router.use('/emergency-contacts', emergencyContactRouter);

// Disasters & Catalog
router.use('/disasters', disasterRouter);

// Broadcast Alerts
router.use('/alerts', alertRouter);

// Survival Guidance
router.use('/guidance', guidanceRouter);

// Safe Zones & Shelter Points
router.use('/safe-zones', safeZoneRouter);

// Safety-Critical SOS & Operations
router.use('/emergency-events', emergencyEventRouter);

// Special Assistance & Evacuation Requests
router.use('/assistance-requests', assistanceRouter);

// Preparedness Checklists
router.use('/preparedness', preparednessRouter);

// In-App Notifications
router.use('/notifications', notificationRouter);

// Administrative Controls & RBAC
router.use('/admin', adminRouter);

export default router;
