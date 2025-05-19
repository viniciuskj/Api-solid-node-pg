import { CheckIn } from 'generated/prisma/client'
import { CheckInRepository } from '@/repositories/checkInRepository'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from '../errors/lateCheckInValidateError'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface CheckInValidateSchemaUseCaseRequest {
  checkInId: string
}

interface CheckInValidateSchemaUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInValidateUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: CheckInValidateSchemaUseCaseRequest): Promise<CheckInValidateSchemaUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
