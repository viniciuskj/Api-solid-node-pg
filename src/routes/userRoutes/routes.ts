import { authenticate } from '@/controllers/usersController/authenticateController'
import { register } from '@/controllers/usersController/resgisterController'
import { profile } from '@/controllers/usersController/profileController'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { refresh } from '@/controllers/usersController/refreshController'

// Nao se usa get quando puxa body, apenas post
export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}
