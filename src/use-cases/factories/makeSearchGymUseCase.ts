import { SearchGymUseCase } from '../searchGym/searchGymsUseCase'
import { PrismaGymRepository } from '@/repositories/prisma/primaGymRepository'

export function makeSearchGymsUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const gymRepository = new PrismaGymRepository()
  const useCase = new SearchGymUseCase(gymRepository)

  return useCase
}
