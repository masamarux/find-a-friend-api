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
    let pet_images = null
    if(data.images.length < 0) {
      pet_images = {
        createMany: {
          data: data.images.map(image => {
            return {
              key: image
            }
          })
        }
      }
    }
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        about: data.about,
        age: data.age,
        energy: data.energy,
        environment_size: data.environment_size,
        independency: data.independency,
        size: data.size,
        specie: data.specie,
        address: {
          create: data.address
        },
        pet_images: pet_images ? pet_images : undefined,
      },
      include: {
        address: true,
        pet_images: true
      }
    })

    return pet
  }
}