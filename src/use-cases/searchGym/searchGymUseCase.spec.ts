import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { SearchGymUseCase } from './searchGymsUseCase'

let gymRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search Gym By Title Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to get gym by title', async () => {
    await gymRepository.create({
      title: 'Academia-Campinas',
      description: 'A melhor de Campinas!',
      phone: '19992332873',
      latitude: -23.0076957,
      longitude: -47.1183117,
    })

    await gymRepository.create({
      title: 'Academia-Jundiai',
      description: 'A melhor de Campinas!',
      phone: '19992332873',
      latitude: -23.0076957,
      longitude: -47.1183117,
    })

    const { gyms } = await sut.execute({
      query: 'Academia-Campinas',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia-Campinas' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Academia-${i}`,
        description: 'A melhor de Campinas!',
        phone: '19992332873',
        latitude: -23.0076957,
        longitude: -47.1183117,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia-21' }),
      expect.objectContaining({ title: 'Academia-22' }),
    ])
  })
})
