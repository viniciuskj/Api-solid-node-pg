import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { UserAlreadyExistsError } from './errors/userAlreadyExists'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(usersInMemoryRepository)

    const { user } = await registerUseCase.execute({
      name: 'Vinicius',
      email: 'vinikk@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registracion', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(usersInMemoryRepository)

    const { user } = await registerUseCase.execute({
      name: 'Vinicius',
      email: 'vinike@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(usersInMemoryRepository)

    const email = 'rodrigov@gmail.com'

    await registerUseCase.execute({
      name: 'Vinicius',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Vinicius',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
