import { Gym } from 'generated/prisma/client'
import { GymRepository } from '@/repositories/gymRepository'

interface SearchGymSchemaUseCaseSchema {
  query: string
  page: number
}

interface SearchGymSchemaUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymSchemaUseCaseSchema): Promise<SearchGymSchemaUseCaseResponse> {
    const gyms = await this.gymRepository.findByTitle(query, page)

    return {
      gyms,
    }
  }
}
