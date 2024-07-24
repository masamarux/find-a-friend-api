import { fakerPT_BR as faker } from '@faker-js/faker'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false
) {
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
    role: isAdmin ? 'ADMIN' : 'MEMBER',
  }

  await request(app.server)
    .post('/orgs/signup')
    .send(org)

  const response = await request(app.server).post('/orgs/sessions').send({
    email: org.email,
    password: org.password,
  })

  return {
    token: response.body.token,
  }
}