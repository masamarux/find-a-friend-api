import { app } from '@/app';
import { fakerPT_BR as faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('ORG session (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  });

  it('should sign a session to org', async () => {
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

    await request(app.server)
      .post('/orgs/signup')
      .send(org)

    const response = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    })

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    )
  })
})