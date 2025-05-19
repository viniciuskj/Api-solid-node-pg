import { Gym } from 'generated/prisma/client'
import { GymRepository } from '@/repositories/gymRepository'

interface FetchNearByGymSchemaUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymSchemaUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymSchemaUseCaseRequest): Promise<FetchNearByGymSchemaUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
