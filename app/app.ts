import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultiPart from '@fastify/multipart'
import { appRoutes } from './http/controllers/app/routes';
import { env } from './env';
import { orgsRoutes } from './http/controllers/orgs/routes';
import { petsRoutes } from './http/controllers/pets/routes';
import { adoptionsRoutes } from './http/controllers/adoptions/routes';

const isTestEnv = process.env.NODE_ENV === 'test';

export const app = fastify({
  logger: !isTestEnv
});

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(fastifyMultiPart, {
  limits: {
    fileSize: 2 * 1000000 // 2MB
  },
  attachFieldsToBody: true
})

app.register(appRoutes)
app.register(orgsRoutes)
app.register(petsRoutes)
app.register(adoptionsRoutes)
