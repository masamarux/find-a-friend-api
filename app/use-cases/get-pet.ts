import { EntityNotFoundError } from '@/errors/entity-not-found-error';
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

    if(!pet) {
      throw new EntityNotFoundError('Pet');
    }

    return {
      pet
    };
  }
}