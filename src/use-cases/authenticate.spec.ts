import { it, describe, expect } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredencialErrors } from './errors/invalideCredentials'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersInMemoryRepository)

    await usersInMemoryRepository.create({
      name: 'Vinicius',
      email: 'vinikk@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'vinikk@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersInMemoryRepository)

    expect(() =>
      sut.execute({
        email: 'vinikk@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialErrors)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersInMemoryRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersInMemoryRepository)

    await usersInMemoryRepository.create({
      name: 'Vinicius',
      email: 'vinikk@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'vinikk@gmail.com',
        password: '123453',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialErrors)
  })
})
