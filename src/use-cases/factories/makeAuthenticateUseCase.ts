import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const prismaUsersRepository = new PrismaUserRepository()
  const autheticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return autheticateUseCase
}
