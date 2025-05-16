import { CheckInRepository } from '@/repositories/checkInRepository'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface GetUserMetricsSchemaUseCaseRequest {
  userId: string
}

interface CheckUserMetricsSchemaUseCase {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsSchemaUseCaseRequest): Promise<CheckUserMetricsSchemaUseCase> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
