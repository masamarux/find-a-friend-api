import { makeRegisterPet } from '@/use-cases/factories/make-register-pet';
import { convertJsonToObject } from '@/utils/zod/convert-json-to-object';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

interface MultipartField {
  type: 'field';
  fieldname: string;
  mimetype: string;
  encoding: string;
  value: string;
  fieldnameTruncated: boolean;
  valueTruncated: boolean;
  fields: Record<string, MultipartField>;
}

interface MultipartBody {
  [key: string]: MultipartField;
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const bodyFromFormData = request.body as MultipartBody;
    const body = Object.keys(bodyFromFormData).reduce<Record<string, string>>((acc, key) => {
      acc[key] = bodyFromFormData[key].value;
      return acc;
    }, {});

    const addressSchema = z.object({
      cep: z.string(),
      street: z.string(),
      number: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
    });

    const requirementsSchema = z.array(z.string()).min(1);

    const registerPetSchema = z.object({
      name: z.string(),
      about: z.string(),
      age: z.coerce.number(),
      specie: z.enum(['DOG', 'CAT']),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']),	
      energy: z.enum(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']),
      independency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      environmentSize: z.enum(['SMALL', 'MEDIUM', 'WIDE']),
      address: z.string()
        .transform(convertJsonToObject)
        .pipe(addressSchema),
      requirements: z.string()
        .transform(convertJsonToObject)
        .pipe(requirementsSchema),
    })
    const result = registerPetSchema.safeParse(body);

    if(!result.success) {
      return reply.status(400).send({ message: 'Invalid data' });
    }

    const orgId = request.user.org.id;

    const {
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

    const { pet } = await registerPetUseCase.execute({
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