import request from 'supertest';
import { createApp } from '../src/app.js';
import { prisma } from '../src/database/prisma.js';

export const app = createApp();

export const cleanDatabase = async () => {
  try {
    await prisma.notification.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.userPreparednessProgress.deleteMany();
    await prisma.assistanceRequest.deleteMany();
    await prisma.emergencyEvent.deleteMany();
    await prisma.emergencyContact.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
  } catch {
    // Database might not be connected in isolated unit runs
  }
};
