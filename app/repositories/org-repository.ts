import { Org as OrgModel, Prisma} from '@prisma/client';

export type OrgCreateInput = {
  name: string
  email: string
  password: string
  telephone: string
  address: {
    cep: string
    city: string
    neighborhood: string
    number: string
    state: string
    street: string
  }
}

export interface OrgRepository {
  create(data: OrgCreateInput): Promise<OrgModel>
  findByEmail(email: string): Promise<OrgModel | null>
}