import { FastifyInstance } from 'fastify';
import { signin } from './sessions';
import { signup } from './signup';

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/orgs/sessions', signin)
    app.post('/orgs/signup', signup)
}