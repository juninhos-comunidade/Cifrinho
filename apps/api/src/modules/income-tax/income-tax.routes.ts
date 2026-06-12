import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'

export async function incomeTaxRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  app.get('/income-tax/summary', authenticate, async (request) => {
    const userId = (request.user as any).sub
    const year = new Date().getFullYear()

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      include: { category: true },
    })

    const totalIncome = transactions
      .filter((t: { type: string; amount: unknown }) => t.type === 'INCOME')
      .reduce((sum: number, t: { amount: unknown }) => sum + Number(t.amount), 0)

    const totalExpenses = transactions
      .filter((t: { type: string; amount: unknown }) => t.type === 'EXPENSE')
      .reduce((sum: number, t: { amount: unknown }) => sum + Number(t.amount), 0)

    return {
      year,
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      transactionCount: transactions.length,
    }
  })
}
