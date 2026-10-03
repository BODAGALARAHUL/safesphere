import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { AlertService } from './alert.service.js';
import { CreateAlertInput, UpdateAlertInput, ListAlertsQuery } from './alert.schema.js';

export class AlertController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await AlertService.listAlerts(req.query as ListAlertsQuery);
      sendSuccess(res, paginated.items, 'Disaster alerts retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getActive(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activeAlerts = await AlertService.getActiveAlerts();
      sendSuccess(res, activeAlerts, 'Active disaster alerts retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alert = await AlertService.getAlertById(req.params.id as string);
      sendSuccess(res, alert, 'Disaster alert details retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alert = await AlertService.createAlert(
        req.body as CreateAlertInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, alert, 'Disaster alert published', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alert = await AlertService.updateAlert(
        req.params.id as string,
        req.body as UpdateAlertInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, alert, 'Disaster alert updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async resolve(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alert = await AlertService.resolveAlert(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, alert, 'Disaster alert resolved successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AlertService.deleteAlert(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Disaster alert deleted', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
