import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthService } from './auth.service.js';
import { RegisterInput, LoginInput, RefreshInput, LogoutInput } from './auth.schema.js';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.register(
        req.body as RegisterInput,
        req.ip,
        req.headers['user-agent']
      );

      sendSuccess(
        res,
        result,
        'Citizen account registered successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(
        req.body as LoginInput,
        req.ip,
        req.headers['user-agent']
      );

      sendSuccess(res, result, 'Login successful', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body as RefreshInput;
      const tokens = await AuthService.refreshToken(
        refreshToken,
        req.ip,
        req.headers['user-agent']
      );

      sendSuccess(res, tokens, 'Token refreshed successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = (req.body || {}) as LogoutInput;
      if (req.user) {
        await AuthService.logout(
          req.user.userId,
          refreshToken,
          req.ip,
          req.headers['user-agent']
        );
      }

      sendSuccess(res, null, 'Logged out successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const me = await AuthService.getMe(req.user!.userId);
      sendSuccess(res, me, 'Current user profile retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
