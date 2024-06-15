import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { appRoutes } from './http/controllers/app/routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(appRoutes)
