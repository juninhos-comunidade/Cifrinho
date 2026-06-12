import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { buildApp } from './app.js'
import { prisma } from '../lib/prisma.js'
import type { FastifyInstance } from 'fastify'

const TEST_EMAIL = `test-auth-${Date.now()}@cifrinho.test`
const TEST_PASSWORD = 'senha123'
const TEST_NAME = 'Usuário Teste'

let app: FastifyInstance

beforeAll(async () => {
  app = await buildApp()
})

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { endsWith: '@cifrinho.test' } } })
  await app.close()
  await prisma.$disconnect()
})

describe('POST /auth/register', () => {
  it('cria conta e retorna 201 com dados do usuário', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { name: TEST_NAME, email: TEST_EMAIL, password: TEST_PASSWORD },
    })
    expect(res.statusCode).toBe(201)
    const body = res.json()
    expect(body.user).toMatchObject({ name: TEST_NAME, email: TEST_EMAIL })
    expect(body.user).not.toHaveProperty('password')
  })

  it('retorna 409 se e-mail já está cadastrado', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { name: TEST_NAME, email: TEST_EMAIL, password: TEST_PASSWORD },
    })
    expect(res.statusCode).toBe(409)
    expect(res.json().message).toMatch(/já cadastrado/i)
  })

  it('retorna 400 se e-mail for inválido', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { name: 'X', email: 'nao-é-email', password: '123456' },
    })
    expect(res.statusCode).toBe(400)
  })

  it('retorna 400 se senha for menor que 6 caracteres', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { name: 'Teste', email: 'outro@cifrinho.test', password: '123' },
    })
    expect(res.statusCode).toBe(400)
  })
})

describe('POST /auth/login', () => {
  it('autentica com credenciais válidas e seta cookie', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: TEST_EMAIL, password: TEST_PASSWORD },
    })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.user).toMatchObject({ email: TEST_EMAIL })
    expect(res.headers['set-cookie']).toBeDefined()
  })

  it('retorna 401 com senha errada', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: TEST_EMAIL, password: 'senha-errada' },
    })
    expect(res.statusCode).toBe(401)
    expect(res.json().message).toMatch(/credenciais inválidas/i)
  })

  it('retorna 401 com e-mail não cadastrado', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'naoexiste@cifrinho.test', password: TEST_PASSWORD },
    })
    expect(res.statusCode).toBe(401)
  })

  it('retorna 400 se payload estiver malformado', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'nao-é-email' },
    })
    expect(res.statusCode).toBe(400)
  })
})
