import fastify from 'fastify'
import { usersRoutes } from './routes/userRoutes/routes'
import { ZodError } from 'zod'
import { env } from 'env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './routes/gymsRoutes/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)

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
