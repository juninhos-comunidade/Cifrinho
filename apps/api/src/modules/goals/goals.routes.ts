import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

const createGoalSchema = z.object({
  name: z.string().min(1),
  targetAmount: z.number().positive(),
  months: z.union([z.literal(1), z.literal(2), z.literal(3)]),
})

// Categoria reservada para metas de economia
const SAVINGS_CATEGORY_NAME = 'Economia (meta)'

async function getOrCreateSavingsCategory(userId: string): Promise<string> {
  const existing = await prisma.category.findFirst({
    where: { userId, name: SAVINGS_CATEGORY_NAME },
  })
  if (existing) return existing.id

  const created = await prisma.category.create({
    data: {
      userId,
      name: SAVINGS_CATEGORY_NAME,
      icon: '🎯',
      color: '#14B8A6',
      accountType: 'PERSONAL',
      transactionType: 'EXPENSE',
    },
  })
  return created.id
}

export async function goalRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  // GET /goals
  app.get('/goals', authenticate, async (request) => {
    const userId = (request.user as any).sub
    return prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  })

  // POST /goals — cria meta e lança as despesas mensais automaticamente
  app.post('/goals', authenticate, async (request, reply) => {
    const userId = (request.user as any).sub
    const { name, targetAmount, months } = createGoalSchema.parse(request.body)

    const monthlyAmount = Math.ceil((targetAmount / months) * 100) / 100

    const goal = await prisma.goal.create({
      data: {
        userId,
        name,
        targetAmount,
        months,
        monthlyAmount,
      },
    })

    // Cria a categoria de economia se não existir
    const categoryId = await getOrCreateSavingsCategory(userId)

    // Lança uma despesa por mês a partir do mês atual
    const today = new Date()
    const txPromises = []
    for (let i = 0; i < months; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1)
      txPromises.push(
        prisma.transaction.create({
          data: {
            userId,
            description: `Meta: ${name}`,
            amount: monthlyAmount,
            type: 'EXPENSE',
            accountType: 'PERSONAL',
            date,
            categoryId,
          },
        })
      )
    }
    await Promise.all(txPromises)

    return reply.status(201).send(goal)
  })

  // PATCH /goals/:id/complete — marca meta como concluída
  app.patch('/goals/:id/complete', authenticate, async (request, reply) => {
    const userId = (request.user as any).sub
    const { id } = request.params as { id: string }

    const goal = await prisma.goal.findUnique({ where: { id } })
    if (!goal || goal.userId !== userId) {
      return reply.status(404).send({ message: 'Meta não encontrada.' })
    }
    if (goal.status !== 'ACTIVE') {
      return reply.status(400).send({ message: 'Meta já encerrada.' })
    }

    const updated = await prisma.goal.update({
      where: { id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })

    return reply.send(updated)
  })

  // DELETE /goals/:id — cancela meta
  app.delete('/goals/:id', authenticate, async (request, reply) => {
    const userId = (request.user as any).sub
    const { id } = request.params as { id: string }

    const goal = await prisma.goal.findUnique({ where: { id } })
    if (!goal || goal.userId !== userId) {
      return reply.status(404).send({ message: 'Meta não encontrada.' })
    }

    await prisma.goal.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    return reply.status(204).send()
  })
}
