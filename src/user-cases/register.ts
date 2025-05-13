import { UsersRepository } from '@/repositories/usersRepository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseSchema {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseSchema) {
    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
