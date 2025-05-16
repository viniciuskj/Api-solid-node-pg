import { CheckIn } from 'generated/prisma/client'
import { CheckInRepository } from '@/repositories/checkInRepository'
import { GymRepository } from '@/repositories/gymRepository'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'
import { getDistanceBetweenCoordinates } from '@/utils/getDistances'
import { MaxDistanceError } from '../errors/maxDistanceError'
import { MaxNUmberOfCheckInsError } from '../errors/maxNumbersOfCheckInsError'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface CheckInSchemaUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInSchemaUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInSchemaUseCaseRequest): Promise<CheckInSchemaUseCaseResponse> {
    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNUmberOfCheckInsError()
    }
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })
    return {
      checkIn,
    }
  }
}
