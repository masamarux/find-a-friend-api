import { $Enums, Pet as PetModel } from '@prisma/client';

export interface Pet {
  name: string;
  about: string;
  age: string;
  specie: $Enums.SPECIE;
  size: $Enums.SIZES;
  energy: $Enums.ENERGY;
  independency: $Enums.INDEPENDENCY;
  environment_size: $Enums.ENVIRONMENT_SIZE;
}

export interface PetsRepository {
  // findMany(): Promise<PetModel[]>;
  create(data: Pet): Promise<PetModel>;
}