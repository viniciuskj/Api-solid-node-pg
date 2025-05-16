import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { GetUserMetricsUseCase } from './getUserMetricsUseCase'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to count user check-ins', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
