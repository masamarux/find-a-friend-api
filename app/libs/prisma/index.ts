import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasourceUrl: `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${process.env.DB_DATABASE}?schema=public`,
});