import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { AssistanceService } from './assistance.service.js';
import {
  CreateAssistanceInput,
  UpdateAssistanceStatusInput,
  ListAssistanceQuery,
} from './assistance.schema.js';

export class AssistanceController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assistance = await AssistanceService.createRequest(
        req.user!.userId,
        req.body as CreateAssistanceInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(
        res,
        assistance,
        'Special assistance request created',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requests = await AssistanceService.getMyRequests(req.user!.userId);
      sendSuccess(res, requests, 'User assistance requests retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request = await AssistanceService.getRequestById(
        req.params.id as string,
        req.user!.userId,
        req.user!.role
      );
      sendSuccess(res, request, 'Assistance request retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cancelled = await AssistanceService.cancelRequest(
        req.params.id as string,
        req.user!.userId,
        req.user!.role,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, cancelled, 'Assistance request cancelled', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await AssistanceService.listAllRequests(
        req.query as ListAssistanceQuery
      );
      sendSuccess(res, paginated.items, 'Assistance operations feed retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await AssistanceService.updateRequestStatus(
        req.params.id as string,
        req.body as UpdateAssistanceStatusInput,
        req.user!.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, updated, 'Assistance status updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
