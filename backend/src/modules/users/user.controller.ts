import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { UserService } from './user.service.js';
import { UpdateUserInput, UpdateProfileInput } from './user.schema.js';

export class UserController {
  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.getCurrentUser(req.user!.userId);
      sendSuccess(res, user, 'Current user data retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedUser = await UserService.updateCurrentUser(
        req.user!.userId,
        req.body as UpdateUserInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, updatedUser, 'User settings updated successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await UserService.getProfile(req.user!.userId);
      sendSuccess(res, profile, 'User profile retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await UserService.updateProfile(
        req.user!.userId,
        req.body as UpdateProfileInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, profile, 'User profile updated successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
