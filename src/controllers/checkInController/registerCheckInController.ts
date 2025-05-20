import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateCheckInUseCase } from '@/use-cases/factories/makeCheckInUseCase'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const registerCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { gymId } = registerCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = registerCheckInBodySchema.parse(request.body)

  const registerCheckInUseCase = makeCreateCheckInUseCase()

  await registerCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
