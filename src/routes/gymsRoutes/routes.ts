import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { search } from '@/controllers/gymsController/searchGymController'
import { nearby } from '@/controllers/gymsController/nearByController'
import { register } from '@/controllers/gymsController/registerGymController'

// Nao se usa get quando puxa body, apenas post
export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', register)
}
