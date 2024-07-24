import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org';

describe('Registe Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  });

  it('should create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true);
    const pet = {
      name: faker.person.firstName(),
      about: faker.lorem.paragraph(),
      age: faker.number.int({ min: 1, max: 30 }),
      size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'BIG']),
      specie: faker.helpers.arrayElement(['DOG', 'CAT']),
      energy: faker.helpers.arrayElement(['QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE']),
      independency: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
      environmentSize: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'WIDE']),
      address: {
        cep: faker.location.zipCode(),
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
      },
      requirements: faker.helpers.multiple(
        () => faker.lorem.sentence(), 
        { count: { max: 5, min: 1} }
      ),
      // images: faker.helpers.multiple(
      //   () => Buffer.from(faker.image.dataUri()), 
      //   { count: { max: 2, min: 1} }
      // )
    }

    const response = await request(app.server)
      .post('/pets')
      .set({
        Authorization: `Bearer ${token}`
      })
      .field('name', pet.name)
      .field('about', pet.about)
      .field('age', pet.age)
      .field('size', pet.size)
      .field('specie', pet.specie)
      .field('energy', pet.energy)
      .field('independency', pet.independency)
      .field('environmentSize', pet.environmentSize)
      .field('address', JSON.stringify(pet.address))
      .field('requirements', JSON.stringify(pet.requirements))
      // .attach('files', Buffer.from(faker.image.dataUri()), 'image.png')



    expect(response.status).toBe(201);

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: pet.name,
      })
    )
  })
})