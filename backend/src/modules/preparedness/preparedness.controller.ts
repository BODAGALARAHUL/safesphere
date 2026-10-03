import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { PreparednessService } from './preparedness.service.js';
import { CreateTemplateInput, UpdateProgressInput } from './preparedness.schema.js';

export class PreparednessController {
  static async getChecklist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const items = await PreparednessService.getChecklistWithUserProgress(req.user?.userId);
      sendSuccess(res, items, 'Preparedness checklist retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await PreparednessService.getUserProgressSummary(req.user!.userId);
      sendSuccess(res, summary, 'Preparedness progress retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async updateProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const progress = await PreparednessService.updateProgress(
        req.user!.userId,
        req.params.templateId as string,
        req.body as UpdateProgressInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, progress, 'Preparedness item updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async createTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const template = await PreparednessService.createTemplate(
        req.body as CreateTemplateInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, template, 'Template created', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await PreparednessService.deleteTemplate(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Template deleted', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
