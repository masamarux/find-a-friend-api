import { PetsRepository } from '@/repositories/pets-repository';
import { ENERGY, ENVIRONMENT_SIZE, INDEPENDENCY, SIZES, SPECIE } from '@prisma/client';

interface FetchPetsUseCaseRequest {
  specie?: SPECIE
  size?: SIZES
  energy?: ENERGY
  independecy?: INDEPENDENCY
  environmentSize?: ENVIRONMENT_SIZE
  city: string
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: FetchPetsUseCaseRequest){
    const pets = await this.petsRepository.findMany(data);

    return {
      pets
    };
  }
}