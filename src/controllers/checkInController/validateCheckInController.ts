import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/makeValidateCheckInUseCase'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInBodySchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInBodySchema.parse(request.body)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
