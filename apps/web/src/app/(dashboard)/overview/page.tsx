'use client'

import { useState, useMemo } from 'react'
import {
  useTransactions,
  calcOverview,
  calcMonthlyBars,
  calcCategoryPie,
  fmt,
  type Transaction,
  type PieSlice,
} from '@/hooks/useTransactions'
import { useAuth } from '@/contexts/AuthContext'
import { TransactionModal } from '@/components/ui/TransactionModal'
import { StatementImportModal } from '@/components/ui/StatementImportModal'
import { GoalModal } from '@/components/ui/GoalModal'
import { useGoals } from '@/hooks/useGoals'

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-line/40 ${className ?? ''}`} />
}

function PieChart({
  slices,
  total,
  fmt,
}: {
  slices: PieSlice[]
  total: number
  fmt: (n: number) => string
}) {
  const cx = 50,
    cy = 50,
    r = 38
  const circumference = 2 * Math.PI * r
  let offset = 0

  const paths = slices.map((s) => {
    const len = (s.pct / 100) * circumference
    const path = {
      slice: s,
      dasharray: `${len - 1.5} ${circumference - len + 1.5}`,
      dashoffset: -offset,
    }
    offset += len
    return path
  })

  return (
    <div className="relative h-[120px] w-[120px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-[120px] w-[120px] -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(var(--c-line))" strokeWidth="12" />
        {paths.map(({ slice, dasharray, dashoffset }, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={slice.color}
            strokeWidth="12"
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
          />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-[11px] font-extrabold text-ink leading-tight">{fmt(total)}</p>
          <p className="text-[9px] text-mute">total</p>
        </div>
      </div>
    </div>
  )
}

export default function OverviewPage() {
  const { data: txs, isLoading, isError } = useTransactions()
  const { firstName } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [importOpen, setImportOpen] = useState(false)
  const [goalOpen, setGoalOpen] = useState(false)
  const { active: activeGoals, complete: completeGoal } = useGoals()

  const now = new Date()
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth())
  const [pieType, setPieType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE')

  const pieSlices = useMemo(
    () => (txs ? calcCategoryPie(txs, pieType, selectedYear, selectedMonth) : []),
    [txs, pieType, selectedYear, selectedMonth]
  )

  const monthLabel = new Date(selectedYear, selectedMonth, 1).toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  function openNew() {
    setEditing(null)
    setModalOpen(true)
  }
  function openEdit(t: Transaction) {
    setEditing(t)
    setModalOpen(true)
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-mute">
        Não foi possível carregar os dados. Verifique sua conexão.
      </div>
    )
  }

  if (isLoading || !txs) {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Skeleton className="h-72 rounded-lg" />
          <Skeleton className="h-72 rounded-lg" />
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    )
  }

  const { balance, curIncome, curExpense, savingsRate, deltaIncome, deltaExpense } =
    calcOverview(txs)
  const bars = calcMonthlyBars(txs)
  const recent = txs.slice(0, 5)

  const kpis = [
    {
      label: 'Saldo consolidado',
      value: fmt(balance),
      delta: `${deltaIncome} vs. mês anterior`,
      deltaColor: balance >= 0 ? 'text-brand' : 'text-rose',
      up: balance >= 0,
      iconBg: 'bg-brand/15 text-brand',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      label: 'Receitas do mês',
      value: fmt(curIncome),
      delta: `${deltaIncome} vs. mês anterior`,
      deltaColor: 'text-brand',
      up: true,
      iconBg: 'bg-blue/15 text-blue',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      ),
    },
    {
      label: 'Despesas do mês',
      value: fmt(curExpense),
      delta: `${deltaExpense} vs. mês anterior`,
      deltaColor: 'text-rose',
      up: false,
      iconBg: 'bg-rose/15 text-rose',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ),
    },
    {
      label: 'Taxa de poupança',
      value: `${savingsRate}%`,
      delta: savingsRate >= 20 ? 'Meta de 20% atingida' : 'Meta: 20%',
      deltaColor: savingsRate >= 20 ? 'text-brand' : 'text-amber',
      up: savingsRate >= 20,
      iconBg: 'bg-purple/15 text-purple',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
          <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <TransactionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        editing={editing}
      />
      <StatementImportModal open={importOpen} onClose={() => setImportOpen(false)} />
      <GoalModal open={goalOpen} onClose={() => setGoalOpen(false)} />

      <div>
        <div className="mb-4 flex items-center justify-between">
          {firstName && (
            <p className="text-sm text-mute">
              Olá, <span className="font-semibold text-ink">{firstName}</span>. Aqui está seu resumo
              financeiro.
            </p>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setImportOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-card px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-brand/50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Importar extrato
            </button>
            <button
              onClick={openNew}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dk"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Lançar
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="rounded-lg border border-line bg-card p-5 elev-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-mute">{kpi.label}</p>
                <span className={`grid h-8 w-8 place-items-center rounded-md ${kpi.iconBg}`}>
                  {kpi.icon}
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{kpi.value}</p>
              <p
                className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${kpi.deltaColor}`}
              >
                {kpi.up ? (
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m6 15 6-6 6 6" />
                  </svg>
                ) : (
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
                {kpi.delta}
              </p>
            </div>
          ))}
        </div>

        {/* gráfico de barras + pizza de categorias */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* barras — Receitas × Despesas */}
          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-ink">Receitas × Despesas</h3>
                <p className="text-xs text-mute">Últimos 7 meses</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-brand"></span>
                  Receitas
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-line"></span>
                  Despesas
                </span>
              </div>
            </div>
            <div className="mt-6 flex h-52 items-end justify-between gap-3 sm:gap-5">
              {bars.map((m) => (
                <div
                  key={m.month}
                  className="flex flex-1 cursor-pointer flex-col items-center gap-2"
                  onClick={() => {
                    const idx = bars.indexOf(m)
                    const d = new Date(
                      now.getFullYear(),
                      now.getMonth() - (bars.length - 1 - idx),
                      1
                    )
                    setSelectedYear(d.getFullYear())
                    setSelectedMonth(d.getMonth())
                  }}
                >
                  <div className="flex w-full items-end justify-center gap-1">
                    <div className="bar w-1/2 bg-brand" style={{ height: m.inH || 4 }}></div>
                    <div className="bar w-1/2 bg-line" style={{ height: m.outH || 4 }}></div>
                  </div>
                  <span
                    className={`text-[11px] ${m.current ? 'font-semibold text-ink' : 'text-faint'}`}
                  >
                    {m.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* pizza — gastos por categoria */}
          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-ink">Por categoria</h3>
                <p className="text-xs text-mute capitalize">{monthLabel}</p>
              </div>
              <div className="seg shrink-0">
                <button
                  className={pieType === 'EXPENSE' ? 'on' : ''}
                  onClick={() => setPieType('EXPENSE')}
                >
                  Despesas
                </button>
                <button
                  className={pieType === 'INCOME' ? 'on' : ''}
                  onClick={() => setPieType('INCOME')}
                >
                  Receitas
                </button>
              </div>
            </div>

            {pieSlices.length === 0 ? (
              <div className="mt-6 flex flex-col items-center justify-center gap-2 py-8 text-center">
                <svg
                  className="h-10 w-10 text-faint"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
                <p className="text-sm text-mute">Sem lançamentos neste mês</p>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-5">
                {/* SVG pizza */}
                <PieChart
                  slices={pieSlices}
                  total={pieSlices.reduce((s, p) => s + p.total, 0)}
                  fmt={fmt}
                />

                {/* legenda */}
                <div className="flex-1 space-y-2 overflow-hidden">
                  {pieSlices.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-sm"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="min-w-0 flex-1 truncate text-xs text-mute">{s.name}</span>
                      <span className="text-xs font-semibold text-ink">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* transações recentes */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-line bg-card elev-sm">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-base font-bold text-ink">Transações recentes</h3>
              <a href="/personal" className="text-xs font-bold text-brand hover:underline">
                Ver todas
              </a>
            </div>
            {recent.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <p className="text-sm text-mute">Nenhuma transação ainda.</p>
                <button onClick={openNew} className="text-sm font-bold text-brand hover:underline">
                  Fazer primeiro lançamento
                </button>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {recent.map((t) => {
                  const isIncome = t.type === 'INCOME'
                  return (
                    <button
                      key={t.id}
                      onClick={() => openEdit(t)}
                      className="flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors hover:bg-elev/50"
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${isIncome ? 'bg-brand/12 text-brand' : 'bg-rose/12 text-rose'}`}
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          {isIncome ? (
                            <>
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </>
                          ) : (
                            <>
                              <path d="M12 5v14M5 12l7 7 7-7" />
                            </>
                          )}
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{t.description}</p>
                        <p className="text-xs text-mute">
                          {t.accountType === 'PERSONAL' ? 'Pessoal' : 'Empresarial'} ·{' '}
                          {new Date(t.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </p>
                      </div>
                      <p className={`text-sm font-bold ${isIncome ? 'text-brand' : 'text-ink'}`}>
                        {isIncome ? '+' : '−'}
                        {fmt(Number(t.amount))}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* metas + gamificação */}
          <div className="space-y-5">
            {/* metas ativas */}
            <div className="rounded-lg border border-line bg-card p-6 elev-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-ink">Metas de economia</h3>
                  {activeGoals.length > 0 && (
                    <p className="text-xs text-mute">
                      {activeGoals.length} ativa
                      {activeGoals.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setGoalOpen(true)}
                  className="flex items-center gap-1 rounded-md bg-brand px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-dk"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Nova
                </button>
              </div>

              {activeGoals.length === 0 ? (
                <div className="mt-4 flex flex-col items-center gap-2 py-4 text-center">
                  <span className="text-2xl">🎯</span>
                  <p className="text-xs text-mute">Nenhuma meta ativa.</p>
                  <button
                    onClick={() => setGoalOpen(true)}
                    className="text-xs font-bold text-brand hover:underline"
                  >
                    Criar primeira meta
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {activeGoals.slice(0, 3).map((g) => {
                    const now = new Date()
                    const start = new Date(g.startDate)
                    const elapsed =
                      (now.getFullYear() - start.getFullYear()) * 12 +
                      (now.getMonth() - start.getMonth())
                    const progress = Math.min(Math.round((elapsed / g.months) * 100), 100)
                    return (
                      <div key={g.id} className="rounded-lg border border-line bg-bg p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink">{g.name}</p>
                            <p className="text-xs text-mute">
                              {fmt(Number(g.monthlyAmount))}/mês · {g.months}{' '}
                              {g.months === 1 ? 'mês' : 'meses'}
                            </p>
                          </div>
                          <button
                            onClick={() => completeGoal.mutate(g.id)}
                            title="Marcar como concluída"
                            className="shrink-0 rounded-md border border-line px-2 py-1 text-[10px] font-bold text-mute transition-colors hover:border-brand/50 hover:text-brand"
                          >
                            Concluir
                          </button>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/40">
                          <div
                            className="h-full rounded-full bg-brand transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-right text-[10px] text-faint">
                          {progress}% do tempo
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* gamificação */}
            <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
              <div className="glow pointer-events-none absolute inset-0" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink">Gamificação</p>
                  <p className="text-xs text-mute">Confira suas conquistas e nível</p>
                </div>
              </div>
              <a
                href="/gamification"
                className="relative mt-4 block w-full rounded-md bg-brand py-2 text-center text-xs font-bold text-white transition-colors hover:bg-brand-dk"
              >
                Ver badges e nível
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
