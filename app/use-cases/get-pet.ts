import { PetsRepository } from '@/repositories/pets-repository';

interface FetchPetsUseCaseRequest {
  id: string
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id
  }: FetchPetsUseCaseRequest){
    const pet = await this.petsRepository.findById(id);

    return {
      pet
    };
  }
}