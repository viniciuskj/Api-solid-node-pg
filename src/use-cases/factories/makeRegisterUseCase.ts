import { RegisterUseCase } from '../register'
import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'

export function makeRegisterUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const prismaUsersRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
