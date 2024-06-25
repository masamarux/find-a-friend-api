import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  CRYPTO_SALT: z.coerce.number().default(10),
  JWT_SECRET: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
  console.error(_env.error);
  throw new Error(_env.error.message);
}

export const env = _env.data;