import { z } from 'zod';
import { DisasterType } from '@prisma/client';

const actionStepSchema = z.object({
  text: z.string().trim().min(1, 'Action step text is required'),
  urgent: z.boolean().optional(),
});

export const createGuidanceSchema = z.object({
  body: z.object({
    disasterId: z.string().uuid().optional().nullable(),
    disasterType: z.nativeEnum(DisasterType),
    title: z.string().trim().min(3).max(150),
    summary: z.string().trim().min(10).max(1000),
    severityRisk: z.string().trim().min(2).max(100),
    iconName: z.string().trim().min(1).max(50),
    beforeSteps: z.array(actionStepSchema).min(1, 'At least one BEFORE step is required'),
    duringSteps: z.array(actionStepSchema).min(1, 'At least one DURING step is required'),
    afterSteps: z.array(actionStepSchema).min(1, 'At least one AFTER step is required'),
    avoidItems: z.array(z.string().trim()).default([]),
    translations: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const updateGuidanceSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid guidance ID format'),
  }),
  body: z.object({
    title: z.string().trim().min(3).max(150).optional(),
    summary: z.string().trim().min(10).max(1000).optional(),
    severityRisk: z.string().trim().min(2).max(100).optional(),
    iconName: z.string().trim().min(1).max(50).optional(),
    beforeSteps: z.array(actionStepSchema).optional(),
    duringSteps: z.array(actionStepSchema).optional(),
    afterSteps: z.array(actionStepSchema).optional(),
    avoidItems: z.array(z.string().trim()).optional(),
    translations: z.record(z.string(), z.any()).optional().nullable(),
  }),
});

export const guidanceTypeParamSchema = z.object({
  params: z.object({
    disasterType: z.nativeEnum(DisasterType),
  }),
});

export const guidanceIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid guidance ID format'),
  }),
});

export type CreateGuidanceInput = z.infer<typeof createGuidanceSchema>['body'];
export type UpdateGuidanceInput = z.infer<typeof updateGuidanceSchema>['body'];
