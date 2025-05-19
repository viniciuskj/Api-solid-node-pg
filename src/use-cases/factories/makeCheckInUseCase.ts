import { CheckInUseCase } from '../checkIn/checkInUseCase'
import { PrismaCheckInReposiotry } from '@/repositories/prisma/prismaCheckInsRepository'
import { PrismaGymRepository } from '@/repositories/prisma/primaGymRepository'

export function makeCheckInUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const checkInReposiotry = new PrismaCheckInReposiotry()
  const gymRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(checkInReposiotry, gymRepository)

  return useCase
}
