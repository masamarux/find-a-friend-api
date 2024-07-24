import { AdoptionsRepository } from '@/repositories/adoptions-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import type { S3Service } from '@/services/s3';
import { $Enums, Pet } from '@prisma/client';
import crypto from 'crypto';

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface RegisterPetUseCaseRequest {
  orgId: string;
  name: string;
  about: string;
  age: number;
  specie: $Enums.SPECIE;
  size: $Enums.SIZES;
  energy: $Enums.ENERGY;
  independency: $Enums.INDEPENDENCY;
  environmentSize: $Enums.ENVIRONMENT_SIZE;
  address: Address,
  files: Buffer[]
  requirements: string[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionsRepository: AdoptionsRepository,
    private s3Service: S3Service,
  ) {}

  async execute(data: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const images = []
    if(data.files.length > 0) {
      for (const file of data.files) {
        const key = `${crypto.randomUUID()}.png`;
        await this.s3Service.storeImage(key, file);
        images.push(key);
      }
    }

    const pet = await this.petsRepository.create({
      orgId: data.orgId,
      name: data.name,
      about: data.about,
      age: data.age,
      specie: data.specie,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment_size: data.environmentSize,
      address: data.address,
      images,
    });

    await this.adoptionsRepository.create({
      orgId: data.orgId,
      petId: pet.id,
      requirements: data.requirements,
    })

    return {
      pet
    }
  }
}