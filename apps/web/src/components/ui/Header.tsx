'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const PAGE_META: Record<string, { title: string; sub: string }> = {
  '/overview':     { title: 'Visão geral',        sub: 'Tudo em um só lugar' },
  '/personal':     { title: 'Gestão pessoal',     sub: 'Acompanhe gastos, categorias e metas' },
  '/business':     { title: 'Gestão empresarial', sub: 'Fluxo de caixa separado por PF e PJ' },
  '/income-tax':   { title: 'Imposto de Renda',   sub: 'Sua declaração organizada o ano inteiro' },
  '/gamification': { title: 'Gamificação',        sub: 'Conquistas, níveis e ranking da comunidade' },
  '/profile':      { title: 'Perfil',             sub: 'Seus dados pessoais e plano' },
  '/settings':     { title: 'Configurações',      sub: 'Preferências, notificações e segurança' },
}

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname()
  const { initials, firstName } = useAuth()
  const [bellOpen, setBellOpen] = useState(false)

  const meta = Object.entries(PAGE_META).find(([key]) => pathname.startsWith(key))?.[1]
    ?? { title: 'Cifrinho', sub: '' }

  function toggleTheme() {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    try { localStorage.setItem('cif.theme', next) } catch {}
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6 backdrop-blur-xl"
      style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-bg) / 0.85)' }}
    >
      {/* botão de menu para dispositivos móveis */}
      <button
        onClick={onMenuToggle}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md transition-colors hover:bg-elev md:hidden"
        style={{ color: 'rgb(var(--c-mute))' }}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      {/* título da página */}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-bold leading-tight" style={{ color: 'rgb(var(--c-ink))' }}>{meta.title}</h1>
        {meta.sub && <p className="truncate text-xs" style={{ color: 'rgb(var(--c-mute))' }}>{meta.sub}</p>}
      </div>

      {/* campo de busca */}
      <div className="relative hidden w-64 md:block">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'rgb(var(--c-faint))' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          placeholder="Buscar transações…"
          className="w-full rounded-md border py-2 pl-9 pr-3 text-sm outline-none transition-colors"
          style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))', color: 'rgb(var(--c-ink))' }}
        />
      </div>

      {/* alternador de tema */}
      <button
        onClick={toggleTheme}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-colors hover:text-ink"
        style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))', color: 'rgb(var(--c-mute))' }}
        title="Alternar tema"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      </button>

      {/* notificações */}
      <div className="relative shrink-0">
        <button
          onClick={() => setBellOpen(!bellOpen)}
          className="relative grid h-9 w-9 place-items-center rounded-md border transition-colors"
          style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))', color: 'rgb(var(--c-mute))' }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-card"></span>
        </button>

        {bellOpen && (
          <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-lg border shadow-lg z-50" style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))' }}>
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'rgb(var(--c-line))' }}>
              <p className="text-sm font-bold" style={{ color: 'rgb(var(--c-ink))' }}>Notificações</p>
              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-bold text-brand">3 novas</span>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y" style={{ borderColor: 'rgb(var(--c-line))' }}>
              {[
                { color: 'purple', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>, title: 'Nova badge desbloqueada!', desc: 'Você conquistou "Sequência 7". Continue assim.', time: 'há 2 horas' },
                { color: 'amber', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/></svg>, title: 'Meta de gastos quase no limite', desc: 'Categoria "Alimentação" em 86% do orçamento.', time: 'há 5 horas' },
                { color: 'brand', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>, title: 'Comprovante categorizado', desc: 'NF-e de R$ 1.200 marcada como dedutível no IR.', time: 'ontem' },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 px-4 py-3">
                  <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-${n.color}/15 text-${n.color}`}>{n.icon}</span>
                  <div>
                    <p className="text-sm font-semibold leading-snug" style={{ color: 'rgb(var(--c-ink))' }}>{n.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: 'rgb(var(--c-mute))' }}>{n.desc}</p>
                    <p className="mt-1 text-[11px]" style={{ color: 'rgb(var(--c-faint))' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="block w-full border-t py-2.5 text-center text-xs font-bold text-brand transition-colors hover:bg-elev" style={{ borderColor: 'rgb(var(--c-line))' }}>Ver todas</button>
          </div>
        )}
      </div>

      {/* avatar → link para perfil */}
      <a
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
          <span className="block text-[11px]" style={{ color: 'rgb(var(--c-mute))' }}>Ver perfil</span>
        </span>
      </a>
    </header>
  )
}
