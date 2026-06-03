import Fastify from 'fastify'
import { corsPlugin } from './plugins/cors.js'
import { jwtPlugin } from './plugins/jwt.js'
import { authRoutes } from './modules/auth/auth.routes.js'
import { transactionRoutes } from './modules/transactions/transactions.routes.js'
import { categoryRoutes } from './modules/categories/categories.routes.js'
import { badgeRoutes } from './modules/badges/badges.routes.js'
import { incomeTaxRoutes } from './modules/income-tax/income-tax.routes.js'
import { helpRoutes } from './modules/help/help.routes.js'

const app = Fastify({ logger: true })

app.register(corsPlugin)
app.register(jwtPlugin)

app.register(authRoutes)
app.register(transactionRoutes)
app.register(categoryRoutes)
app.register(badgeRoutes)
app.register(incomeTaxRoutes)
app.register(helpRoutes)

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
