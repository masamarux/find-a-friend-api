import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { RegisterPetUseCase } from '../register-pet';
import { S3Service } from '@/services/s3';
import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository';

export function makeRegisterPet() {
  const petsRepository = new PrismaPetsRepository();
  const adoptionsRepository = new PrismaAdoptionsRepository();
  const s3 = new S3Service();
  const petsRegister = new RegisterPetUseCase(petsRepository, adoptionsRepository, s3);

  return petsRegister;
}