import { OrgRepository } from '@/repositories/org-repository';
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

    // criptografar senha

    const org = await this.orgRepository.create(data);

    return org;
  }
}