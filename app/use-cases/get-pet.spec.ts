import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetPetUseCase } from './get-pet';
import { Pet } from '@/repositories/pets-repository';
import { EntityNotFoundError } from '@/errors/entity-not-found-error';

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const pet: Pet = {
      name: 'Rex',
      about: 'A dog...',
      age: 2,
      specie: 'DOG',
      size: 'MEDIUM',
      energy: 'HIGH',
      independency: 'MEDIUM',
      environment_size: 'MEDIUM',
      address: {
        cep: '00000-000',
        street: 'Rua X',
        number: '0',
        neighborhood: 'Bairro dos X',
        city: 'Xlândia',
        state: 'XX'
      },
      images: []
    }
    const createdPet = await petsRepository.create(pet)

    const result = await sut.execute({
      id: createdPet.id
    })
    expect(result.pet).toEqual(expect.objectContaining({
        id: createdPet.id,
        name: 'Rex',
        about: 'A dog...',
        age: 2,
      })
    )
  })

  it('should fail to get a pet by id if it does not exist', async () => {
    const pet: Pet = {
      name: 'Rex',
      about: 'A dog...',
      age: 2,
      specie: 'DOG',
      size: 'MEDIUM',
      energy: 'HIGH',
      independency: 'MEDIUM',
      environment_size: 'MEDIUM',
      address: {
        cep: '00000-000',
        street: 'Rua X',
        number: '0',
        neighborhood: 'Bairro dos X',
        city: 'Xlândia',
        state: 'XX'
      },
      images: []
    }
    await petsRepository.create(pet)

    await expect(
      () => sut.execute({
        id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(EntityNotFoundError)
  })
})