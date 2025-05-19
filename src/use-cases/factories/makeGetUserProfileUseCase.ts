import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { GetUserProfileUseCase } from '../getUser/getUserUseCase'

export function makeGetUserProfileUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const usersRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
