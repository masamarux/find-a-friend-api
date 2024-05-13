import { PetsRepository } from '@/repositories/pets-repository';

interface FetchPetsUseCaseRequest {
  cityName: string;
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: FetchPetsUseCaseRequest){
    const pets = await this.petsRepository.findManyByCity(data.cityName);

    return pets;
  }
}