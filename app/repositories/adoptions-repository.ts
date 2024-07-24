interface AdoptionsList {
  id: string;
  org_id: string;
  pet_id: string;
  created_at: Date;
  finished_at: Date | null;
  pet: {
    id: string;
    name: string;
    pet_images: {
      id: string;
      key: string;
    }[];
  }
}

export interface ListManyByOrgIdProps {
  page: number
  itemsSize: number
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  specie?: 'DOG' | 'CAT'
  energy?: 'QUIET' | 'LOW' | 'MEDIUM' | 'HIGH' | 'UNSTOPPABLE'
  independency?: 'LOW' | 'MEDIUM' | 'HIGH'
  environmentSize?: 'SMALL' | 'MEDIUM' | 'WIDE'
  address?: {
    city: string
    state: string
  }
}

export interface CreateAdoptionProps {
  orgId: string
  petId: string
  requirements: string[]
}

export interface AdoptionsRepository {
  listManyByOrgId(data: ListManyByOrgIdProps): Promise<AdoptionsList[]>
  create(data: CreateAdoptionProps): Promise<void>
}