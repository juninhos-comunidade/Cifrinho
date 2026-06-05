import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'

// XP por ação
const XP_RULES = {
  per_transaction: 10,
  per_badge: 100,
  streak_bonus_per_day: 5,
}

// Níveis: índice = nível, valor = XP mínimo para alcançar
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200, 6500]

const LEVEL_TITLES = [
  'Iniciante',
  'Organizado',
  'Consciente',
  'Poupador',
  'Investidor Iniciante',
  'Equilibrado',
  'Estrategista',
  'Mestre das Finanças',
  'Guru Financeiro',
  'Lendário',
  'Ícone Juninhos',
]

function calcLevel(xp: number): { level: number; title: string; currentXp: number; nextLevelXp: number; progress: number } {
  let level = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { level = i; break }
  }
  const currentLevelXp = LEVEL_THRESHOLDS[level]
  const nextLevelXp = LEVEL_THRESHOLDS[level + 1] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const progress = level >= LEVEL_THRESHOLDS.length - 1
    ? 100
    : Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)

  return {
    level: level + 1,
    title: LEVEL_TITLES[level] ?? 'Lendário',
    currentXp: xp,
    nextLevelXp,
    progress,
  }
}

// Avalia se o usuário cumpriu a condição de uma badge.
// As condições são strings como "transactions_1", "transactions_10", "streak_7", "income_1", etc.
async function checkCondition(condition: string, userId: string): Promise<boolean> {
  // goals_N — N metas criadas (qualquer status)
  if (condition.startsWith('goals_completed_')) {
    const value = Number(condition.split('_')[2])
    const count = await prisma.goal.count({ where: { userId, status: 'COMPLETED' } })
    return count >= value
  }

  if (condition.startsWith('goals_')) {
    const value = Number(condition.split('_')[1])
    const count = await prisma.goal.count({ where: { userId } })
    return count >= value
  }

  // business_investment_2 — 2 transações BUSINESS na categoria "Investimentos"
  if (condition === 'business_investment_2') {
    const count = await prisma.transaction.count({
      where: {
        userId,
        accountType: 'BUSINESS',
        category: { name: 'Investimentos' },
      },
    })
    return count >= 2
  }

  const [type, rawValue] = condition.split('_')
  const value = Number(rawValue)

  if (type === 'transactions') {
    const count = await prisma.transaction.count({ where: { userId } })
    return count >= value
  }

  if (type === 'expense') {
    const count = await prisma.transaction.count({ where: { userId, type: 'EXPENSE' } })
    return count >= value
  }

  if (type === 'income') {
    const count = await prisma.transaction.count({ where: { userId, type: 'INCOME' } })
    return count >= value
  }

  if (type === 'categories') {
    const count = await prisma.category.count({ where: { userId } })
    return count >= value
  }

  if (type === 'streak') {
    const txs = await prisma.transaction.findMany({
      where: { userId },
      select: { date: true },
      orderBy: { date: 'desc' },
    })
    if (txs.length === 0) return false

    const days = new Set(txs.map(t => t.date.toISOString().slice(0, 10)))
    let streak = 0
    const today = new Date()
    for (let i = 0; i < value + 30; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      if (days.has(d.toISOString().slice(0, 10))) {
        streak++
        if (streak >= value) return true
      } else if (streak > 0) {
        break
      }
    }
    return false
  }

  return false
}

export async function gamificationRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  // GET /gamification/progress — retorna XP, nível, badges e executa desbloqueio automático
  app.get('/gamification/progress', authenticate, async (request) => {
    const userId = (request.user as any).sub

    // Busca todas as badges e as já conquistadas
    const [allBadges, myBadgeRecords] = await Promise.all([
      prisma.badge.findMany(),
      prisma.userBadge.findMany({ where: { userId }, include: { badge: true } }),
    ])

    const earnedIds = new Set(myBadgeRecords.map(ub => ub.badgeId))

    // Testa condições das badges ainda não conquistadas
    const newlyUnlocked: typeof allBadges = []
    for (const badge of allBadges) {
      if (earnedIds.has(badge.id)) continue
      if (badge.condition && await checkCondition(badge.condition, userId)) {
        await prisma.userBadge.create({ data: { userId, badgeId: badge.id } })
        newlyUnlocked.push(badge)
        earnedIds.add(badge.id)
      }
    }

    const totalBadges = earnedIds.size
    const txCount = await prisma.transaction.count({ where: { userId } })

    // XP: 10 por transação + 100 por badge
    const xp = txCount * XP_RULES.per_transaction + totalBadges * XP_RULES.per_badge

    const levelInfo = calcLevel(xp)

    const earned = [
      ...myBadgeRecords.map(ub => ub.badge),
      ...newlyUnlocked,
    ]
    const locked = allBadges.filter(b => !earnedIds.has(b.id))

    return {
      xp,
      ...levelInfo,
      txCount,
      badgesEarned: earned.length,
      badgesTotal: allBadges.length,
      earned,
      locked,
      newlyUnlocked,
    }
  })

  // POST /gamification/check-badges — chamado após criar/deletar transação para desbloqueio reativo
  app.post('/gamification/check-badges', authenticate, async (request) => {
    const userId = (request.user as any).sub

    const [allBadges, myBadgeRecords] = await Promise.all([
      prisma.badge.findMany(),
      prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } }),
    ])

    const earnedIds = new Set(myBadgeRecords.map(ub => ub.badgeId))
    const newlyUnlocked: typeof allBadges = []

    for (const badge of allBadges) {
      if (earnedIds.has(badge.id)) continue
      if (badge.condition && await checkCondition(badge.condition, userId)) {
        await prisma.userBadge.create({ data: { userId, badgeId: badge.id } })
        newlyUnlocked.push(badge)
      }
    }

    return { newlyUnlocked, count: newlyUnlocked.length }
  })
}
