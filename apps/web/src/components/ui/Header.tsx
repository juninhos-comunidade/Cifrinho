'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications, type Notification } from '@/hooks/useNotifications'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'agora mesmo'
  if (m < 60) return `há ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `há ${h}h`
  const d = Math.floor(h / 24)
  if (d === 1) return 'ontem'
  if (d < 7) return `há ${d} dias`
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

const NOTIF_CONFIG: Record<Notification['type'], { color: string; icon: React.ReactNode }> = {
  badge: {
    color: 'bg-purple/15 text-purple',
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  goal_completed: {
    color: 'bg-brand/15 text-brand',
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  goal_expired: {
    color: 'bg-amber/15 text-amber',
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" />
      </svg>
    ),
  },
  transaction_high: {
    color: 'bg-rose/15 text-rose',
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
}

function NotificationItem({ n }: { n: Notification }) {
  const cfg = NOTIF_CONFIG[n.type]
  return (
    <div className="flex gap-3 px-4 py-3 transition-colors hover:bg-elev/50">
      <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md ${cfg.color}`}>
        {cfg.icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug" style={{ color: 'rgb(var(--c-ink))' }}>
          {n.title}
        </p>
        <p className="mt-0.5 text-xs" style={{ color: 'rgb(var(--c-mute))' }}>
          {n.desc}
        </p>
        <p className="mt-1 text-[11px]" style={{ color: 'rgb(var(--c-faint))' }}>
          {timeAgo(n.time)}
        </p>
      </div>
    </div>
  )
}

const PAGE_META: Record<string, { title: string; sub: string }> = {
  '/overview': { title: 'Visão geral', sub: 'Tudo em um só lugar' },
  '/personal': { title: 'Gestão pessoal', sub: 'Acompanhe gastos, categorias e metas' },
  '/business': { title: 'Gestão empresarial', sub: 'Fluxo de caixa separado por PF e PJ' },
  '/income-tax': { title: 'Imposto de Renda', sub: 'Sua declaração organizada o ano inteiro' },
  '/gamification': { title: 'Gamificação', sub: 'Conquistas, níveis e ranking da comunidade' },
  '/profile': { title: 'Perfil', sub: 'Seus dados pessoais e plano' },
  '/settings': { title: 'Configurações', sub: 'Preferências, notificações e segurança' },
}

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname()
  const { initials, firstName } = useAuth()
  const [bellOpen, setBellOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)
  const { notifications, count } = useNotifications()

  useEffect(() => {
    if (!bellOpen) return
    function handler(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [bellOpen])

  const meta = Object.entries(PAGE_META).find(([key]) => pathname.startsWith(key))?.[1] ?? {
    title: 'Cifrinho',
    sub: '',
  }

  function toggleTheme() {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    try {
      localStorage.setItem('cif.theme', next)
    } catch {}
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-xl sm:gap-4 sm:px-6"
      style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-bg) / 0.85)' }}
    >
      {/* hambúrguer — só visível abaixo de lg (mobile/tablet) */}
      <button
        onClick={onMenuToggle}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md transition-colors hover:bg-elev lg:hidden"
        style={{ color: 'rgb(var(--c-mute))' }}
        title="Menu"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* título da página */}
      <div className="min-w-0 flex-1">
        <h1
          className="truncate text-lg font-bold leading-tight"
          style={{ color: 'rgb(var(--c-ink))' }}
        >
          {meta.title}
        </h1>
        {meta.sub && (
          <p className="truncate text-xs" style={{ color: 'rgb(var(--c-mute))' }}>
            {meta.sub}
          </p>
        )}
      </div>

      {/* busca — oculta no mobile */}
      <div className="relative hidden w-64 md:block">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{ color: 'rgb(var(--c-faint))' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Buscar transações…"
          className="w-full rounded-md border py-2 pl-9 pr-3 text-sm outline-none transition-colors"
          style={{
            borderColor: 'rgb(var(--c-line))',
            backgroundColor: 'rgb(var(--c-card))',
            color: 'rgb(var(--c-ink))',
          }}
        />
      </div>

      {/* toggle de tema */}
      <button
        onClick={toggleTheme}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-colors hover:text-ink"
        style={{
          borderColor: 'rgb(var(--c-line))',
          backgroundColor: 'rgb(var(--c-card))',
          color: 'rgb(var(--c-mute))',
        }}
        title="Alternar tema"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      {/* notificações */}
      <div className="relative shrink-0" ref={bellRef}>
        <button
          onClick={() => setBellOpen(!bellOpen)}
          className="relative grid h-9 w-9 place-items-center rounded-md border transition-colors"
          style={{
            borderColor: 'rgb(var(--c-line))',
            backgroundColor: 'rgb(var(--c-card))',
            color: 'rgb(var(--c-mute))',
          }}
          title="Notificações"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          {count > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-card" />
          )}
        </button>

        {bellOpen && (
          <div
            className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border shadow-lg"
            style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))' }}
          >
            <div
              className="flex items-center justify-between border-b px-4 py-3"
              style={{ borderColor: 'rgb(var(--c-line))' }}
            >
              <p className="text-sm font-bold" style={{ color: 'rgb(var(--c-ink))' }}>
                Notificações
              </p>
              {count > 0 && (
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-bold text-brand">
                  {count} {count === 1 ? 'nova' : 'novas'}
                </span>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-line">
              {count === 0 ? (
                <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                  <svg
                    className="h-8 w-8"
                    style={{ color: 'rgb(var(--c-faint))' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <p className="text-sm" style={{ color: 'rgb(var(--c-mute))' }}>
                    Nenhuma notificação por aqui.
                  </p>
                </div>
              ) : (
                notifications.map((n) => <NotificationItem key={n.id} n={n} />)
              )}
            </div>
          </div>
        )}
      </div>

      {/* avatar */}
      <a
        data-onboarding="avatar-header"
        href="/profile"
        className="flex shrink-0 items-center gap-2.5 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-elev"
        title="Meu perfil"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-blue text-sm font-bold text-white">
          {initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-semibold" style={{ color: 'rgb(var(--c-ink))' }}>
            {firstName || 'Carregando…'}
          </span>
          <span className="block text-[11px]" style={{ color: 'rgb(var(--c-mute))' }}>
            Ver perfil
          </span>
        </span>
      </a>
    </header>
  )
}
