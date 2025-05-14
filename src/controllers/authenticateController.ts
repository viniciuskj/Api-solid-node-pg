import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredencialErrors } from '@/use-cases/errors/invalideCredentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredencialErrors) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }

  return reply.status(200).send()
}
