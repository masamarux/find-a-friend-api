import { prisma } from '@/libs/prisma';
import { Pet, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Pet) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
}