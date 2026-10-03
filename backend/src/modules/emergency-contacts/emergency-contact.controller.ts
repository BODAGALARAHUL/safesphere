import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../../config/constants.js';
import { sendSuccess } from '../../utils/response.js';
import { EmergencyContactService } from './emergency-contact.service.js';
import {
  CreateEmergencyContactInput,
  UpdateEmergencyContactInput,
} from './emergency-contact.schema.js';

export class EmergencyContactController {
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await EmergencyContactService.listContacts(req.user!.userId);
      sendSuccess(res, contacts, 'Emergency contacts retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await EmergencyContactService.getContactById(
        req.user!.userId,
        req.params.id as string
      );
      sendSuccess(res, contact, 'Emergency contact retrieved', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await EmergencyContactService.createContact(
        req.user!.userId,
        req.body as CreateEmergencyContactInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(
        res,
        contact,
        'Emergency contact added successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await EmergencyContactService.updateContact(
        req.user!.userId,
        req.params.id as string,
        req.body as UpdateEmergencyContactInput,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(
        res,
        contact,
        'Emergency contact updated successfully',
        HTTP_STATUS.OK
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await EmergencyContactService.deleteContact(
        req.user!.userId,
        req.params.id as string,
        req.ip,
        req.headers['user-agent']
      );
      sendSuccess(res, null, 'Emergency contact deleted successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  }
}
