import { Org as OrgModel, Prisma, Role} from '@prisma/client';

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
  },
  role: Role
}

export interface OrgRepository {
  create(data: OrgCreateInput): Promise<OrgModel>
  findByEmail(email: string): Promise<OrgModel | null>
}