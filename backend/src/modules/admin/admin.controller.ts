import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { AdminService } from './admin.service.js';
import {
  ListUsersQuery,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
  ListAuditLogsQuery,
} from './admin.schema.js';

export class AdminController {
  static async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await AdminService.listUsers(req.query as ListUsersQuery);
      sendSuccess(res, paginated.items, 'Users retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await AdminService.getUserById(req.params.id as string);
      sendSuccess(res, user, 'User details retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await AdminService.updateUserRole(
        req.params.id as string,
        req.body as UpdateUserRoleInput,
        req.user!.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, updated, 'User role updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await AdminService.updateUserStatus(
        req.params.id as string,
        req.body as UpdateUserStatusInput,
        req.user!.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, updated, 'User status updated', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async listAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await AdminService.listAuditLogs(req.query as ListAuditLogsQuery);
      sendSuccess(res, paginated.items, 'Audit logs retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSystemStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await AdminService.getSystemStats();
      sendSuccess(res, stats, 'System operational stats retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
