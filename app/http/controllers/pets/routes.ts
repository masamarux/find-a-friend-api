import { FastifyInstance } from 'fastify';
import { register } from './register';
import { get } from './get';
import { verifyToken } from '@/http/middlewares/verify-token';

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', get)

  // authenticated
  app.post('/pets',{
    onRequest: [verifyToken]
  }, register)
}