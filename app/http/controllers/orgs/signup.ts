import { makeSignupOrg } from '@/use-cases/factories/make-signup-org';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function signup(request: FastifyRequest, reply: FastifyReply) {
  try {
    const signupOrgSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      address: z.object({
        cep: z.string(),
        street: z.string(),
        number: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
      }),
      telephone: z.string(),
      password: z.string(),
      role: z.enum(['MEMBER', 'ADMIN']).default('MEMBER'),
    })

    const result = signupOrgSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const {
      name,
      email,
      address,
      telephone,
      password,
      role
    } = result.data

    const signupOrgUseCase = makeSignupOrg();

    const { org } = await signupOrgUseCase.execute({
      name,
      email,
      address,
      telephone,
      password,
      role
    });

    return reply.status(201).send({
      org: {
        name: org.name,
        email: org.email,
        telephone: org.telephone,
      }
    });
  } catch (error: any) {
    return reply.status(400).send({ message: error.message });
  }
}