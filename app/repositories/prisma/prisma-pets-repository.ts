import { prisma } from '@/libs/prisma';
import { Pet, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(cityName: string) {
    const pets = await prisma.pet.findMany({
      include: {
        address: true
      },
      where: {
        address: {
          city: cityName
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
        }
      }
    })

    return pet
  }
}