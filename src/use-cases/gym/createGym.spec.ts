import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { CreateGymUseCase } from './createGymUseCase'

let inMemoryRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(inMemoryRepository)
  })

  it('should be able to register gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Campinas',
      description: 'A melhor de Campinas!',
      phone: '19992332873',
      latitude: -23.0076957,
      longitude: -47.1183117,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
