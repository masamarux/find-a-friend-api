import { makeGetPet } from '@/use-cases/factories/make-get-pet';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getPetSchema = z.object({
      id: z.string(),
    })
    const result = getPetSchema.safeParse(request.params);

    if(!result.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const { id } = result.data

    const getPetUseCase = makeGetPet();

    const { pet } = await getPetUseCase.execute({
      id
    });

    return reply.send({
      pet
    });
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' });
  }
}