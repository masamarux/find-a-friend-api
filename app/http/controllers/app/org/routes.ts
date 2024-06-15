import { FastifyInstance } from 'fastify';
import { signin } from './signin';

export async function orgsRoutes(app: FastifyInstance) {
    app.get('/orgs/signin', signin)
    
}