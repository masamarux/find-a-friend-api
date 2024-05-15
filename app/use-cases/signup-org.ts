import { env } from '@/env';
import { OrgRepository } from '@/repositories/org-repository';
import { hash } from 'bcryptjs';
import { Address } from './register-pet'; // acho q vou ter q generalizar essas tipagens

interface SignupOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  address: Address
  telephone: string
  password: string
}

export class SignupOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: SignupOrgUseCaseRequest) {
    const orgAlreadyExists = await this.orgRepository.findByEmail(data.email);

    if (orgAlreadyExists) {
      throw new Error('Org already exists');
    }

    const passwordHash = await hash(data.password, env.CRYPTO_SALT);

    const org = await this.orgRepository.create({
      ...data,
      password: passwordHash,
    });

    return {
      org
    };
  }
}