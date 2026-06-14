import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '../../lib/prisma.js'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
})

const DEFAULT_CATEGORIES: Array<{
  name: string
  icon: string
  color: string
  accountType: 'PERSONAL' | 'BUSINESS'
  transactionType: 'INCOME' | 'EXPENSE' | null
}> = [
  // Apenas saída (EXPENSE)
  {
    name: 'Alimentação',
    icon: '🍔',
    color: '#F59E0B',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Transporte',
    icon: '🚗',
    color: '#3B82F6',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Saúde',
    icon: '🏥',
    color: '#10B981',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Educação',
    icon: '📚',
    color: '#8B5CF6',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Lazer',
    icon: '🎮',
    color: '#EC4899',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Assinaturas',
    icon: '📱',
    color: '#6366F1',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Vestuário',
    icon: '👕',
    color: '#F43F5E',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  {
    name: 'Casa',
    icon: '🏠',
    color: '#84CC16',
    accountType: 'PERSONAL',
    transactionType: 'EXPENSE',
  },
  // Apenas entrada (INCOME)
  {
    name: 'Salário',
    icon: '💼',
    color: '#14B8A6',
    accountType: 'PERSONAL',
    transactionType: 'INCOME',
  },
  {
    name: 'Freelance',
    icon: '💻',
    color: '#0EA5E9',
    accountType: 'PERSONAL',
    transactionType: 'INCOME',
  },
  {
    name: 'Aluguel recebido',
    icon: '🏘️',
    color: '#22C55E',
    accountType: 'PERSONAL',
    transactionType: 'INCOME',
  },
  {
    name: 'Faturamento',
    icon: '📊',
    color: '#0EA5E9',
    accountType: 'BUSINESS',
    transactionType: 'INCOME',
  },
  // Ambos (null)
  {
    name: 'Investimentos',
    icon: '📈',
    color: '#22C55E',
    accountType: 'BUSINESS',
    transactionType: null,
  },
  {
    name: 'Transferência',
    icon: '↔️',
    color: '#94A3B8',
    accountType: 'PERSONAL',
    transactionType: null,
  },
  {
    name: 'Outros',
    icon: '📦',
    color: '#64748B',
    accountType: 'PERSONAL',
    transactionType: null,
  },
]

const IS_PROD = process.env.NODE_ENV === 'production'
const secure = IS_PROD ? '; Secure' : ''

function setAuthCookies(reply: any, token: string, rememberMe = false) {
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
  // JWT real — HttpOnly, invisível ao JS
  reply.header('Set-Cookie', [
    `token=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`,
    // flag de presença — lida pelo middleware Next.js para proteger rotas
    `auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`,
  ])
}

function clearAuthCookies(reply: any) {
  reply.header('Set-Cookie', [
    `token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`,
    `auth=; Path=/; Max-Age=0; SameSite=Lax${secure}`,
  ])
}

export async function authRoutes(app: FastifyInstance) {
  app.get('/auth/me', { preHandler: [app.authenticate] }, async (request, reply) => {
    const { sub } = request.user as { sub: string }
    const user = await prisma.user.findUnique({
      where: { id: sub },
      select: { id: true, name: true, email: true, createdAt: true },
    })
    if (!user) return reply.status(404).send({ message: 'Usuário não encontrado.' })
    return reply.send({ user })
  })

  app.post('/auth/logout', async (_request, reply) => {
    clearAuthCookies(reply)
    return reply.send({ ok: true })
  })

  app.post('/auth/seed-categories', { preHandler: [app.authenticate] }, async (request, reply) => {
    const { sub } = request.user as { sub: string }
    const existing = await prisma.category.findMany({
      where: { userId: sub },
      select: { name: true },
    })
    const existingNames = new Set(existing.map((c: { name: string }) => c.name))

    // Cria categorias que ainda não existem
    const toCreate = DEFAULT_CATEGORIES.filter((c) => !existingNames.has(c.name))
    if (toCreate.length > 0) {
      await prisma.category.createMany({
        data: toCreate.map((c) => ({ ...c, userId: sub })),
      })
    }

    // Atualiza transactionType das que já existem mas podem estar sem o campo
    await Promise.all(
      DEFAULT_CATEGORIES.filter((c) => existingNames.has(c.name)).map((c) =>
        prisma.category.updateMany({
          where: { userId: sub, name: c.name, transactionType: null },
          data: { transactionType: c.transactionType },
        })
      )
    )

    return reply.send({ created: toCreate.length })
  })

  app.delete('/auth/account', { preHandler: [app.authenticate] }, async (request, reply) => {
    const { sub } = request.user as { sub: string }
    await prisma.user.delete({ where: { id: sub } })
    clearAuthCookies(reply)
    return reply.send({ ok: true })
  })

  app.post('/auth/register', async (request, reply) => {
    const { name, email, password } = registerSchema.parse(request.body)

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return reply.status(409).send({ message: 'E-mail já cadastrado.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        categories: {
          create: DEFAULT_CATEGORIES,
        },
      },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    const token = app.jwt.sign({ sub: user.id }, { expiresIn: '7d' })
    setAuthCookies(reply, token)

    return reply.status(201).send({ user })
  })

  app.post('/auth/login', async (request, reply) => {
    const { email, password, rememberMe } = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' })
    }

    const token = app.jwt.sign({ sub: user.id }, { expiresIn: rememberMe ? '30d' : '7d' })
    setAuthCookies(reply, token, rememberMe)

    return reply.send({
      user: { id: user.id, name: user.name, email: user.email },
    })
  })
}
