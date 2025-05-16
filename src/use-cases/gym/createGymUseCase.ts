import { Gym } from 'generated/prisma/client'
import { GymRepository } from '@/repositories/gymRepository'

interface GymUseCaseSchema {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseSchemaResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCaseSchema): Promise<GymUseCaseSchemaResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
