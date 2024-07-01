import { AdoptionsRepository } from '@/repositories/adoptions-repository';

interface FetchAdoptionsUseCaseProps {
  orgId: string
  page: number
  itemsSize: number
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  specie?: 'DOG' | 'CAT'
  energy?: 'QUIET' | 'LOW' | 'MEDIUM' | 'HIGH' | 'UNSTOPPABLE'
  independency?: 'LOW' | 'MEDIUM' | 'HIGH'
  environmentSize?: 'SMALL' | 'MEDIUM' | 'WIDE'
  address: {
    city: string
    state: string
  }
}

export class FetchAdoptionsUseCase {
  constructor(private adoptionsRepository: AdoptionsRepository) {}

  async execute({
    orgId,
    page,
    itemsSize,
    age,
    size,
    specie,
    energy,
    independency,
    environmentSize,
    address,
  }: FetchAdoptionsUseCaseProps){
    const adoptions = await this.adoptionsRepository.listManyByOrgId({
      orgId,
      page,
      itemsSize,
      age,
      size,
      specie,
      energy,
      independency,
      environmentSize,
      address,
    });

    return {
      adoptions
    };
  }
}