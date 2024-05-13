import { PetsRepository } from '@/repositories/pets-repository';
import { $Enums, Pet } from '@prisma/client';

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface RegisterPetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  specie: $Enums.SPECIE;
  size: $Enums.SIZES;
  energy: $Enums.ENERGY;
  independency: $Enums.INDEPENDENCY;
  environment_size: $Enums.ENVIRONMENT_SIZE;
  address: Address
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create(data);

    return {
      pet
    }
  }
}