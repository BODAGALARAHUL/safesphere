import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Invalid email address format').toLowerCase().optional(),
    phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format').optional(),
    preferredLanguage: z.enum(['en', 'hi', 'gu', 'mr', 'te']).optional(),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
    dateOfBirth: z.string().datetime().optional().nullable(),
    preferredLanguage: z.enum(['en', 'hi', 'gu', 'mr', 'te']).optional(),
    location: z.string().trim().max(200).optional().nullable(),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    accessibilityNeeds: z.string().max(500).optional().nullable(),
    medicalNotes: z.string().max(1000).optional().nullable(),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];
