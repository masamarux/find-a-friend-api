import { prisma } from '@/libs/prisma';
import { FindManyByCityProps, Pet, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        pet_images: true,
        address: true,
        adoption: {
          include: {
            org: {
              select: {
                address: true,
                telephone: true,
                name: true,
                id: true
              }
            },
            adoption_requirements: true
          }
        }
      }
    })
    return pet
  }
  async findMany(data: FindManyByCityProps) {
    const {
      city,
      energy,
      environmentSize,
      independency,
      size,
      specie
    } = data
    const pets = await prisma.pet.findMany({
      include: {
        address: true
      },
      where: {
        specie,
        size,
        energy,
        independency,
        environment_size: environmentSize,
        address: {
          city
        }
      }
    })
    return pets
  }
  async create(data: Pet) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
        address: {
          create: data.address
        },
        pet_images: {
          createMany: {
            data: data.images.map(key => {
              return {
                key
              }
            })
          }
        }
      },
      include: {
        address: true,
        pet_images: true
      }
    })

    return pet
  }
}