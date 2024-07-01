import { beforeEach, describe, expect, it } from 'vitest';
import { SigninOrgUseCase } from './signin-org';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { hash } from 'bcryptjs';
import { env } from '@/env';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

let orgRepository: InMemoryOrgRepository
let sut: SigninOrgUseCase

describe('Signin Organization', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new SigninOrgUseCase(orgRepository)
  })

  it('should signin an organization', async () => {
    const address = {
      cep: '99999999',
      city: 'City XYZ',
      neighborhood: 'Bairro XYZ',
      number: '999',
      state: 'AL',
      street: 'Rua XYZ',
    }
    const org = {
      name: 'Org XYZ',
      email: 'xyz@org.com',
      telephone: '5599999999999',
      password: '123456',
    }

    await orgRepository.create({ 
      ...org,
      password: await hash(org.password, env.CRYPTO_SALT),
      address
    })

    const response = await sut.execute({
      email: org.email,
      password: org.password,
    })

    expect(response.org).toEqual(expect.objectContaining({
      name: org.name,
      email: org.email,
    }))
  })

  it('should fail when sign in a not existing organization', async () => {
    await expect(
      () => sut.execute({
        email: 'xyz@org.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should fail when signin with an invalid password', async () => {
    const address = {
      cep: '99999999',
      city: 'City XYZ',
      neighborhood: 'Bairro XYZ',
      number: '999',
      state: 'AL',
      street: 'Rua XYZ',
    }
    const org = {
      name: 'Org XYZ',
      email: 'xyz@org.com',
      telephone: '5599999999999',
      password: '123456',
    }

    await orgRepository.create({ 
      ...org,
      password: await hash(org.password, env.CRYPTO_SALT),
      address
    })

    await expect(
      () => sut.execute({
        email: org.email,
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})