import fastify from 'fastify'
import { appRoutes } from './routes/routes'
import { ZodError } from 'zod'
import { env } from 'env'

export const app = fastify()

app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // Deve fazer um log pra um tratamento externo
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
