import { env } from '../config/env.js';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const SENSITIVE_KEYS = new Set([
  'password',
  'passwordconfirmation',
  'token',
  'authorization',
  'refreshtoken',
  'accesstoken',
  'secret',
  'apikey',
  'creditcard',
  'cvv',
]);

const sanitizeData = (data: unknown): unknown => {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

const formatLog = (level: LogLevel, message: string, meta?: Record<string, unknown>): string => {
  const timestamp = new Date().toISOString();
  const sanitizedMeta = meta ? sanitizeData(meta) : undefined;
  const metaString = sanitizedMeta ? ` | Meta: ${JSON.stringify(sanitizedMeta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
};

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    console.log(formatLog('info', message, meta));
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(formatLog('warn', message, meta));
  },
  error: (message: string, meta?: Record<string, unknown>) => {
    console.error(formatLog('error', message, meta));
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', message, meta));
    }
  },
};
