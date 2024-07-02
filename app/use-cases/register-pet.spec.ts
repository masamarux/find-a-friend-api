import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetPetUseCase } from './get-pet';
import { Pet } from '@/repositories/pets-repository';
import { EntityNotFoundError } from '@/errors/entity-not-found-error';
import { RegisterPetUseCase, RegisterPetUseCaseRequest } from './register-pet';
import { InMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository';
import { S3Service } from '@/services/s3';

let petsRepository: InMemoryPetsRepository
let adoptionsRepository: InMemoryAdoptionsRepository
let s3Service: S3Service
let sut: RegisterPetUseCase

describe('Register Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    adoptionsRepository = new InMemoryAdoptionsRepository()
    s3Service = new S3Service()
    sut = new RegisterPetUseCase(petsRepository, adoptionsRepository, s3Service)
  })

  it('should be able to register a pet', async () => {
    const pet: RegisterPetUseCaseRequest = {
      orgId: 'org-id',
      name: 'Rex',
      about: 'A dog...',
      age: 2,
      specie: 'DOG',
      size: 'MEDIUM',
      energy: 'HIGH',
      independency: 'MEDIUM',
      environmentSize: 'MEDIUM',
      address: {
        cep: '00000-000',
        street: 'Rua X',
        number: '0',
        neighborhood: 'Bairro dos X',
        city: 'Xlândia',
        state: 'XX'
      },
      files: [],
      requirements: [
        'Requirement 1',
        'Requirement 2'
      ]
    }
    const petCreated = await sut.execute(pet)

    expect(petCreated.pet).toEqual(expect.objectContaining({
      name: 'Rex',
      about: 'A dog...',
      age: 2,
    }))
  })
})