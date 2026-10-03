import { ERROR_CODES, HTTP_STATUS } from '../config/constants.js';

export interface ErrorDetail {
  field?: string;
  issue: string;
  value?: unknown;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details: ErrorDetail[];

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code: string = ERROR_CODES.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    details: ErrorDetail[] = []
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request', details: ErrorDetail[] = []) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.BAD_REQUEST, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, true);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden resource') {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, true);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict', details: ErrorDetail[] = []) {
    super(message, HTTP_STATUS.CONFLICT, ERROR_CODES.CONFLICT, true, details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details: ErrorDetail[] = []) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR, true, details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Too many requests, please try again later') {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, ERROR_CODES.RATE_LIMIT_EXCEEDED, true);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR, false);
  }
}
