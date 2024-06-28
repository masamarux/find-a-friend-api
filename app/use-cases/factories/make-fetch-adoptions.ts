import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository';
import { FetchAdoptionsUseCase } from '../fetch-adoptions';

export function makeFetchAdoptions() {
  const adoptionsRepository = new PrismaAdoptionsRepository();
  const fetchAdoptions = new FetchAdoptionsUseCase(adoptionsRepository);

  return fetchAdoptions;
}