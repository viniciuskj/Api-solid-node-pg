import { authenticate } from '@/controllers/authenticateController'
import { register } from '@/controllers/resgisterController'
import { profile } from '@/controllers/profileController'
import { FastifyInstance } from 'fastify'

// Nao se usa get quando puxa body, apenas post
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/profile', profile)
}
