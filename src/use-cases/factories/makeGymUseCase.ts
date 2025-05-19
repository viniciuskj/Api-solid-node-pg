import { CreateGymUseCase } from '../gym/createGymUseCase'
import { PrismaGymRepository } from '@/repositories/prisma/primaGymRepository'

export function makeGymUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const gymRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(gymRepository)

  return useCase
}
