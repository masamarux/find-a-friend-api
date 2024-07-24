import { EntityNotFoundError } from '@/errors/entity-not-found-error';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
import { OrgRepository } from '@/repositories/org-repository';
import { compare } from 'bcrypt';

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
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, org.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      org
    };
  }
}