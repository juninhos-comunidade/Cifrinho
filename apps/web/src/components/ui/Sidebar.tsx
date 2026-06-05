'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePreferences } from '@/contexts/PreferencesContext'

const NAV_FINANCAS = [
  {
    href: '/overview',
    screen: 'overview',
    tip: 'Visão geral',
    label: 'Visão geral',
    desc: 'Resumo consolidado',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
  },
  {
    href: '/personal',
    screen: 'pessoal',
    tip: 'Gestão pessoal',
    label: 'Pessoal',
    desc: 'Gastos, metas e categorias',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z"/></svg>,
  },
  {
    href: '/business',
    screen: 'empresarial',
    tip: 'Gestão empresarial',
    label: 'Empresarial',
    desc: 'Fluxo de caixa PF e PJ',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/></svg>,
  },
  {
    href: '/income-tax',
    screen: 'ir',
    tip: 'Imposto de Renda',
    label: 'Imposto de Renda',
    desc: 'Declaração sempre pronta',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>,
  },
  {
    href: '/gamification',
    screen: 'game',
    tip: 'Gamificação',
    label: 'Gamificação',
    desc: 'Conquistas, níveis e XP',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  },
]

const NAV_CONTA = [
  {
    href: '/profile',
    screen: 'perfil',
    tip: 'Perfil',
    label: 'Perfil',
    desc: 'Seus dados e plano',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>,
  },
  {
    href: '/settings',
    screen: 'config',
    tip: 'Configurações',
    label: 'Configurações',
    desc: 'Preferências do app',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  },
  {
    href: '/discord',
    screen: 'discord',
    tip: 'Discord',
    label: 'Discord',
    desc: 'Comunidade Juninhos',
    icon: <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>,
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { logout: handleLogout, initials, firstName } = useAuth()
  const { user } = useCurrentUser()
  const { businessEnabled } = usePreferences()

  const visibleFinancas = businessEnabled
    ? NAV_FINANCAS
    : NAV_FINANCAS.filter((item) => item.href !== '/business')

  const w = collapsed ? 'w-[76px]' : 'w-[264px]'

  return (
    <aside
      className={`${w} sidebar-${collapsed ? 'collapsed' : 'expanded'} fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-[width] duration-300`}
      style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-card))' }}
    >
      {/* brand + collapse */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b px-4" style={{ borderColor: 'rgb(var(--c-line))' }}>
        <div className="h-9 w-9 shrink-0 rounded-full bg-brand/20 flex items-center justify-center text-brand font-extrabold text-sm">C</div>
        <span className="brand-word nav-label flex-1 text-lg font-extrabold tracking-tight" style={{ color: 'rgb(var(--c-ink))' }}>Cifrinho</span>
        <button
          onClick={onToggle}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md transition-colors hover:bg-elev"
          style={{ color: 'rgb(var(--c-mute))' }}
          title="Recolher menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="side-section-label mb-2 px-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--c-faint))' }}>Finanças</p>
        <div className="flex flex-col gap-1">
          {visibleFinancas.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href} className={`nav-item${active ? ' active' : ''}`} data-tip={item.tip}>
                <span className="nav-ico flex-shrink-0">{item.icon}</span>
                <span className="nav-text">
                  <span className="nav-label block text-sm font-semibold leading-tight">{item.label}</span>
                  <span className="nav-desc">{item.desc}</span>
                </span>
              </Link>
            )
          })}
        </div>

        <p className="side-section-label mb-2 mt-6 px-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--c-faint))' }}>Conta</p>
        <div className="flex flex-col gap-1">
          {NAV_CONTA.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`nav-item${active ? ' active' : ''}`} data-tip={item.tip}>
                <span className="nav-ico flex-shrink-0">{item.icon}</span>
                <span className="nav-text">
                  <span className="nav-label block text-sm font-semibold leading-tight">{item.label}</span>
                  <span className="nav-desc">{item.desc}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* usuário + logout */}
      <div className="side-foot border-t p-3" style={{ borderColor: 'rgb(var(--c-line))' }}>
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-blue text-sm font-bold text-white">
            {initials}
          </span>
          <div className="nav-label min-w-0 flex-1">
            <p className="truncate text-sm font-semibold" style={{ color: 'rgb(var(--c-ink))' }}>{firstName || '…'}</p>
            <p className="truncate text-[11px]" style={{ color: 'rgb(var(--c-mute))' }}>{user?.email ?? ''}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sair"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md transition-colors hover:bg-rose/15 hover:text-rose"
            style={{ color: 'rgb(var(--c-faint))' }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
