import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository';
import { SignupOrgUseCase } from '../signup-org';

export function makeSignupOrg() {
  const orgRepository = new PrismaOrgRepository()
  const signupOrg = new SignupOrgUseCase(orgRepository)

  return signupOrg
}