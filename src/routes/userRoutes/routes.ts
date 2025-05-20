import { authenticate } from '@/controllers/authenticateController'
import { register } from '@/controllers/resgisterController'
import { profile } from '@/controllers/profileController'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt-verify'

// Nao se usa get quando puxa body, apenas post
export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}
