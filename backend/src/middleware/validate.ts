import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { ValidationError, ErrorDetail } from '../utils/errors.js';

type SchemaInput =
  | ZodTypeAny
  | {
      body?: ZodTypeAny;
      query?: ZodTypeAny;
      params?: ZodTypeAny;
    };

export const validate = (schema: SchemaInput) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if ('parseAsync' in schema) {
        // It's a top-level Zod schema (e.g. z.object({ body: ... }))
        const parsed = (await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        })) as { body?: unknown; query?: unknown; params?: unknown };

        if (parsed.body !== undefined) req.body = parsed.body;
        if (parsed.query !== undefined) req.query = parsed.query as Record<string, string>;
        if (parsed.params !== undefined) req.params = parsed.params as Record<string, string>;
      } else {
        // It's a plain object with optional body, query, params schemas
        if (schema.body) {
          req.body = await schema.body.parseAsync(req.body);
        }
        if (schema.query) {
          req.query = (await schema.query.parseAsync(req.query)) as Record<string, string>;
        }
        if (schema.params) {
          req.params = (await schema.params.parseAsync(req.params)) as Record<string, string>;
        }
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: ErrorDetail[] = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          issue: issue.message,
        }));
        next(new ValidationError('Request validation failed', details));
      } else {
        next(error);
      }
    }
  };
};
