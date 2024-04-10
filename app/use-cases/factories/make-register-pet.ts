import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { RegisterPetUseCase } from '../register-pet';

export function makeRegisterPet() {
  const petsRepository = new PrismaPetsRepository();
  const petsRegister = new RegisterPetUseCase(petsRepository);

  return petsRegister;
}