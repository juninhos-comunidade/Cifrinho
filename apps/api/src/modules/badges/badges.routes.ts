import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'

export async function badgeRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  app.get('/badges', authenticate, async () => {
    return prisma.badge.findMany()
  })

  app.get('/badges/me', authenticate, async (request) => {
    const userId = (request.user as any).sub
    return prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    })
  })
}
