import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { EmergencyEventService } from './emergency-event.service.js';
import {
  CreateEmergencyEventInput,
  UpdateEmergencyStatusInput,
  ListEmergencyEventsQuery,
} from './emergency-event.schema.js';

export class EmergencyEventController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EmergencyEventService.createEmergencyEvent(
        req.user!.userId,
        req.body as CreateEmergencyEventInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(
        res,
        event,
        'SOS emergency signal recorded successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EmergencyEventService.getEmergencyEventById(
        req.params.id as string,
        req.user!.userId,
        req.user!.role
      );
      sendSuccess(res, event, 'Emergency event retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cancelled = await EmergencyEventService.cancelEmergencyEvent(
        req.params.id as string,
        req.user!.userId,
        req.user!.role,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, cancelled, 'Emergency event cancelled', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await EmergencyEventService.listAllEmergencyEvents(
        req.query as ListEmergencyEventsQuery
      );
      sendSuccess(res, paginated.items, 'Emergency operations feed retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await EmergencyEventService.updateEventStatus(
        req.params.id as string,
        req.body as UpdateEmergencyStatusInput,
        req.user!.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, updated, 'Emergency status updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
