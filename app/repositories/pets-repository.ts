import { $Enums, ENERGY, ENVIRONMENT_SIZE, INDEPENDENCY, Pet as PetModel, SIZES, SPECIE } from '@prisma/client';

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
  age: number;
  specie: $Enums.SPECIE;
  size: $Enums.SIZES;
  energy: $Enums.ENERGY;
  independency: $Enums.INDEPENDENCY;
  environment_size: $Enums.ENVIRONMENT_SIZE;
  address: Address,
  images: string[]
}

export interface FindManyByCityProps {
  specie?: SPECIE
  size?: SIZES
  energy?: ENERGY
  independency?: INDEPENDENCY
  environmentSize?: ENVIRONMENT_SIZE
  city: string
}

export interface PetsRepository {
  findById(id: string): Promise<PetModel | null>;
  findMany(data: FindManyByCityProps): Promise<PetModel[] | null>;
  create(data: Pet): Promise<PetModel>;
}