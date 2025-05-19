import { FetchCheckInUseCase } from '../checkInsHistory/FetchCheckInsHistoryUseCase'
import { PrismaCheckInReposiotry } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeFetchCheckInsHistory() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const checkInReposiotry = new PrismaCheckInReposiotry()
  const useCase = new FetchCheckInUseCase(checkInReposiotry)

  return useCase
}
