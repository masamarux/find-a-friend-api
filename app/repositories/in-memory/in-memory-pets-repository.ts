import { Address, Pet as PetModel } from '@prisma/client';
import { FindManyByCityProps, Pet, PetsRepository } from '../pets-repository';

interface Pets extends PetModel{
  address: Address
}

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pets[] = [];

  private getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  async create(data: Pet) {
    const address: Address = {
      id: crypto.randomUUID().toString(),
      cep: data.address.cep,
      street: data.address.street,
      number: data.address.number,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state,
      created_at: new Date(),
      deleted_at: null,
    }
    const pet = {
      id: crypto.randomUUID().toString(),
      name: data.name,
      about: data.about,
      age: data.age,
      specie: data.specie,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment_size: data.environment_size,
      address_id: address.id,
      created_at: new Date(),
      updated_at: new Date(),
      adopted_at: null,
      address
    }

    this.pets.push(pet)
    return pet
  }
  async findById(id: string) {
    const pet = this.pets.find(pet => pet.id === id)
    return pet || null
  }
  async findMany({
    city,
    energy,
    environmentSize,
    independency,
    size,
    specie
  }: FindManyByCityProps) {
    const filters: { [key: string]: any } = {
      'address.city': city,
      'energy': energy,
      'environment_size': environmentSize,
      'independency': independency,
      'size': size,
      'specie': specie,
    };

    const filterKeys = Object.keys(filters).filter(key => filters[key] !== undefined);

    const pets = this.pets.filter(pet => {
      return filterKeys.every(key => this.getNestedValue(pet, key) === filters[key]);
    });

    return pets
  }
}