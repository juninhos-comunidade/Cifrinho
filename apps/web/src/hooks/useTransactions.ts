import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Category {
  id: string
  name: string
  icon: string | null
  color: string | null
  accountType: 'PERSONAL' | 'BUSINESS'
  transactionType: 'INCOME' | 'EXPENSE' | null
}

export interface Transaction {
  id: string
  description: string
  amount: string
  type: 'INCOME' | 'EXPENSE'
  accountType: 'PERSONAL' | 'BUSINESS'
  date: string
  categoryId: string | null
  userId: string
  category: Category | null
}

async function fetchTransactions(): Promise<Transaction[]> {
  const { data } = await api.get<Transaction[]>('/transactions')
  return data
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })
}

// ── helpers de agregação ──────────────────────────────────────────────────────

export function fmt(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function isCurrentMonth(dateStr: string): boolean {
  const d = new Date(dateStr)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

function isPrevMonth(dateStr: string): boolean {
  const d = new Date(dateStr)
  const now = new Date()
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear()
}

export function calcOverview(txs: Transaction[]) {
  const curIncome   = txs.filter(t => t.type === 'INCOME'  && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const curExpense  = txs.filter(t => t.type === 'EXPENSE' && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const prevIncome  = txs.filter(t => t.type === 'INCOME'  && isPrevMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const prevExpense = txs.filter(t => t.type === 'EXPENSE' && isPrevMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)

  const balance = txs.reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)

  const personalBalance  = txs.filter(t => t.accountType === 'PERSONAL').reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)
  const businessBalance  = txs.filter(t => t.accountType === 'BUSINESS').reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)

  const savingsRate = curIncome > 0 ? Math.round(((curIncome - curExpense) / curIncome) * 100) : 0

  function delta(cur: number, prev: number): string {
    if (prev === 0) return cur > 0 ? '+100%' : '0%'
    const pct = ((cur - prev) / prev) * 100
    return (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%'
  }

  return {
    balance,
    personalBalance,
    businessBalance,
    curIncome,
    curExpense,
    savingsRate,
    deltaIncome: delta(curIncome, prevIncome),
    deltaExpense: delta(curExpense, prevExpense),
  }
}

export function calcMonthlyBars(txs: Transaction[]) {
  const now = new Date()
  const months: { month: string; in: number; out: number; current?: boolean }[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleString('pt-BR', { month: 'short' })
      .replace('.', '').replace(/^\w/, c => c.toUpperCase())
    const inc = txs.filter(t => {
      const td = new Date(t.date)
      return t.type === 'INCOME' && td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear()
    }).reduce((s, t) => s + Number(t.amount), 0)
    const exp = txs.filter(t => {
      const td = new Date(t.date)
      return t.type === 'EXPENSE' && td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear()
    }).reduce((s, t) => s + Number(t.amount), 0)
    months.push({ month: label, in: inc, out: exp, ...(i === 0 ? { current: true } : {}) })
  }

  const maxVal = Math.max(...months.flatMap(m => [m.in, m.out]), 1)
  return months.map(m => ({
    ...m,
    inH: Math.round((m.in / maxVal) * 160),
    outH: Math.round((m.out / maxVal) * 160),
  }))
}

export function calcPersonal(txs: Transaction[]) {
  const personal = txs.filter(t => t.accountType === 'PERSONAL')
  const curIncome  = personal.filter(t => t.type === 'INCOME'  && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const curExpense = personal.filter(t => t.type === 'EXPENSE' && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const balance    = personal.reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)

  const byCategory: Record<string, { name: string; total: number }> = {}
  for (const t of personal.filter(t => t.type === 'EXPENSE' && isCurrentMonth(t.date))) {
    const key = t.categoryId ?? 'other'
    const name = t.category?.name ?? 'Outros'
    if (!byCategory[key]) byCategory[key] = { name, total: 0 }
    byCategory[key].total += Number(t.amount)
  }

  const categories = Object.values(byCategory)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map(c => ({ ...c, pct: curExpense > 0 ? Math.round((c.total / curExpense) * 100) : 0 }))

  return { balance, curIncome, curExpense, categories }
}

export function calcBusiness(txs: Transaction[]) {
  const biz = txs.filter(t => t.accountType === 'BUSINESS')
  const curIncome  = biz.filter(t => t.type === 'INCOME'  && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const curExpense = biz.filter(t => t.type === 'EXPENSE' && isCurrentMonth(t.date)).reduce((s, t) => s + Number(t.amount), 0)
  const balance    = biz.reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)

  const MEI_LIMIT = 81000
  const yearIncome = biz.filter(t => {
    const d = new Date(t.date)
    return t.type === 'INCOME' && d.getFullYear() === new Date().getFullYear()
  }).reduce((s, t) => s + Number(t.amount), 0)
  const meiPct = Math.min(Math.round((yearIncome / MEI_LIMIT) * 100), 100)

  return { balance, curIncome, curExpense, meiPct, yearIncome }
}

const CATEGORY_COLORS = [
  'rgb(var(--c-brand))',
  'rgb(var(--c-blue))',
  'rgb(var(--c-purple))',
  'rgb(var(--c-amber))',
  'rgb(var(--c-rose))',
  'rgb(var(--c-faint))',
]

export interface PieSlice {
  name: string
  total: number
  pct: number
  color: string
}

export function calcCategoryPie(
  txs: Transaction[],
  type: 'INCOME' | 'EXPENSE',
  year: number,
  month: number, // 0-indexed
): PieSlice[] {
  const filtered = txs.filter(t => {
    const d = new Date(t.date)
    return t.type === type && d.getFullYear() === year && d.getMonth() === month
  })

  const total = filtered.reduce((s, t) => s + Number(t.amount), 0)
  if (total === 0) return []

  const byCategory: Record<string, number> = {}
  for (const t of filtered) {
    const key = t.category?.name ?? 'Outros'
    byCategory[key] = (byCategory[key] ?? 0) + Number(t.amount)
  }

  const sorted = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])

  const top = sorted.slice(0, 5)
  const rest = sorted.slice(5).reduce((s, [, v]) => s + v, 0)
  if (rest > 0) top.push(['Outros', rest])

  return top.map(([name, value], i) => ({
    name,
    total: value,
    pct: Math.round((value / total) * 100),
    color: CATEGORY_COLORS[i] ?? CATEGORY_COLORS[CATEGORY_COLORS.length - 1],
  }))
}

export function calcCashFlowBars(txs: Transaction[], accountType: 'PERSONAL' | 'BUSINESS') {
  const now = new Date()
  const filtered = txs.filter(t => t.accountType === accountType)
  const months: { m: string; net: number; cur?: boolean }[] = []

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleString('pt-BR', { month: 'short' })
      .replace('.', '').replace(/^\w/, c => c.toUpperCase())
    const net = filtered.filter(t => {
      const td = new Date(t.date)
      return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear()
    }).reduce((s, t) => t.type === 'INCOME' ? s + Number(t.amount) : s - Number(t.amount), 0)
    months.push({ m: label, net, ...(i === 0 ? { cur: true } : {}) })
  }

  const maxVal = Math.max(...months.map(m => Math.abs(m.net)), 1)
  return months.map(m => ({ ...m, h: Math.max(Math.round((Math.abs(m.net) / maxVal) * 140), 4) }))
}
