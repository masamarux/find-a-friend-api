import { Prisma } from '@prisma/client';
import { OrgCreateInput, OrgRepository } from '../org-repository';
import { prisma } from '@/libs/prisma';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    });

    if(!org) {
      return null;
    }

    return org;
  }
}