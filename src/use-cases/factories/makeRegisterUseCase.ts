import { RegisterUseCase } from '../register/registerUseCase'
import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'

export function makeRegisterUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma caso querira trocar, ou seja não depende de repositório
  const prismaUsersRepository = new PrismaUserRepository()
  const useCase = new RegisterUseCase(prismaUsersRepository)

  return useCase
}
