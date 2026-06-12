import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'
import OpenAI from 'openai'
import { createRequire } from 'module'
const _require = createRequire(import.meta.url)
const pdfParse: (buf: Buffer) => Promise<{ text: string }> = _require('pdf-parse')

// Usa OpenAI se a key estiver disponível, senão cai pro Groq (gratuito)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : new OpenAI({
      apiKey: process.env.GROQ_API_KEY ?? '',
      baseURL: 'https://api.groq.com/openai/v1',
    })

const AI_MODEL = process.env.OPENAI_API_KEY ? 'gpt-4o-mini' : 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Você é um assistente especializado em extratos bancários brasileiros.
Sua tarefa é extrair transações de um extrato e retornar um JSON estruturado.

Regras:
- Retorne SOMENTE um JSON válido, sem markdown, sem explicações.
- O JSON deve ser um array de objetos com esta estrutura exata:
  { "description": string, "amount": number, "type": "INCOME" | "EXPENSE", "date": "YYYY-MM-DD", "category": string }
- "amount" deve ser sempre positivo (o tipo já indica se é receita ou despesa).
- "type": INCOME para créditos/depósitos/recebimentos, EXPENSE para débitos/pagamentos/compras.
- "category" DEVE ser EXATAMENTE uma das opções abaixo, respeitando o tipo da transação:
  - Para EXPENSE: Alimentação, Transporte, Saúde, Educação, Lazer, Assinaturas, Vestuário, Casa, Investimentos, Transferência, Outros
  - Para INCOME: Salário, Freelance, Aluguel recebido, Faturamento, Investimentos, Transferência, Outros
- "date" no formato YYYY-MM-DD. Se não houver ano, use o ano atual.
- Ignore saldo, totais, cabeçalhos e rodapés — extraia apenas transações individuais.
- Descrições em português, limpas e legíveis.`

// Mesmo vocabulário usado no prompt — base para upsert de categorias
const CATEGORY_VOCAB: Record<
  string,
  {
    accountType: 'PERSONAL' | 'BUSINESS'
    icon: string
    color: string
    transactionType: 'INCOME' | 'EXPENSE' | null
  }
> = {
  Alimentação: {
    accountType: 'PERSONAL',
    icon: '🍔',
    color: '#F59E0B',
    transactionType: 'EXPENSE',
  },
  Transporte: { accountType: 'PERSONAL', icon: '🚗', color: '#3B82F6', transactionType: 'EXPENSE' },
  Saúde: { accountType: 'PERSONAL', icon: '🏥', color: '#10B981', transactionType: 'EXPENSE' },
  Educação: { accountType: 'PERSONAL', icon: '📚', color: '#8B5CF6', transactionType: 'EXPENSE' },
  Lazer: { accountType: 'PERSONAL', icon: '🎮', color: '#EC4899', transactionType: 'EXPENSE' },
  Assinaturas: {
    accountType: 'PERSONAL',
    icon: '📱',
    color: '#6366F1',
    transactionType: 'EXPENSE',
  },
  Vestuário: { accountType: 'PERSONAL', icon: '👕', color: '#F43F5E', transactionType: 'EXPENSE' },
  Casa: { accountType: 'PERSONAL', icon: '🏠', color: '#84CC16', transactionType: 'EXPENSE' },
  Salário: { accountType: 'PERSONAL', icon: '💼', color: '#14B8A6', transactionType: 'INCOME' },
  Freelance: { accountType: 'PERSONAL', icon: '💻', color: '#0EA5E9', transactionType: 'INCOME' },
  'Aluguel recebido': {
    accountType: 'PERSONAL',
    icon: '🏘️',
    color: '#22C55E',
    transactionType: 'INCOME',
  },
  Faturamento: { accountType: 'BUSINESS', icon: '📊', color: '#0EA5E9', transactionType: 'INCOME' },
  Investimentos: { accountType: 'BUSINESS', icon: '📈', color: '#22C55E', transactionType: null },
  Transferência: { accountType: 'PERSONAL', icon: '↔️', color: '#94A3B8', transactionType: null },
  Outros: { accountType: 'PERSONAL', icon: '📦', color: '#64748B', transactionType: null },
}

interface ParsedTransaction {
  description: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  date: string
  category: string
}

async function extractWithGPT(text: string): Promise<ParsedTransaction[]> {
  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    temperature: 0,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Extrato bancário:\n\n${text.slice(0, 12000)}` },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? '[]'
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
  return JSON.parse(cleaned) as ParsedTransaction[]
}

function parseCSV(text: string): string {
  return text
}

export async function statementRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] }

  app.post('/statements/parse', { ...authenticate }, async (request, reply) => {
    const userId = (request.user as any).sub

    const data = await (request as any).file()
    if (!data) {
      return reply.status(400).send({ message: 'Nenhum arquivo enviado.' })
    }

    const mimetype: string = data.mimetype ?? ''
    const filename: string = (data.filename ?? '').toLowerCase()

    const chunks: Buffer[] = []
    for await (const chunk of data.file) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    if (buffer.length > 5 * 1024 * 1024) {
      return reply.status(400).send({ message: 'Arquivo muito grande. Limite: 5 MB.' })
    }

    let rawText = ''

    if (mimetype === 'application/pdf' || filename.endsWith('.pdf')) {
      const parsed = await pdfParse(buffer)
      rawText = parsed.text
    } else if (
      mimetype === 'text/csv' ||
      mimetype === 'text/plain' ||
      filename.endsWith('.csv') ||
      filename.endsWith('.txt')
    ) {
      rawText = parseCSV(buffer.toString('utf-8'))
    } else if (filename.endsWith('.ofx') || mimetype === 'application/x-ofx') {
      rawText = buffer.toString('utf-8')
    } else {
      return reply.status(400).send({ message: 'Formato não suportado. Envie PDF, CSV ou OFX.' })
    }

    if (!rawText.trim()) {
      return reply.status(422).send({
        message: 'Não foi possível extrair texto do arquivo. O PDF pode estar escaneado (imagem).',
      })
    }

    const transactions = await extractWithGPT(rawText)

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return reply.status(422).send({ message: 'Nenhuma transação encontrada no extrato.' })
    }

    const categories = await prisma.category.findMany({ where: { userId } })

    const result = transactions.map((t) => {
      const matched = categories.find(
        (c: { name: string }) => c.name.toLowerCase() === t.category.toLowerCase()
      )
      return {
        description: t.description,
        amount: t.amount,
        type: t.type,
        date: t.date,
        suggestedCategory: t.category,
        categoryId: matched?.id ?? null,
      }
    })

    return reply.send({ transactions: result, total: result.length })
  })

  app.post('/transactions/batch', { ...authenticate }, async (request, reply) => {
    const userId = (request.user as any).sub
    const { transactions } = request.body as {
      transactions: Array<{
        description: string
        amount: number
        type: 'INCOME' | 'EXPENSE'
        accountType?: 'PERSONAL' | 'BUSINESS'
        date: string
        categoryId?: string | null
        suggestedCategory?: string
      }>
    }

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return reply.status(400).send({ message: 'Nenhuma transação para importar.' })
    }

    // Coleta nomes de categorias que precisam existir (sem categoryId mas com suggestedCategory)
    const needsUpsert = [
      ...new Set(
        transactions
          .filter((t) => !t.categoryId && t.suggestedCategory)
          .map((t) => t.suggestedCategory!)
      ),
    ]

    // Upsert de cada categoria sugerida — cria se não existir, ignora se já existir
    const upsertedMap: Record<string, string> = {}
    for (const name of needsUpsert) {
      const vocab = CATEGORY_VOCAB[name]
      const cat = await prisma.category.upsert({
        where: { userId_name: { userId, name } } as any,
        update: {},
        create: {
          name,
          userId,
          accountType: vocab?.accountType ?? 'PERSONAL',
          icon: vocab?.icon ?? null,
          color: vocab?.color ?? null,
        },
      })
      upsertedMap[name] = cat.id
    }

    const created = await prisma.$transaction(
      transactions.map((t) => {
        const resolvedCategoryId =
          t.categoryId ?? (t.suggestedCategory ? (upsertedMap[t.suggestedCategory] ?? null) : null)

        return prisma.transaction.create({
          data: {
            description: t.description,
            amount: t.amount,
            type: t.type,
            accountType: t.accountType ?? 'PERSONAL',
            date: new Date(t.date),
            userId,
            categoryId: resolvedCategoryId,
          },
          include: { category: true },
        })
      })
    )

    return reply.status(201).send({ imported: created.length, transactions: created })
  })
}
