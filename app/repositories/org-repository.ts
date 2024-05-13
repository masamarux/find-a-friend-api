import { Org as OrgModel } from '@prisma/client';
import { Address } from './pets-repository';

interface Org {
  name: string
  email: string
  cep: string
  address: Address
  telephone: string
  password: string
}

export interface OrgRepository {
  create: (data: Org) => Promise<void>
  findByEmail: (email: string) => Promise<OrgModel>
}