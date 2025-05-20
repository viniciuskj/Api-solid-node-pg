import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/makeGetUseMetricsUseCase'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getMetricsCheckInUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getMetricsCheckInUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
