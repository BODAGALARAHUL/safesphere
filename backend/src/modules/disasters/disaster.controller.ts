import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { DisasterService } from './disaster.service.js';
import { CreateDisasterInput, UpdateDisasterInput } from './disaster.schema.js';

export class DisasterController {
  static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const disasters = await DisasterService.listDisasters();
      sendSuccess(res, disasters, 'Disaster types retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const disaster = await DisasterService.getDisasterById(req.params.id as string);
      sendSuccess(res, disaster, 'Disaster details retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const disaster = await DisasterService.createDisaster(
        req.body as CreateDisasterInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(
        res,
        disaster,
        'Disaster classification created',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const disaster = await DisasterService.updateDisaster(
        req.params.id as string,
        req.body as UpdateDisasterInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, disaster, 'Disaster classification updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await DisasterService.deleteDisaster(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Disaster classification deleted', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
