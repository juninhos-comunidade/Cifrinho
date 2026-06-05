import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'

export interface Notification {
  id: string
  type: 'badge' | 'goal_completed' | 'goal_expired' | 'transaction_high'
  title: string
  desc: string
  time: string // ISO
}

export async function notificationRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  app.get('/notifications', authenticate, async (request) => {
    const userId = (request.user as any).sub
    const now = new Date()
    const notifications: Notification[] = []

    // 1. Badges conquistadas nos últimos 30 dias
    const recentBadges = await prisma.userBadge.findMany({
      where: {
        userId,
        earnedAt: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
      },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    })
    for (const ub of recentBadges) {
      notifications.push({
        id: `badge_${ub.id}`,
        type: 'badge',
        title: 'Badge desbloqueada!',
        desc: `Você conquistou "${ub.badge.name}". ${ub.badge.description}`,
        time: ub.earnedAt.toISOString(),
      })
    }

    // 2. Metas concluídas nos últimos 30 dias
    const completedGoals = await prisma.goal.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { completedAt: 'desc' },
    })
    for (const g of completedGoals) {
      notifications.push({
        id: `goal_done_${g.id}`,
        type: 'goal_completed',
        title: 'Meta concluída!',
        desc: `Você concluiu a meta "${g.name}" de ${Number(g.targetAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.`,
        time: g.completedAt!.toISOString(),
      })
    }

    // 3. Metas ativas que já passaram do prazo
    const activeGoals = await prisma.goal.findMany({
      where: { userId, status: 'ACTIVE' },
    })
    for (const g of activeGoals) {
      const deadline = new Date(g.startDate)
      deadline.setMonth(deadline.getMonth() + g.months)
      if (deadline < now) {
        notifications.push({
          id: `goal_exp_${g.id}`,
          type: 'goal_expired',
          title: 'Meta com prazo vencido',
          desc: `A meta "${g.name}" passou do prazo. Marque como concluída ou cancele.`,
          time: deadline.toISOString(),
        })
      }
    }

    // 4. Transações de alto valor nos últimos 7 dias (acima de R$ 500)
    const HIGH_VALUE = 500
    const recentTx = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'EXPENSE',
        amount: { gte: HIGH_VALUE },
        date: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
      },
      include: { category: true },
      orderBy: { date: 'desc' },
      take: 5,
    })
    for (const t of recentTx) {
      notifications.push({
        id: `tx_${t.id}`,
        type: 'transaction_high',
        title: 'Despesa de alto valor',
        desc: `${t.description} — ${Number(t.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}${t.category ? ` em ${t.category.name}` : ''}.`,
        time: t.date.toISOString(),
      })
    }

    // Ordena tudo do mais recente para o mais antigo
    notifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

    return { notifications, total: notifications.length }
  })
}
