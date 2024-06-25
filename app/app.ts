import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultiPart from '@fastify/multipart'
import { appRoutes } from './http/controllers/app/routes';
import { env } from './env';
import { orgsRoutes } from './http/controllers/org/routes';
import { petsRoutes } from './http/controllers/pet/routes';

export const app = fastify({
  logger: true
});

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(fastifyMultiPart, {
  limits: {
    fileSize: 2 * 1000000 // 1MB
  }
})

app.register(appRoutes)
app.register(orgsRoutes)
app.register (petsRoutes)
