import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository';
import { SigninOrgUseCase } from '../signin-org';

export function makeSigninOrg() {
    const orgRepository = new PrismaOrgRepository();
    const signinOrg = new SigninOrgUseCase(orgRepository);
    return signinOrg;
}