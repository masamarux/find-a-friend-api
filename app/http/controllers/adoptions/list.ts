import { makeFetchAdoptions } from '@/use-cases/factories/make-fetch-adoptions';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listParamsSchema = z.object({
      orgId: z.string(),
    })
    const listQuerySchema = z.object({
      page: z.coerce.number(),
      itemsSize: z.coerce.number(),
      age: z.coerce.number().optional(),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),	
      specie: z.enum(['DOG', 'CAT']).optional(),
      energy: z.enum(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']).optional(),
      independency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      environmentSize: z.enum(['SMALL', 'MEDIUM', 'WIDE']).optional(),
      address: z.object({
        city: z.string(),
        state: z.string(),
      }).optional(),
    })

    const resultParams = listParamsSchema.safeParse(request.params);
    const resultQuery = listQuerySchema.safeParse(request.query);

    if(!resultParams.success || !resultQuery.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const {
      orgId
    } = resultParams.data
    const {
      page,
      itemsSize,
      age,
      size,
      specie,
      energy,
      independency,
      environmentSize,
      address,
    } = resultQuery.data

    const fetchAdoptionsUseCase = makeFetchAdoptions();
    const adoptions = await fetchAdoptionsUseCase.execute({
      orgId,
      page,
      itemsSize,
      age,
      size,
      specie,
      energy,
      independency,
      environmentSize,
      address,
    });

    return reply.send(adoptions);
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' });
  }
}