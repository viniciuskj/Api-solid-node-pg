import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUserRepository } from '@/repositories/prisma/prismaUserRepository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredencialErrors } from '@/use-cases/errors/invalideCredentials'

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
    // SOLID - D - Inversão de depedencia, não dependemos do prisma, caso querira trocar, ou sej não depende de repositório
    const prismaUsersRepository = new PrismaUserRepository()
    const autheticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await autheticateUseCase.execute({
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
