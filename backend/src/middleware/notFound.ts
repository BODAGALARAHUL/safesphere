import { Request, Response } from 'express';
import { HTTP_STATUS, ERROR_CODES } from '../config/constants.js';
import { sendError } from '../utils/response.js';

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(
    res,
    `Route ${req.method} ${req.originalUrl || req.url} not found on this server.`,
    HTTP_STATUS.NOT_FOUND,
    ERROR_CODES.NOT_FOUND
  );
};
