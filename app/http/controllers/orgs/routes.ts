import { FastifyInstance } from 'fastify';
import { signin } from './signin';
import { signup } from './signup';

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/orgs/sessions', signin)
    app.post('/orgs/signup', signup)
}