import { $Enums, Pet as PetModel } from '@prisma/client';

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Pet {
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

export interface PetsRepository {
  findManyByCity(cityName: string): Promise<PetModel[]>;
  create(data: Pet): Promise<PetModel>;
}