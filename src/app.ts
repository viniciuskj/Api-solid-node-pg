import fastify from 'fastify'
import { appRoutes } from './routes/routes'

export const app = fastify()

app.register(appRoutes)
