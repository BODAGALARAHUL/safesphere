import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PREFIX: z.string().startsWith('/').default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  MAX_REQUEST_SIZE: z.string().default('100kb'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/safesphere?schema=public'),
  DIRECT_URL: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(16).default('safesphere_dev_jwt_access_secret_key_32bytes_min!'),
  JWT_REFRESH_SECRET: z.string().min(16).default('safesphere_dev_jwt_refresh_secret_key_32bytes_min!'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(14).default(10),
});

export type EnvConfig = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables configuration:');
  parsedEnv.error.issues.forEach((issue) => {
    console.error(` - ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const env: EnvConfig = parsedEnv.data;
