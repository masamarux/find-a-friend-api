import { app } from '@/app';
import { fakerPT_BR as faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Org signup (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  });

  it('should signup a org', async () => {
    const org = {
      name: faker.company.name(),
      email: faker.internet.email(),
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
      telephone: faker.phone.number(),
      password: faker.internet.password(),
    }

    const response = await request(app.server)
      .post('/orgs/signup')
      .send(org)
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        org: {
          name: org.name,
          email: org.email,
          telephone: org.telephone,
        }
      })
    )
  })
})