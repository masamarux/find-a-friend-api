import { Prisma } from '@prisma/client';
import { OrgRepository } from '../org-repository';
import { prisma } from '@/libs/prisma';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    await prisma.org.create({
      data
    });
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