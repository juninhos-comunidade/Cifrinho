'use client'

import { useState } from 'react'
import { useTransactions, calcOverview, calcMonthlyBars, fmt, type Transaction } from '@/hooks/useTransactions'
import { useAuth } from '@/contexts/AuthContext'
import { TransactionModal } from '@/components/ui/TransactionModal'

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-line/40 ${className ?? ''}`} />
}

export default function OverviewPage() {
  const { data: txs, isLoading, isError } = useTransactions()
  const { firstName } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  function openNew() { setEditing(null); setModalOpen(true) }
  function openEdit(t: Transaction) { setEditing(t); setModalOpen(true) }

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
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
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

  const { balance, personalBalance, businessBalance, curIncome, curExpense, savingsRate, deltaIncome, deltaExpense } = calcOverview(txs)
  const bars = calcMonthlyBars(txs)
  const recent = txs.slice(0, 5)

  const total = personalBalance + businessBalance
  const personalPct = total > 0 ? Math.round((personalBalance / total) * 100) : 0
  const businessPct = total > 0 ? 100 - personalPct : 0

  const kpis = [
    {
      label: 'Saldo consolidado',
      value: fmt(balance),
      delta: `${deltaIncome} vs. mês anterior`,
      deltaColor: balance >= 0 ? 'text-brand' : 'text-rose',
      up: balance >= 0,
      iconBg: 'bg-brand/15 text-brand',
      icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    },
    {
      label: 'Receitas do mês',
      value: fmt(curIncome),
      delta: `${deltaIncome} vs. mês anterior`,
      deltaColor: 'text-brand',
      up: true,
      iconBg: 'bg-blue/15 text-blue',
      icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
    },
    {
      label: 'Despesas do mês',
      value: fmt(curExpense),
      delta: `${deltaExpense} vs. mês anterior`,
      deltaColor: 'text-rose',
      up: false,
      iconBg: 'bg-rose/15 text-rose',
      icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>,
    },
    {
      label: 'Taxa de poupança',
      value: `${savingsRate}%`,
      delta: savingsRate >= 20 ? 'Meta de 20% atingida' : 'Meta: 20%',
      deltaColor: savingsRate >= 20 ? 'text-brand' : 'text-amber',
      up: savingsRate >= 20,
      iconBg: 'bg-purple/15 text-purple',
      icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z"/></svg>,
    },
  ]

  return (
    <>
      <TransactionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        editing={editing}
      />

      <div>
        <div className="mb-4 flex items-center justify-between">
          {firstName && (
            <p className="text-sm text-mute">
              Olá, <span className="font-semibold text-ink">{firstName}</span>. Aqui está seu resumo financeiro.
            </p>
          )}
          <button
            onClick={openNew}
            className="ml-auto flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dk"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Lançar
          </button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="rounded-lg border border-line bg-card p-5 elev-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-mute">{kpi.label}</p>
                <span className={`grid h-8 w-8 place-items-center rounded-md ${kpi.iconBg}`}>{kpi.icon}</span>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{kpi.value}</p>
              <p className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${kpi.deltaColor}`}>
                {kpi.up
                  ? <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 15 6-6 6 6"/></svg>
                  : <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                }
                {kpi.delta}
              </p>
            </div>
          ))}
        </div>

        {/* gráfico + rosca */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-ink">Receitas × Despesas</h3>
                <p className="text-xs text-mute">Últimos 7 meses</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand"></span>Receitas</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-line"></span>Despesas</span>
              </div>
            </div>
            <div className="mt-6 flex h-52 items-end justify-between gap-3 sm:gap-5">
              {bars.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end justify-center gap-1">
                    <div className="bar w-1/2 bg-brand" style={{ height: m.inH || 4 }}></div>
                    <div className="bar w-1/2 bg-line" style={{ height: m.outH || 4 }}></div>
                  </div>
                  <span className={`text-[11px] ${m.current ? 'font-semibold text-ink' : 'text-faint'}`}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <h3 className="text-base font-bold text-ink">Pessoal × Empresarial</h3>
            <p className="text-xs text-mute">Distribuição do saldo</p>
            <div className="mt-5 flex items-center gap-6">
              <div className="relative h-32 w-32 shrink-0">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-line))" strokeWidth="5"/>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-blue))" strokeWidth="5"
                    strokeDasharray={`${businessPct} 100`} strokeDashoffset="0" strokeLinecap="round"/>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-brand))" strokeWidth="5"
                    strokeDasharray={`${personalPct} 100`} strokeDashoffset={`-${businessPct}`} strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="text-lg font-extrabold text-ink leading-none">{fmt(Math.abs(balance))}</p>
                    <p className="text-[10px] text-mute">total</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm text-ink">
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-brand"></span>Pessoal</span>
                    <span className="font-bold">{fmt(personalBalance)}</span>
                  </div>
                  <p className="mt-0.5 pl-4 text-xs text-mute">{personalPct}% do total</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-ink">
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-blue"></span>Empresarial</span>
                    <span className="font-bold">{fmt(businessBalance)}</span>
                  </div>
                  <p className="mt-0.5 pl-4 text-xs text-mute">{businessPct}% do total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* transações recentes */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-line bg-card elev-sm">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-base font-bold text-ink">Transações recentes</h3>
              <a href="/personal" className="text-xs font-bold text-brand hover:underline">Ver todas</a>
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
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${isIncome ? 'bg-brand/12 text-brand' : 'bg-rose/12 text-rose'}`}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {isIncome ? <><path d="M12 19V5M5 12l7-7 7 7"/></> : <><path d="M12 5v14M5 12l7 7 7-7"/></>}
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{t.description}</p>
                        <p className="text-xs text-mute">
                          {t.accountType === 'PERSONAL' ? 'Pessoal' : 'Empresarial'} · {new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </p>
                      </div>
                      <p className={`text-sm font-bold ${isIncome ? 'text-brand' : 'text-ink'}`}>
                        {isIncome ? '+' : '−'}{fmt(Number(t.amount))}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* gamificação */}
          <div className="space-y-5">
            <div className="rounded-lg border border-line bg-card p-6 elev-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-ink">Metas</h3>
                <span className="text-xs text-mute">Em breve</span>
              </div>
              <p className="mt-4 text-xs text-mute">O módulo de metas estará disponível em breve.</p>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
              <div className="glow pointer-events-none absolute inset-0" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink">Gamificação</p>
                  <p className="text-xs text-mute">Confira suas conquistas e nível</p>
                </div>
              </div>
              <a href="/gamification" className="relative mt-4 block w-full rounded-md bg-brand py-2 text-center text-xs font-bold text-white transition-colors hover:bg-brand-dk">
                Ver badges e nível
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
