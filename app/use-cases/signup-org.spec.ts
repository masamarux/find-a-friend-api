import { beforeEach, describe, expect, it } from 'vitest'
import { SignupOrgUseCase } from './signup-org'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { EntityAlreadyExistsError } from '@/errors/entity-already-exists-error'
import { compare } from 'bcrypt'

let orgRepository: InMemoryOrgRepository
let sut: SignupOrgUseCase

describe('Signup Organization', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new SignupOrgUseCase(orgRepository)
  })

  it('should signup an organization', async () => {
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

    const result = await sut.execute({
      ...org,
      address,
    })

    expect(result.org).toEqual(
      expect.objectContaining({
        name: org.name,
        email: org.email,
        telephone: org.telephone,
      })
    )
  })

  it('should fail when signup an organization with an existing email', async () => {
    const addressXYZ = {
      cep: '99999999',
      city: 'City XYZ',
      neighborhood: 'Bairro XYZ',
      number: '999',
      state: 'AL',
      street: 'Rua XYZ',
    }
    const orgXYZ = {
      name: 'Org XYZ',
      email: 'xyz@org.com',
      telephone: '5599999999999',
      password: '123456',
    }

    await sut.execute({
      ...orgXYZ,
      address: addressXYZ,
    })

    const addressXPTO = {
      cep: '99999999',
      city: 'City XPTO',
      neighborhood: 'Bairro XPTO',
      number: '999',
      state: 'AL',
      street: 'Rua XPTO',
    }
    const orgXPTO = {
      name: 'Org XPTO',
      email: 'xyz@org.com',
      telephone: '5599999999999',
      password: '123456',
    }

    await expect(
      () => sut.execute({
      ...orgXPTO,
      address: addressXPTO,
      })
    ).rejects.toBeInstanceOf(EntityAlreadyExistsError)
  })

  it('should signup with a correct password hash', async () => {
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

    const result = await sut.execute({
      ...org,
      address,
    })

    const passwordHash = compare(org.password, result.org.password)

    expect(passwordHash).toBeTruthy()
  })
})