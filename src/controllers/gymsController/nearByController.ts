import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearByUseCase } from '@/use-cases/factories/makeFetchNearByUseCase'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearByGymBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { latitude, longitude } = nearByGymBodySchema.parse(request.query)

  const nearByGymUseCase = makeFetchNearByUseCase()

  const { gyms } = await nearByGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    gyms,
  })
}
