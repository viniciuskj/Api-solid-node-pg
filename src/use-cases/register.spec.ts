import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { UserAlreadyExistsError } from './errors/userAlreadyExists'

let inMemoryRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(inMemoryRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Vinicius',
      email: 'vinikk@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registracion', async () => {
    const { user } = await sut.execute({
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
    const email = 'rodrigov@gmail.com'

    await sut.execute({
      name: 'Vinicius',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Vinicius',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
