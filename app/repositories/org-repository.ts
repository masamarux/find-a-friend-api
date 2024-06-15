import { Org as OrgModel, Prisma} from '@prisma/client';
import { Address } from './pets-repository';

export interface OrgRepository {
  create: (data: Prisma.OrgUncheckedCreateInput) => Promise<void>
  findByEmail: (email: string) => Promise<OrgModel | null>
}