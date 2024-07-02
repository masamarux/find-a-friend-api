import { AdoptionsRepository, CreateAdoptionProps, ListManyByOrgIdProps } from '../adoptions-repository';
import { fakerPT_BR as faker } from '@faker-js/faker';

interface Adoptions {
  id: string
  org_id: string
  pet_id: string
  pet: {
    id: string
    name: string
    age: number
    size: string
    specie: string
    energy: string
    independency: string
    environment_size: string
    address?: {
      city: string
      state: string
    }
    pet_images: {
      id: string
      key: string
    }[]
  },
  created_at: Date
  finished_at: Date | null
  adoption_requirements: {
    id: string
    adoption_id: string
    description: string
  }[]
}

export class InMemoryAdoptionsRepository implements AdoptionsRepository {
  private adoptions: Adoptions[] = [];

  private getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  async listManyByOrgId({
    orgId,
    itemsSize,
    page,
    age,
    size,
    specie,
    energy,
    independency,
    environmentSize,
    address,
  }: ListManyByOrgIdProps) {
    const filters: { [key: string]: any } = {
      org_id: orgId,
      'pet.age': age,
      'pet.size': size,
      'pet.specie': specie,
      'pet.energy': energy,
      'pet.independency': independency,
      'pet.environment_size': environmentSize,
      'pet.address.city': address?.city,
      'pet.address.state': address?.state,
    };

    const filterKeys = Object.keys(filters).filter(key => filters[key] !== undefined);

    const adoptions = this.adoptions.filter(adoption => {
      return filterKeys.every(key => this.getNestedValue(adoption, key) === filters[key]);
    });
  
    const adoptionsFiltered = adoptions
      .slice((page - 1) * itemsSize, page * itemsSize)
      .map(adoption => ({
        id: adoption.id,
        org_id: adoption.org_id,
        pet_id: adoption.pet_id,
        created_at: adoption.created_at,
        finished_at: adoption.finished_at,
        pet: {
          id: adoption.pet.id,
          name: adoption.pet.name,
          pet_images: adoption.pet.pet_images.map(image => ({
            id: image.id,
            key: image.key,
          })) || [],
        },
      }));
  
    return Promise.resolve(adoptionsFiltered);
  }
  async create({
    orgId,
    petId,
    requirements
  }: CreateAdoptionProps) {
    this.adoptions.push({
      id: crypto.randomUUID().toString(),
      org_id: orgId,
      pet_id: petId,
      pet: {
        id: petId,
        name: faker.person.firstName(),
        age: faker.number.int({ min: 1, max: 20}),
        size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'BIG']),
        specie: faker.helpers.arrayElement(['DOG', 'CAT']),
        energy: faker.helpers.arrayElement(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']),
        independency: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
        environment_size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'WIDE']),
        address: {
          city: 'City XYZ',
          state: 'AL',
        },
        pet_images: faker.helpers.arrayElements([
          {
            id: crypto.randomUUID().toString(),
            key: crypto.randomUUID().toString(),
          },
        ], {max: 3, min: 1}),
      },
      adoption_requirements: requirements.map(requirement => ({
        id: crypto.randomUUID().toString(),
        adoption_id: petId,
        description: requirement
      })),
      created_at: new Date(),
      finished_at: null,
    })
  }

}