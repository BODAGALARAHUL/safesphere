import express, { Express } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import { env } from '../config/env.js';

export const setupSecurityMiddleware = (app: Express): void => {
  app.use(
    helmet({
      contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
    })
  );

  const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin '${origin}' is not allowed by CORS policy.`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id', 'Accept'],
    exposedHeaders: ['x-request-id'],
    credentials: true,
    maxAge: 86400,
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: env.MAX_REQUEST_SIZE }));
  app.use(express.urlencoded({ extended: true, limit: env.MAX_REQUEST_SIZE }));
};
