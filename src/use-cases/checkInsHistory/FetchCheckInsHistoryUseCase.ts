import { CheckIn } from 'generated/prisma/client'
import { CheckInRepository } from '@/repositories/checkInRepository'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface FetchCheckInSchemaUseCaseRequest {
  userId: string
  page: number
}

interface FetchCheckInSchemaUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchCheckInSchemaUseCaseRequest): Promise<FetchCheckInSchemaUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
