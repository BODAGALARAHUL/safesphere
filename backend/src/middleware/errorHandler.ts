import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';
import { HTTP_STATUS, ERROR_CODES } from '../config/constants.js';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const requestId = (req.headers['x-request-id'] as string) || (res.getHeader('x-request-id') as string);

  // Handle known AppError instances
  if (err instanceof AppError) {
    logger.warn(`Operational error: ${err.message}`, {
      code: err.code,
      statusCode: err.statusCode,
      requestId,
      details: err.details,
      url: req.originalUrl || req.url,
      method: req.method,
    });

    sendError(res, err.message, err.statusCode, err.code, err.details);
    return;
  }

  // Handle JSON SyntaxError from express.json()
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400 && 'body' in err) {
    logger.warn(`Malformed JSON body: ${err.message}`, {
      requestId,
      url: req.originalUrl || req.url,
      method: req.method,
    });

    sendError(
      res,
      'Malformed JSON payload in request body.',
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.BAD_REQUEST
    );
    return;
  }

  // Handle CORS validation error
  if (err.message && err.message.includes('CORS')) {
    logger.warn(`CORS violation: ${err.message}`, {
      requestId,
      origin: req.headers.origin,
      url: req.originalUrl || req.url,
    });

    sendError(
      res,
      'Cross-Origin Request Blocked by CORS policy.',
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.FORBIDDEN
    );
    return;
  }

  // Unhandled / programmer errors
  logger.error(`Unhandled Exception: ${err.message}`, {
    name: err.name,
    stack: err.stack,
    requestId,
    url: req.originalUrl || req.url,
    method: req.method,
  });

  const responseMessage = env.NODE_ENV === 'production'
    ? 'An unexpected internal error occurred.'
    : err.message || 'An unexpected internal error occurred.';

  sendError(
    res,
    responseMessage,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.INTERNAL_SERVER_ERROR
  );
};
