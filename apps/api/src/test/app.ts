import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { jwtPlugin } from '../plugins/jwt.js'
import { authRoutes } from '../modules/auth/auth.routes.js'

export async function buildApp() {
  const app = Fastify({ logger: false })

  // setErrorHandler ANTES dos plugins/rotas para ter escopo raiz
  app.setErrorHandler((error, _req, reply) => {
    if (error.name === 'ZodError') {
      return reply.status(400).send({ message: 'Dados inválidos.', errors: error.message })
    }
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  })

  await app.register(fastifyCookie)
  await app.register(jwtPlugin)
  await app.register(authRoutes)
  await app.ready()
  return app
}
