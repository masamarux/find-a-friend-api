import { prisma } from '@/libs/prisma';
import { AdoptionsRepository, CreateAdoptionProps, ListManyByOrgIdProps } from '../adoptions-repository';

export class PrismaAdoptionsRepository implements AdoptionsRepository {
  async create({
    orgId,
    petId,
    requirements
  }: CreateAdoptionProps) {
    await prisma.adoptions.create({
      data: {
        org_id: orgId,
        pet_id: petId,
        adoption_requirements: {
          create: requirements.map(requirement => ({
            description: requirement
          }))
        }
      },
    });
  }
  async listManyByOrgId({
    itemsSize,
    page,
    age,
    size,
    specie,
    energy,
    independency,
    environmentSize,
    address,
  }: ListManyByOrgIdProps) {
    const adoptions = await prisma.adoptions.findMany({
      where: {
        finished_at: null,
        pet: {
          age,
          size,
          specie,
          energy,
          independency,
          environment_size: environmentSize,
          address: {
            city: address?.city,
            state: address?.state,
          },
        }
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            pet_images: {
              select: {
                id: true,
                key: true
              }
            }
          },
        },
      },
      take: itemsSize,
      skip: (page - 1) * itemsSize,
    });

    return adoptions;
  }
}