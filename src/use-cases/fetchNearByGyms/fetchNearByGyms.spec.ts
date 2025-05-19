import { it, describe, expect, beforeEach } from 'vitest'
import { FetchNearByGymUseCase } from './fetchNearByGymsUseCase'
import { InMemoryGymRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

let gymRepository: InMemoryGymRepository
let sut: FetchNearByGymUseCase

describe('Fetch Near By Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearByGymUseCase(gymRepository)
  })

  it('should be able to fetch near by gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: 'A melhor Acad-1!',
      phone: '19992332873',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymRepository.create({
      title: 'Far Gym',
      description: 'A melhor Acad!',
      phone: '19992332873',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
