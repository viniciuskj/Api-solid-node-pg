import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { CreateCheckInUseCase } from './createCheckInUseCase'
import { InMemoryGymRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { Decimal } from 'generated/prisma/runtime/library'
import { MaxDistanceError } from '../errors/maxDistanceError'
import { MaxNUmberOfCheckInsError } from '../errors/maxNumbersOfCheckInsError'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CreateCheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CreateCheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-id-check-in',
      title: 'Academia Campinas',
      description: '',
      phone: '',
      latitude: -22.8347947,
      longitude: -47.0524421,
    })

    vi.useFakeTimers() // Usa com datas falsas
  })

  afterEach(() => {
    vi.useRealTimers() // Volta com as datas reais
  })

  it('should be able to create check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id-check-in',
      gymId: 'gym-id-check-in',
      userLatitude: -22.8347947,
      userLongitude: -47.0524421,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id-check-in',
      gymId: 'gym-id-check-in',
      userLatitude: -22.8347947,
      userLongitude: -47.0524421,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-check-in',
        gymId: 'gym-id-check-in',
        userLatitude: -22.8347947,
        userLongitude: -47.0524421,
      }),
    ).rejects.toBeInstanceOf(MaxNUmberOfCheckInsError)
  })

  it('should be able to check in twice in the different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id-check-in',
      gymId: 'gym-id-check-in',
      userLatitude: -22.8347947,
      userLongitude: -47.0524421,
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id-check-in',
      gymId: 'gym-id-check-in',
      userLatitude: -22.8347947,
      userLongitude: -47.0524421,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    // Limpa o array de academias antes de adicionar a nova
    gymRepository.items = []

    gymRepository.items.push({
      id: 'gym-id-check-in',
      title: 'Academia Campinas',
      description: '',
      phone: '',
      latitude: new Decimal(-22.8973591),
      longitude: new Decimal(-47.0492433),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-check-in',
        gymId: 'gym-id-check-in',
        userLatitude: -22.8347947,
        userLongitude: -47.0524421,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
