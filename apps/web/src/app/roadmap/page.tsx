import Image from 'next/image'

type FeatureStatus = 'planned' | 'in_progress' | 'done'

interface Feature {
  id:         number
  name:       string
  detail:     string
  area:       string[]
  status:     FeatureStatus
  github_url: string
}

interface RoadmapPayload {
  planned:     Feature[]
  in_progress: Feature[]
  done:        Feature[]
  meta: { total: number; done_count: number; pct: number }
}

const SVG_CLOCK = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
  </svg>
)

const SVG_HAMMER = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/>
    <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586z"/>
  </svg>
)

const SVG_CHECK = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

const SVG_CHECK_SM = (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

// fallback estático — usado antes do backend estar disponível
const FALLBACK: RoadmapPayload = {
  planned: [
    { id: 0, name: '2FA',                detail: 'Autenticação de dois fatores',  area: ['Back-end'], status: 'planned', github_url: '#' },
    { id: 0, name: 'Open Banking',       detail: 'Conexão direta com bancos',     area: ['API'],      status: 'planned', github_url: '#' },
    { id: 0, name: 'App mobile',         detail: 'iOS e Android nativos',         area: ['Front-end'],status: 'planned', github_url: '#' },
    { id: 0, name: 'Exportação CSV/PDF', detail: 'Relatórios para download',      area: ['Back-end'], status: 'planned', github_url: '#' },
    { id: 0, name: 'Notificações push',  detail: 'Alertas em tempo real',         area: ['Back-end'], status: 'planned', github_url: '#' },
  ],
  in_progress: [
    { id: 0, name: 'Integração API real', detail: 'Conectando dashboard aos dados reais', area: ['Back-end', 'Front-end'], status: 'in_progress', github_url: '#' },
    { id: 0, name: 'Central de Ajuda',    detail: 'Base de conhecimento e suporte',       area: ['Front-end'],             status: 'in_progress', github_url: '#' },
    { id: 0, name: 'Roadmap',             detail: 'Esta página!',                         area: ['Front-end', 'Back-end'], status: 'in_progress', github_url: '#' },
    { id: 0, name: 'Status',              detail: 'Monitoramento em tempo real',          area: ['Back-end', 'Front-end'], status: 'in_progress', github_url: '#' },
    { id: 0, name: 'Discord',             detail: 'Comunidade oficial',                   area: ['Front-end'],             status: 'in_progress', github_url: '#' },
  ],
  done: [
    { id: 0, name: 'Landing page',       detail: 'Página de apresentação',             area: ['Front-end'],              status: 'done', github_url: '#' },
    { id: 0, name: 'Autenticação',       detail: 'Login seguro com JWT',               area: ['Back-end', 'Front-end'],  status: 'done', github_url: '#' },
    { id: 0, name: 'Dashboard',          detail: 'Painel financeiro pessoal',          area: ['Front-end'],              status: 'done', github_url: '#' },
    { id: 0, name: 'Gestão Pessoal',     detail: 'Controle de despesas e receitas',    area: ['Front-end', 'Back-end'],  status: 'done', github_url: '#' },
    { id: 0, name: 'Gestão Empresarial', detail: 'Módulo PJ completo',                 area: ['Front-end', 'Back-end'],  status: 'done', github_url: '#' },
    { id: 0, name: 'Imposto de Renda',   detail: 'Declaração anual automatizada',      area: ['Back-end', 'Front-end'],  status: 'done', github_url: '#' },
    { id: 0, name: 'Gamificação',        detail: 'XP, badges e missões',               area: ['Back-end', 'Front-end'],  status: 'done', github_url: '#' },
    { id: 0, name: 'Página Legal',       detail: 'Termos, privacidade e cookies',      area: ['Front-end'],              status: 'done', github_url: '#' },
  ],
  meta: { total: 18, done_count: 8, pct: 44 },
}

async function fetchRoadmap(): Promise<RoadmapPayload> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
  try {
    const res = await fetch(`${apiUrl}/roadmap`, { next: { revalidate: 300 } })
    if (!res.ok) return FALLBACK
    return res.json()
  } catch {
    return FALLBACK
  }
}

function MkRing({ acc }: { acc: string }) {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ border: `2px solid rgb(${acc} / 0.6)` }}
    />
  )
}

function MkDot({ acc }: { acc: string }) {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: `rgb(${acc} / 0.18)` }}
    >
      <i className="block h-[7px] w-[7px] rounded-full" style={{ background: `rgb(${acc})` }} />
    </span>
  )
}

function MkDone({ acc }: { acc: string }) {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
      style={{ background: `rgb(${acc})` }}
    >
      {SVG_CHECK_SM}
    </span>
  )
}

function FeatureCard({
  feature,
  acc,
  marker,
}: {
  feature: Feature
  acc: string
  marker: React.ReactNode
}) {
  return (
    <div
      className="group flex items-start gap-[11px] rounded-xl px-[13px] py-[11px] transition-colors"
      style={{
        background:  'rgb(var(--c-card))',
        border:      '1px solid rgb(var(--c-line))',
        borderLeft:  `3px solid rgb(${acc} / 0.55)`,
      }}
    >
      {marker}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight text-ink">{feature.name}</p>
        <p className="mt-[3px] text-xs leading-snug" style={{ color: 'rgb(var(--c-faint))' }}>{feature.detail}</p>
      </div>
      {feature.github_url !== '#' && (
        <a
          href={feature.github_url}
          target="_blank"
          rel="noopener"
          className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          title={`Issue #${feature.id}`}
        >
          <svg className="h-3.5 w-3.5" style={{ color: 'rgb(var(--c-faint))' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      )}
    </div>
  )
}

export default async function RoadmapPage() {
  const data = await fetchRoadmap()
  const { planned, in_progress, done, meta } = data

  return (
    <main
      className="flex h-screen flex-col overflow-hidden font-sans"
      style={{ backgroundColor: 'rgb(var(--c-bg))' }}
    >
      {/* HEADER */}
      <header className="mx-auto w-full max-w-3xl shrink-0 px-6 pt-9 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <Image src="/cifrinho-mascot.png" alt="Cifrinho" width={28} height={28} />
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Roadmap do Projeto</h1>
        </div>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-mute">
          Acompanhe o que está sendo construído, o que vem a seguir e o que já foi entregue.
        </p>

        <div className="mx-auto mt-6 max-w-xl">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="text-mute">Progresso geral</span>
            <span className="text-ink">
              <span className="text-brand">{meta.pct}%</span> · {meta.done_count} de {meta.total} features entregues
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: 'rgb(var(--c-card))', boxShadow: '0 0 0 1px rgb(var(--c-line))' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${meta.pct}%`, background: 'linear-gradient(90deg,#21C25E,#3B82F6)' }}
            />
          </div>
        </div>
      </header>

      {/* COLUMNS */}
      <div className="mx-auto grid w-full max-w-[1280px] flex-1 grid-cols-1 gap-5 overflow-hidden p-6 md:grid-cols-3">

        {/* PLANEJADO — azul */}
        <section
          className="flex min-h-0 flex-col rounded-2xl p-5"
          style={{ background: 'rgb(var(--c-blue) / 0.06)', border: '1px solid rgb(var(--c-blue) / 0.18)' }}
        >
          <div className="flex shrink-0 flex-col items-center text-center">
            <div
              className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgb(var(--c-blue) / 0.20), rgb(var(--c-blue) / 0.05) 70%)',
                boxShadow:  '0 0 0 1px rgb(var(--c-blue) / 0.20) inset',
              }}
            >
              <Image src="/cifrinho-mascot.png" alt="" width={72} height={72} style={{ objectFit: 'contain' }} />
              <span
                className="absolute -right-1.5 -top-1.5 flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ background: '#3B82F6', boxShadow: '0 6px 16px -2px rgba(59,130,246,.55)' }}
              >
                {SVG_CLOCK}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">Planejado</h2>
            <p className="mt-0.5 text-xs font-medium text-blue">Aguardando · {planned.length} itens</p>
          </div>
          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {planned.map((f) => (
              <FeatureCard key={f.id || f.name} feature={f} acc="var(--c-blue)" marker={<MkRing acc="var(--c-blue)" />} />
            ))}
          </div>
        </section>

        {/* EM PROGRESSO — âmbar */}
        <section
          className="flex min-h-0 flex-col rounded-2xl p-5"
          style={{ background: 'rgb(var(--c-amber) / 0.06)', border: '1px solid rgb(var(--c-amber) / 0.18)' }}
        >
          <div className="flex shrink-0 flex-col items-center text-center">
            <div
              className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgb(var(--c-amber) / 0.20), rgb(var(--c-amber) / 0.05) 70%)',
                boxShadow:  '0 0 0 1px rgb(var(--c-amber) / 0.20) inset',
              }}
            >
              <Image
                src="/cifrinho-mascot.png"
                alt=""
                width={72}
                height={72}
                style={{ objectFit: 'contain', animation: 'float 6s ease-in-out infinite' }}
              />
              <span
                className="absolute -right-1.5 -top-1.5 flex h-10 w-10 animate-pulse items-center justify-center rounded-full text-white"
                style={{ background: '#F59E0B' }}
              >
                {SVG_HAMMER}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'rgb(var(--c-amber))' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'rgb(var(--c-amber))' }} />
              </span>
              <h2 className="text-lg font-bold text-ink">Em progresso</h2>
            </div>
            <p className="mt-0.5 text-xs font-medium text-amber">Trabalhando · {in_progress.length} itens</p>
          </div>
          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {in_progress.map((f) => (
              <FeatureCard key={f.id || f.name} feature={f} acc="var(--c-amber)" marker={<MkDot acc="var(--c-amber)" />} />
            ))}
          </div>
        </section>

        {/* CONCLUÍDO — verde */}
        <section
          className="flex min-h-0 flex-col rounded-2xl p-5"
          style={{ background: 'rgb(var(--c-brand) / 0.06)', border: '1px solid rgb(var(--c-brand) / 0.18)' }}
        >
          <div className="flex shrink-0 flex-col items-center text-center">
            <div
              className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgb(var(--c-brand) / 0.20), rgb(var(--c-brand) / 0.05) 70%)',
                boxShadow:  '0 0 0 1px rgb(var(--c-brand) / 0.20) inset',
              }}
            >
              <Image
                src="/cifrinho-mascot.png"
                alt=""
                width={72}
                height={72}
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgb(var(--c-brand) / 0.45))' }}
              />
              <span
                className="absolute -right-1.5 -top-1.5 flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ background: '#21C25E', boxShadow: '0 6px 16px -2px rgba(33,194,94,.55)' }}
              >
                {SVG_CHECK}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">Concluído</h2>
            <p className="mt-0.5 text-xs font-medium text-brand">Pronto · {done.length} itens</p>
          </div>
          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {done.map((f) => (
              <FeatureCard key={f.id || f.name} feature={f} acc="var(--c-brand)" marker={<MkDone acc="var(--c-brand)" />} />
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="shrink-0 border-t px-6 py-5" style={{ borderColor: 'rgb(var(--c-line))' }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <p className="text-sm text-mute">
            Tem uma sugestão? Fale com a comunidade no{' '}
            <a href="https://www.juninhos.com/" target="_blank" rel="noopener" className="font-semibold text-purple hover:underline">
              Discord
            </a>.
          </p>
          <button
            disabled
            className="cursor-not-allowed rounded-md border px-4 py-2 text-xs font-bold"
            style={{ borderColor: 'rgb(var(--c-line))', background: 'rgb(var(--c-card))', color: 'rgb(var(--c-faint))' }}
          >
            Votação em features — em breve
          </button>
        </div>
      </footer>
    </main>
  )
}
