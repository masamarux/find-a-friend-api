import { Prisma } from '@prisma/client';
import { OrgCreateInput, OrgRepository } from '../org-repository';
import { prisma } from '@/libs/prisma';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        telephone: data.telephone,
        address: {
          create: {
            cep: data.address.cep,
            city: data.address.city,
            neighborhood: data.address.neighborhood,
            number: data.address.number,
            state: data.address.state,
            street: data.address.street,
          }
        },
        role: data.role
      }
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