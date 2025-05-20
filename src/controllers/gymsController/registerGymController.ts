import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateGymUseCase } from '@/use-cases/factories/makeGymUseCase'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { title, description, phone, latitude, longitude } =
    registerGymBodySchema.parse(request.body)

  const registerGymUseCase = makeCreateGymUseCase()

  await registerGymUseCase.execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  })

  return reply.status(201).send()
}
