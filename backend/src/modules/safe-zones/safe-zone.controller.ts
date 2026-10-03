import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { SafeZoneService } from './safe-zone.service.js';
import {
  CreateSafeZoneInput,
  UpdateSafeZoneInput,
  ListSafeZonesQuery,
} from './safe-zone.schema.js';

export class SafeZoneController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await SafeZoneService.listSafeZones(req.query as ListSafeZonesQuery);
      sendSuccess(res, paginated.items, 'Safe zones retrieved', HTTP_STATUS.OK, {
        pagination: paginated.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;

      const zone = await SafeZoneService.getSafeZoneById(req.params.id as string, lat, lng);
      sendSuccess(res, zone, 'Safe zone details retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const zone = await SafeZoneService.createSafeZone(
        req.body as CreateSafeZoneInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, zone, 'Safe zone created successfully', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const zone = await SafeZoneService.updateSafeZone(
        req.params.id as string,
        req.body as UpdateSafeZoneInput,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, zone, 'Safe zone updated successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await SafeZoneService.deleteSafeZone(
        req.params.id as string,
        req.user?.userId,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Safe zone deleted successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
