import { Request, Response, NextFunction } from 'express';
import { DisasterType } from '@prisma/client';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { GuidanceService } from './guidance.service.js';
import { CreateGuidanceInput, UpdateGuidanceInput } from './guidance.schema.js';

export class GuidanceController {
  static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const guides = await GuidanceService.listGuidance();
      sendSuccess(res, guides, 'Disaster guidance catalog retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getByType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const disasterType = (req.params.disasterType as string).toUpperCase() as DisasterType;
      const guide = await GuidanceService.getGuidanceByType(disasterType);
      sendSuccess(res, guide, 'Disaster guide retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const guide = await GuidanceService.createGuidance(
        req.body as CreateGuidanceInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, guide, 'Disaster guide created', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const guide = await GuidanceService.updateGuidance(
        req.params.id as string,
        req.body as UpdateGuidanceInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, guide, 'Disaster guide updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await GuidanceService.deleteGuidance(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Disaster guide deleted', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
