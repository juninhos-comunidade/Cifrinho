import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

type ServiceStatus = 'operational' | 'maintenance' | 'offline'
type Severity = 'low' | 'medium' | 'high'
type UptimeBar = 'ok' | 'mt' | 'dn'

interface Service {
  name: string
  key: string
  status: ServiceStatus
  latency_ms: number
  uptime_pct: string
}

interface Incident {
  id: string
  title: string
  description: string
  severity: Severity
  date: string
  resolved: boolean
}

interface StatusPayload {
  overall: ServiceStatus
  checked_at: string
  services: Service[]
  incidents: Incident[]
  uptime_bars: UptimeBar[]
}

const COPY: Record<
  ServiceStatus,
  {
    badge: string
    title: ReactNode
    sub: string
    uptime: string
    services: string
  }
> = {
  operational: {
    badge: 'Todos os sistemas operacionais',
    title: (
      <>
        Tudo certo
        <br />
        por aqui.
      </>
    ),
    sub: 'Seus dados financeiros estão seguros e acessíveis. Operação normal em todos os serviços.',
    uptime: '—',
    services: '—',
  },
  maintenance: {
    badge: 'Manutenção em andamento',
    title: (
      <>
        Em manutenção
        <br />
        programada.
      </>
    ),
    sub: 'Um serviço está passando por atualização. Você pode notar lentidão pontual.',
    uptime: '—',
    services: '—',
  },
  offline: {
    badge: 'Instabilidade detectada',
    title: (
      <>
        Estamos
        <br />
        resolvendo.
      </>
    ),
    sub: 'Identificamos uma falha e a equipe já está atuando. Acompanhe as atualizações abaixo.',
    uptime: '—',
    services: '—',
  },
}

const ACC_VAR: Record<ServiceStatus, string> = {
  operational: 'var(--c-brand)',
  maintenance: 'var(--c-amber)',
  offline: 'var(--c-rose)',
}

const SERVICE_ICONS: Record<string, ReactNode> = {
  api: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
    </svg>
  ),
  database: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  auth: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  notifications: (
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
  ),
  reports: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <rect x="7" y="11" width="3" height="6" rx="1" />
      <rect x="13" y="7" width="3" height="10" rx="1" />
    </svg>
  ),
}

const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  operational: 'Operacional',
  maintenance: 'Manutenção',
  offline: 'Offline',
}

const SEVERITY_LABELS: Record<Severity, string> = {
  low: 'BAIXA',
  medium: 'MÉDIA',
  high: 'ALTA',
}
const SEVERITY_VAR: Record<Severity, string> = {
  low: 'var(--c-blue)',
  medium: 'var(--c-amber)',
  high: 'var(--c-rose)',
}

async function fetchStatus(): Promise<StatusPayload | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
  try {
    const res = await fetch(`${apiUrl}/status`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// fallback usado antes do backend estar pronto
const FALLBACK: StatusPayload = {
  overall: 'operational',
  checked_at: new Date().toISOString(),
  services: [
    {
      name: 'API',
      key: 'api',
      status: 'operational',
      latency_ms: 0,
      uptime_pct: '99,99%',
    },
    {
      name: 'Banco de Dados',
      key: 'database',
      status: 'operational',
      latency_ms: 0,
      uptime_pct: '99,97%',
    },
    {
      name: 'Autenticação',
      key: 'auth',
      status: 'operational',
      latency_ms: 0,
      uptime_pct: '99,82%',
    },
    {
      name: 'Notificações',
      key: 'notifications',
      status: 'operational',
      latency_ms: 0,
      uptime_pct: '99,90%',
    },
    {
      name: 'Relatórios & IR',
      key: 'reports',
      status: 'operational',
      latency_ms: 0,
      uptime_pct: '99,90%',
    },
  ],
  incidents: [
    {
      id: '1',
      title: 'Manutenção programada · Autenticação',
      description: 'Janela de atualização do provedor de login.',
      severity: 'medium',
      date: '02/06/2026',
      resolved: true,
    },
    {
      id: '2',
      title: 'Lentidão em relatórios',
      description: 'Exportações de IR lentas por 22 min. Resolvido.',
      severity: 'high',
      date: '28/05/2026',
      resolved: true,
    },
    {
      id: '3',
      title: 'Ajuste em webhooks de PIX',
      description: 'Pequeno atraso na confirmação de pagamentos.',
      severity: 'low',
      date: '15/05/2026',
      resolved: true,
    },
  ],
  uptime_bars: Array.from({ length: 45 }, (_, i) =>
    i === 12 || i === 37 ? 'mt' : i === 25 ? 'dn' : 'ok'
  ) as UptimeBar[],
}

function operationalCount(services: Service[]) {
  const up = services.filter((s) => s.status === 'operational').length
  return `${up}/${services.length}`
}

function avgUptime(services: Service[]) {
  const vals = services.map((s) => parseFloat(s.uptime_pct.replace(',', '.'))).filter(Boolean)
  if (!vals.length) return '—'
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  return avg.toFixed(2).replace('.', ',') + '%'
}

export default async function StatusPage() {
  const data = (await fetchStatus()) ?? FALLBACK
  const state = data.overall
  const acc = ACC_VAR[state]
  const copy = COPY[state]

  const uptimePct = avgUptime(data.services)
  const servicesCt = operationalCount(data.services)

  const checkedLabel = (() => {
    const diff = Math.round((Date.now() - new Date(data.checked_at).getTime()) / 60000)
    if (diff < 1) return 'agora mesmo'
    if (diff === 1) return 'há 1 minuto'
    return `há ${diff} minutos`
  })()

  return (
    <div
      className="fixed inset-0 overflow-hidden font-sans"
      style={{ backgroundColor: 'rgb(var(--c-bg-deep))' }}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: 'rgb(var(--c-bg))',
          borderColor: 'rgb(var(--c-line))',
        }}
      >
        {/* TOP BAR */}
        <div
          className="flex items-center justify-between border-b px-8 py-5"
          style={{ borderColor: 'rgb(var(--c-line))' }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/cifrinho-mascot.png" alt="Cifrinho" width={32} height={32} />
            <span className="text-lg font-extrabold tracking-tight text-ink">Cifrinho</span>
            <span
              className="ml-2 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{
                borderColor: 'rgb(var(--c-line))',
                background: 'rgb(var(--c-card))',
                color: 'rgb(var(--c-mute))',
              }}
            >
              Status
            </span>
          </Link>
          <p className="text-sm text-mute">
            Verificado <span className="font-semibold text-ink">{checkedLabel}</span>
          </p>
        </div>

        {/* 3-COLUMN BODY */}
        <div className="grid h-[calc(100%-73px)] grid-cols-[3fr_4fr_3fr] gap-6 p-6">
          {/* LEFT: HERO */}
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border px-6 py-6 text-center"
            style={{
              background: `radial-gradient(circle at 50% 38%, rgb(${acc} / 0.16), transparent 62%)`,
              borderColor: 'rgb(var(--c-line))',
              backgroundColor: 'rgb(var(--c-card))',
              boxShadow: `0 0 120px -10px rgb(${acc} / 0.28)`,
            }}
          >
            <div className="relative">
              <Image
                src="/cifrinho-mascot.png"
                alt="Mascote Cifrinho"
                width={160}
                height={160}
                style={{
                  animation: state === 'operational' ? 'float 6s ease-in-out infinite' : undefined,
                  filter: state === 'offline' ? 'grayscale(0.6) brightness(0.92)' : undefined,
                  transition: 'filter .4s ease',
                }}
              />
              {/* badge manutenção — martelo */}
              <span
                className="absolute -right-1 -top-3 flex h-11 w-11 items-center justify-center rounded-full text-white"
                style={{
                  background: '#F59E0B',
                  boxShadow: '0 0 22px -2px rgba(245,158,11,.7)',
                  opacity: state === 'maintenance' ? 1 : 0,
                  transform: state === 'maintenance' ? 'scale(1)' : 'scale(0.5)',
                  transition: 'opacity .3s ease, transform .35s cubic-bezier(.2,1.4,.4,1)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
                  <path d="m18 15 4-4" />
                  <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586z" />
                </svg>
              </span>
              {/* badge offline — wifi-off */}
              <span
                className="absolute -right-1 -top-3 flex h-11 w-11 items-center justify-center rounded-full text-white"
                style={{
                  background: '#F43F5E',
                  boxShadow: '0 0 22px -2px rgba(244,63,94,.7)',
                  opacity: state === 'offline' ? 1 : 0,
                  transform: state === 'offline' ? 'scale(1)' : 'scale(0.5)',
                  transition: 'opacity .3s ease, transform .35s cubic-bezier(.2,1.4,.4,1)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m2 2 20 20" />
                  <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                  <path d="M2 8.8a15 15 0 0 1 4.2-2.4M21.9 8.8a15 15 0 0 0-5.3-2.8" />
                  <path d="M5 12.7a10 10 0 0 1 2-1.3M17 12.7a10 10 0 0 0-2.7-1.5" />
                  <path d="M12 20h.01" />
                </svg>
              </span>
            </div>

            <div
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
              style={{
                borderColor: 'rgb(var(--c-line))',
                background: 'rgb(var(--c-bg))',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ background: `rgb(${acc})` }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: `rgb(${acc})` }}
                />
              </span>
              <span className="text-sm font-bold" style={{ color: `rgb(${acc})` }}>
                {copy.badge}
              </span>
            </div>

            <h1 className="mt-5 whitespace-nowrap text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">{copy.sub}</p>

            <div className="mt-6 grid w-full max-w-xs grid-cols-2 gap-3">
              <div
                className="rounded-xl border p-3"
                style={{
                  borderColor: 'rgb(var(--c-line))',
                  background: 'rgb(var(--c-bg))',
                }}
              >
                <p className="text-2xl font-extrabold" style={{ color: `rgb(${acc})` }}>
                  {uptimePct}
                </p>
                <p className="text-[11px] text-mute">uptime 90 dias</p>
              </div>
              <div
                className="rounded-xl border p-3"
                style={{
                  borderColor: 'rgb(var(--c-line))',
                  background: 'rgb(var(--c-bg))',
                }}
              >
                <p className="text-2xl font-extrabold text-ink">{servicesCt}</p>
                <p className="text-[11px] text-mute">serviços ativos</p>
              </div>
            </div>
          </div>

          {/* CENTER: SERVICES */}
          <div
            className="flex flex-col rounded-2xl border p-6"
            style={{
              borderColor: 'rgb(var(--c-line))',
              background: 'rgb(var(--c-card))',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-mute">Serviços</p>
            <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
              {data.services.map((svc) => {
                const svcAcc =
                  svc.status === 'maintenance'
                    ? 'var(--c-amber)'
                    : svc.status === 'offline'
                      ? 'var(--c-rose)'
                      : 'var(--c-brand)'
                const icon = SERVICE_ICONS[svc.key] ?? SERVICE_ICONS.api
                return (
                  <div
                    key={svc.key}
                    className="flex items-center gap-4 rounded-xl border px-4 py-3.5"
                    style={{
                      borderColor: 'rgb(var(--c-line))',
                      background: 'rgb(var(--c-bg))',
                    }}
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                      style={{
                        background: `rgb(${svcAcc} / 0.12)`,
                        color: `rgb(${svcAcc})`,
                      }}
                    >
                      {icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-ink">{svc.name}</p>
                      <p className="text-xs text-mute">
                        {svc.latency_ms > 0 ? `${svc.latency_ms} ms` : 'sem latência'}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-mute">{svc.uptime_pct}</span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        background: `rgb(${svcAcc} / 0.10)`,
                        color: `rgb(${svcAcc})`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: `rgb(${svcAcc})` }}
                      />
                      {SERVICE_STATUS_LABELS[svc.status]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT: INCIDENTS + UPTIME */}
          <div className="flex flex-col">
            <div
              className="flex flex-1 flex-col rounded-2xl border p-6"
              style={{
                borderColor: 'rgb(var(--c-line))',
                background: 'rgb(var(--c-card))',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-mute">
                Incidentes recentes
              </p>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                {data.incidents.slice(0, 3).map((inc) => (
                  <div
                    key={inc.id}
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: 'rgb(var(--c-line))',
                      background: 'rgb(var(--c-bg))',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          background: `rgb(${SEVERITY_VAR[inc.severity]} / 0.10)`,
                          color: `rgb(${SEVERITY_VAR[inc.severity]})`,
                        }}
                      >
                        {SEVERITY_LABELS[inc.severity]}
                      </span>
                      <span className="text-[11px]" style={{ color: 'rgb(var(--c-faint))' }}>
                        {inc.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-ink">{inc.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-mute">{inc.description}</p>
                  </div>
                ))}
              </div>

              {/* UPTIME BARS */}
              <div className="mt-5 border-t pt-5" style={{ borderColor: 'rgb(var(--c-line))' }}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-mute">
                    Uptime · 90 dias
                  </p>
                  <span className="text-sm font-extrabold text-brand">{uptimePct}</span>
                </div>
                <div className="mt-4 flex h-[34px] items-end gap-0.5">
                  {data.uptime_bars.map((t, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: '100%',
                        background:
                          t === 'dn'
                            ? 'rgb(var(--c-rose)  / 0.85)'
                            : t === 'mt'
                              ? 'rgb(var(--c-amber) / 0.85)'
                              : 'rgb(var(--c-brand) / 0.85)',
                      }}
                    />
                  ))}
                </div>
                <div
                  className="mt-3 flex items-center justify-between text-[11px]"
                  style={{ color: 'rgb(var(--c-faint))' }}
                >
                  <span>90 dias atrás</span>
                  <span>hoje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
