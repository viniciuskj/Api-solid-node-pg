import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchCheckInsHistory } from '@/use-cases/factories/makeFetchCheckInHistoryUseCase'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.body)

  const checkInHistoryUseCase = makeFetchCheckInsHistory()

  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })
}
