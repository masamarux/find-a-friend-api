import { FastifyInstance } from 'fastify';
import { register } from './register';
import { get } from './get';
import { verifyToken } from '@/http/middlewares/verify-token';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', get)

  // authenticated
  app.post('/pets',{
    onRequest: [
      verifyToken,
      verifyUserRole('ADMIN'),
    ],
  }, register)
}