import { PrismaCheckInReposiotry } from '@/repositories/prisma/prismaCheckInsRepository'
import { CheckInValidateUseCase } from '../validateCheckIn/validateCheckInUseCase'

export function makeValidateCheckInUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const checkInReposiotry = new PrismaCheckInReposiotry()
  const useCase = new CheckInValidateUseCase(checkInReposiotry)

  return useCase
}
