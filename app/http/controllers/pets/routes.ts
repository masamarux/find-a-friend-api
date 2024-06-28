import { FastifyInstance } from 'fastify';
import { register } from './register';
import { get } from './get';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/:id', get)
}