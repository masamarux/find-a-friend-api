import { beforeEach, describe, expect, it } from 'vitest';
import { FetchAdoptionsUseCase } from './fetch-adoptions';
import { InMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository';

let adoptionsRepository: InMemoryAdoptionsRepository
let sut: FetchAdoptionsUseCase

describe('Fetch Adoptions', () => {
  beforeEach(() => {
    adoptionsRepository = new InMemoryAdoptionsRepository()
    sut = new FetchAdoptionsUseCase(adoptionsRepository)
  })

  it('should fetch adoptions', async () => {
    const adoptions = [
      ...[...Array(15).keys()].map(() => ({
        orgId: 'org-id-1',
        petId: crypto.randomUUID().toString(),
        requirements: [
          'Needs AC',
          'Needs a big yard',
        ],
      })),
      {
        orgId: 'org-id-2',
        petId: crypto.randomUUID().toString(),
        requirements: [
          'Needs AC',
          'Needs a lot of attention',
        ],
      },
    ]

    for (const adoption of adoptions) {
      await adoptionsRepository.create(adoption)
    }

    const response = await sut.execute({
      itemsSize: 10,
      page: 1,
      address: {
        city: 'City XYZ',
        state: 'AL',
      }
    })

    expect(response.adoptions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'org_id': 'org-id-1',
      })
    ]))
    expect(response.adoptions).toHaveLength(10)
  })

  it('should return an empty list of adoptions if no adoptions were found', async () => {
    const adoptions = [
      {
        orgId: 'org-id-1',
        petId: crypto.randomUUID().toString(),
        requirements: [
          'Needs AC',
          'Needs a big yard',
        ],
      },
      {
        orgId: 'org-id-1',
        petId: crypto.randomUUID().toString(),
        requirements: [
          'Needs special food',
          'Needs a lot of attention',
        ],
      },
      {
        orgId: 'org-id-2',
        petId: crypto.randomUUID().toString(),
        requirements: [
          'Needs AC',
          'Needs a lot of attention',
        ],
      },
    ]

    for (const adoption of adoptions) {
      await adoptionsRepository.create(adoption)
    }

    const response = await sut.execute({
      itemsSize: 10,
      page: 1,
      address: {
        city: 'City XYZ',
        state: 'AL',
      }
    })

    expect(response.adoptions).toEqual([])
  })
})