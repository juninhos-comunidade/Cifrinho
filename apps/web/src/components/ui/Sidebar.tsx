'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    document.cookie = 'token=; path=/; max-age=0'
    router.push('/login')
  }

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
          {NAV_FINANCAS.map((item) => {
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

      {/* upgrade card */}
      <div className="side-foot border-t p-3" style={{ borderColor: 'rgb(var(--c-line))' }}>
        <div className="relative overflow-hidden rounded-lg border p-4" style={{ borderColor: 'rgb(var(--c-line))', backgroundColor: 'rgb(var(--c-bg))' }}>
          <div className="glow pointer-events-none absolute inset-0" />
          <p className="relative text-sm font-bold" style={{ color: 'rgb(var(--c-ink))' }}>Plano Gratuito</p>
          <p className="relative mt-1 text-xs" style={{ color: 'rgb(var(--c-mute))' }}>Desbloqueie relatórios avançados e contas ilimitadas.</p>
          <button className="relative mt-3 w-full rounded-md bg-brand py-2 text-xs font-bold text-white transition-colors hover:bg-brand-dk">Fazer upgrade</button>
        </div>
      </div>
    </aside>
  )
}
