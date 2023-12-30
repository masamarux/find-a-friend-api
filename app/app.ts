import fastify from 'fastify';
import { appRoutes } from './http/controllers/app/routes';

export const app = fastify();

app.register(appRoutes)
