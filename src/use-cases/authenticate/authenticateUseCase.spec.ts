import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { AuthenticateUseCase } from './authenticateUseCase'
import { hash } from 'bcryptjs'
import { InvalidCredencialErrors } from '../errors/invalideCredentials'

let inMemoryRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryRepository.create({
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
    expect(() =>
      sut.execute({
        email: 'vinikk@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialErrors)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryRepository.create({
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
