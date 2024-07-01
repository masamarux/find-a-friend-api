import { FastifyInstance } from 'fastify';
import { list } from './list';

export async function adoptionsRoutes(app: FastifyInstance) {
  app.get('/adoptions', list)
}