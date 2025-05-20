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

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredencialErrors) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
}
