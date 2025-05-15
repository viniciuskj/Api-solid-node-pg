import { UsersRepository } from '@/repositories/usersRepository'
import { InvalidCredencialErrors } from '../errors/invalideCredentials'
import { compare } from 'bcryptjs'
import { User } from 'generated/prisma/client'

// Todo processo que esta dentro da palicação sempre vai ter as tipagens de entrada e saida, ou seja oque espero receber e devolver -interfaces
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialErrors()
    }
    // Clean-code, ser didatico com variáveis
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredencialErrors()
    }

    return {
      user,
    }
  }
}
