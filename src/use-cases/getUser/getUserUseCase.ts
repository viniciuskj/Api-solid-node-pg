import { UsersRepository } from '@/repositories/usersRepository'
import { User } from 'generated/prisma/client'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface GetUserProfileSchemaUseCaseRequest {
  userId: string
}

interface GetUserProfileSchemaUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileSchemaUseCaseRequest): Promise<GetUserProfileSchemaUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
