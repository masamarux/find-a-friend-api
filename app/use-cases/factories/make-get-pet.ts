import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { GetPetUseCase } from '../get-pet';

export function makeGetPet() {
  const petsRepository = new PrismaPetsRepository();
  const getPet = new GetPetUseCase(petsRepository);

  return getPet;
}