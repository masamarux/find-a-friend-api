import { OrgRepository } from '@/repositories/org-repository';

interface SigninOrgUseCaseRequest {
  email: string
  password: string
}

export class SigninOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: SigninOrgUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(data.email);

    if (!org) {
      throw new Error('Org not found');
    }

    // verificar senha

    return org;
  }
}