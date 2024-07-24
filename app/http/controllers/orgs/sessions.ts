import { makeSigninOrg } from '@/use-cases/factories/make-signin-org';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  try {
    const signinSchema = z.object({
      email: z.string().email(),
      password: z.string()
    });
  
    const result = signinSchema.safeParse(request.body);
  
    if (!result.success) {
      return reply.status(400).send({ message: result.error });
    }
    
    const { email, password } = result.data;

    const signinOrgUseCase = makeSigninOrg();

    const { org } = await signinOrgUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign({
      org: {
        id: org.id,
        name: org.name,
        role: org.role
      }
    }, {
      sign: {
        sub: org.id,
      }
    });

    const refreshToken = await reply.jwtSign({
      org: {
        id: org.id,
        name: org.name,
        role: org.role
      }
    }, {
      sign: {
        expiresIn: '1d',
        sub: org.id,
      }
    })

    return reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      path: '/n'
    }).status(200).send({ token });
  } catch (error: any) {
    return reply.status(400).send({ message: error.message });
  }

}