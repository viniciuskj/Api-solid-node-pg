import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { CheckInValidateUseCase } from './validateCheckInUseCase'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInValidateUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInValidateUseCase(checkInRepository)

    // await gymRepository.create({
    //   id: 'gym-id-check-in',
    //   title: 'Academia Campinas',
    //   description: '',
    //   phone: '',
    //   latitude: -22.8347947,
    //   longitude: -47.0524421,
    // })

    vi.useFakeTimers() // Usa com datas falsas
  })

  afterEach(() => {
    vi.useRealTimers() // Volta com as datas reais
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    // expect.any: seja qualquer um, expect.any(Date): Seja qualquer data
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    // expect.any: seja qualquer um, expect.any(Date): Seja qualquer data
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of his creation', async () => {
    // expect.any: seja qualquer um, expect.any(Date): Seja qualquer data
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // utc

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
