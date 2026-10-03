import { Response } from 'express';
import { HTTP_STATUS } from '../config/constants.js';
import { ErrorDetail } from './errors.js';

export interface ApiResponseMeta {
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ErrorDetail[];
  };
  meta: ApiResponseMeta;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Request successful',
  statusCode: number = HTTP_STATUS.OK,
  additionalMeta?: Record<string, unknown>
): Response => {
  const requestId = (res.getHeader('x-request-id') as string) || (res.req?.headers['x-request-id'] as string);

  const responseBody: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...(requestId ? { requestId } : {}),
      ...additionalMeta,
    },
  };

  return res.status(statusCode).json(responseBody);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  code: string = 'INTERNAL_SERVER_ERROR',
  details?: ErrorDetail[],
  additionalMeta?: Record<string, unknown>
): Response => {
  const requestId = (res.getHeader('x-request-id') as string) || (res.req?.headers['x-request-id'] as string);

  const responseBody: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details && details.length > 0 ? { details } : {}),
    },
    meta: {
      timestamp: new Date().toISOString(),
      ...(requestId ? { requestId } : {}),
      ...additionalMeta,
    },
  };

  return res.status(statusCode).json(responseBody);
};
