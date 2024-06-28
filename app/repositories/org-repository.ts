import { Org as OrgModel, Prisma} from '@prisma/client';

export type OrgCreateInput = Prisma.XOR<Prisma.OrgCreateInput,Prisma.OrgUncheckedCreateInput>

export interface OrgRepository {
  create(data: OrgCreateInput): Promise<OrgModel>
  findByEmail(email: string): Promise<OrgModel | null>
}