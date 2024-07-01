import { Address, Org } from '@prisma/client';
import { OrgCreateInput, OrgRepository } from '../org-repository';
import crypto from 'crypto';

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = [];
  async create(data: OrgCreateInput) {
    const address: Address = {
      id: crypto.randomUUID().toString(),
      cep: data.address.cep,
      city: data.address.city,
      neighborhood: data.address.neighborhood,
      number: data.address.number,
      state: data.address.state,
      street: data.address.street,
      created_at: new Date(),
      deleted_at: null,
    }
    const org = {
      id: crypto.randomUUID().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      address_id: address.id,
      address,
      telephone: data.telephone,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    this.orgs.push(org);

    return Promise.resolve(org);
  }
  findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.email === email);

    return Promise.resolve(org || null)
  }
}