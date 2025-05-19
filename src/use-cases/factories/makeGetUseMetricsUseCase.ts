import { GetUserMetricsUseCase } from '../getUseMetrics/getUserMetricsUseCase'
import { PrismaCheckInReposiotry } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeGetUserMetricsUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const checkInReposiotry = new PrismaCheckInReposiotry()
  const useCase = new GetUserMetricsUseCase(checkInReposiotry)

  return useCase
}
