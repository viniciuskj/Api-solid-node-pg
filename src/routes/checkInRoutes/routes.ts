import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { history } from '@/controllers/checkInController/checkInHistoryController'
import { register } from '@/controllers/checkInController/registerCheckInController'
import { validate } from '@/controllers/checkInController/validateCheckInController'
import { metrics } from '@/controllers/checkInController/getUserMetricsCheckInController'

// Nao se usa get quando puxa body, apenas post
export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', register)
  app.patch('/check-ins/:checkInId/validate', validate)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
}
