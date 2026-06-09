import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import { corsPlugin } from './plugins/cors.js'
import { jwtPlugin } from './plugins/jwt.js'
import { authRoutes } from './modules/auth/auth.routes.js'
import { transactionRoutes } from './modules/transactions/transactions.routes.js'
import { categoryRoutes } from './modules/categories/categories.routes.js'
import { badgeRoutes } from './modules/badges/badges.routes.js'
import { incomeTaxRoutes } from './modules/income-tax/income-tax.routes.js'
import { helpRoutes } from './modules/help/help.routes.js'
import { statementRoutes } from './modules/statements/statements.routes.js'
import { gamificationRoutes } from './modules/gamification/gamification.routes.js'
import { goalRoutes } from './modules/goals/goals.routes.js'
import { notificationRoutes } from './modules/notifications/notifications.routes.js'
import { healthRoutes } from './modules/health/health.routes.js'
import { statusRoutes } from './modules/status/status.routes.js'
import { roadmapRoutes } from './modules/roadmap/roadmap.routes.js'

const app = Fastify({ logger: true })

app.register(corsPlugin)
app.register(fastifyCookie)
app.register(fastifyMultipart, { limits: { fileSize: 5 * 1024 * 1024 } })
app.register(jwtPlugin)

app.register(authRoutes)
app.register(transactionRoutes)
app.register(categoryRoutes)
app.register(badgeRoutes)
app.register(incomeTaxRoutes)
app.register(helpRoutes)
app.register(statementRoutes)
app.register(gamificationRoutes)
app.register(goalRoutes)
app.register(notificationRoutes)
app.register(healthRoutes)
app.register(statusRoutes)
app.register(roadmapRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error.name === 'ZodError') {
    return reply.status(400).send({ message: 'Dados inválidos.', errors: error.message })
  }
  app.log.error(error)
  reply.status(500).send({ message: 'Erro interno do servidor.' })
})

const port = Number(process.env.PORT ?? 3333)

app.listen({ port, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
