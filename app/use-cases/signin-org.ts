import { OrgRepository } from '@/repositories/org-repository';
import { compare } from 'bcryptjs';

interface SigninOrgUseCaseRequest {
  email: string
  password: string
}

export class SigninOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    email,
    password
  }: SigninOrgUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new Error('Org not found');
    }

    const passwordMatch = await compare(password, org.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    return {
      org
    };
  }
}