import { PrismaGymRepository } from '@/repositories/prisma/primaGymRepository'
import { FetchNearByGymUseCase } from '../fetchNearByGyms/fetchNearByGymsUseCase'

export function makeFetchNearByUseCase() {
  // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
  const gymRepository = new PrismaGymRepository()
  const useCase = new FetchNearByGymUseCase(gymRepository)

  return useCase
}
