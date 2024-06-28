import { makeRegisterPet } from '@/use-cases/factories/make-register-pet';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerPetSchema = z.object({
      orgId: z.string(),
      name: z.string(),
      about: z.string(),
      age: z.number(),
      specie: z.enum(['DOG', 'CAT']),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']),	
      energy: z.enum(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']),
      independency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      environmentSize: z.enum(['SMALL', 'MEDIUM', 'WIDE']),
      address: z.object({
        cep: z.string(),
        street: z.string(),
        number: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
      }),
      requirements: z.array(z.string()).min(1),
    })
    const result = registerPetSchema.safeParse(request.body);

    if(!result.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const {
      orgId,
      name,
      about,
      age,
      specie,
      size,
      energy,
      independency,
      environmentSize,
      address,
      requirements
    } = result.data
    const parts = request.files()
    const files: Buffer[] = []
    for await (const part of parts) {
      const file = await part.toBuffer()
      files.push(file)
    }

    const registerPetUseCase = makeRegisterPet();

    const pet = await registerPetUseCase.execute({
      orgId,
      name,
      about,
      age,
      specie,
      size,
      energy,
      independency,
      environmentSize,
      address,
      files,
      requirements
    });

    return reply.status(201).send({
      pet
    });
  } catch (error: any) {
    return reply.status(400).send({ message: error.message });
  }
}