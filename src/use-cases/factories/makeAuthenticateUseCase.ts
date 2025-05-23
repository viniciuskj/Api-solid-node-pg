import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { AuthenticateUseCase } from '../authenticate/authenticateUseCase'

export function makeAuthenticateUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const usersRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
