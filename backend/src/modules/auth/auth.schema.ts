import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100),
    email: z.string().trim().email('Invalid email address format').toLowerCase().optional(),
    phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format (E.164 standard)').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    preferredLanguage: z.enum(['en', 'hi', 'gu', 'mr', 'te']).default('en'),
    location: z.string().trim().max(200).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  }).refine((data) => data.email || data.phone, {
    message: 'Either email or phone number must be provided for registration',
    path: ['email'],
  }),
});

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().trim().min(3, 'Email or phone number is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().trim().min(20, 'Valid refresh token is required'),
  }),
});

export const logoutSchema = z.object({
  body: z.object({
    refreshToken: z.string().trim().optional(),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshInput = z.infer<typeof refreshSchema>['body'];
export type LogoutInput = z.infer<typeof logoutSchema>['body'];
