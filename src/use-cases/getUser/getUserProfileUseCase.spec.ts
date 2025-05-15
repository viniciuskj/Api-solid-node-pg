import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './getUserUseCase'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let inMemoryRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(inMemoryRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryRepository.create({
      name: 'Vinicius',
      email: 'vinikk@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Vinicius')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
