import { prisma } from '@/libs/prisma';
import { makeFetchAdoptions } from '@/use-cases/factories/make-fetch-adoptions';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listQuerySchema = z.object({
      page: z.coerce.number().default(1),
      itemsSize: z.coerce.number().default(10),
      age: z.coerce.number().optional(),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),	
      specie: z.enum(['DOG', 'CAT']).optional(),
      energy: z.enum(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']).optional(),
      independency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      environmentSize: z.enum(['SMALL', 'MEDIUM', 'WIDE']).optional(),
      city: z.string(),
      state: z.string(),
    })

    const resultQuery = listQuerySchema.safeParse(request.query);

    if(!resultQuery.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const {
      page,
      itemsSize,
      age,
      size,
      specie,
      energy,
      independency,
      environmentSize,
      city,
      state,
    } = resultQuery.data

    const fetchAdoptionsUseCase = makeFetchAdoptions();

    const { adoptions } = await fetchAdoptionsUseCase.execute({
      page,
      itemsSize,
      age,
      size,
      specie,
      energy,
      independency,
      environmentSize,
      address: {
        city,
        state,
      }
    });

    return reply.send({
      adoptions
    });
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' });
  }
}