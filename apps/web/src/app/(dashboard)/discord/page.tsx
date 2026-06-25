'use client'

import Link from 'next/link'

const CHANNELS = [
  {
    name: '#geral',
    desc: 'Bate-papo sobre finanças, dicas do dia a dia e networking com a comunidade.',
    icon: '💬',
  },
  {
    name: '#duvidas-cifrinho',
    desc: 'Tire todas as suas dúvidas sobre o Cifrinho — a equipe e a comunidade estão lá.',
    icon: '❓',
  },
  {
    name: '#sugestoes',
    desc: 'Sugira novas funcionalidades e vote nas ideias de outros membros.',
    icon: '💡',
  },
  {
    name: '#ir-e-impostos',
    desc: 'Dicas sobre declaração de IR, MEI, INSS e tudo que envolve tributos no Brasil.',
    icon: '📋',
  },
]

const BENEFITS = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Suporte da comunidade',
    desc: 'Mais de 2.400 membros prontos para ajudar com suas dúvidas financeiras.',
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Acesso antecipado',
    desc: 'Seja o primeiro a testar novas funcionalidades antes do lançamento oficial.',
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: 'Badges exclusivas',
    desc: 'Desbloqueie conquistas especiais disponíveis apenas para membros do Discord.',
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Influencie o produto',
    desc: 'Vote em funcionalidades, participe de pesquisas e molde o futuro do Cifrinho.',
  },
]

export default function DiscordPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* hero */}
      <div
        className="relative overflow-hidden rounded-xl border border-line bg-card p-8 elev-sm"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--c-card)) 60%, rgb(88 101 242 / 0.12))',
        }}
      >
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          {/* logo Discord SVG */}
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl"
            style={{ backgroundColor: '#5865F2' }}
          >
            <svg
              className="h-12 w-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5865F2' }}>
              Comunidade oficial
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-ink">Juninhos no Discord</h1>
            <p className="mt-2 text-sm text-mute leading-relaxed">
              Faça parte da nossa comunidade de educação financeira. Tire dúvidas, compartilhe
              conquistas e ajude outros brasileiros a organizarem suas finanças.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <a
                href="https://discord.gg/juninhos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#5865F2' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Entrar no servidor
              </a>
              <div className="flex items-center gap-1.5 text-sm text-mute">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>
                  <strong className="text-ink">2.400+</strong> membros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* canais */}
      <div className="rounded-xl border border-line bg-card p-6 elev-sm">
        <h2 className="text-base font-bold text-ink">Canais em destaque</h2>
        <p className="text-xs text-mute">
          Cada canal tem um foco específico para facilitar as conversas
        </p>
        <div className="mt-5 space-y-3">
          {CHANNELS.map((ch) => (
            <div
              key={ch.name}
              className="flex items-start gap-4 rounded-lg border border-line bg-bg p-4"
            >
              <span className="text-xl leading-none">{ch.icon}</span>
              <div>
                <p className="text-sm font-bold text-ink">{ch.name}</p>
                <p className="mt-0.5 text-xs text-mute leading-relaxed">{ch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* benefícios */}
      <div className="rounded-xl border border-line bg-card p-6 elev-sm">
        <h2 className="text-base font-bold text-ink">Por que entrar?</h2>
        <p className="text-xs text-mute">Vantagens exclusivas para membros da comunidade</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex items-start gap-3 rounded-lg border border-line bg-bg p-4"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md"
                style={{
                  backgroundColor: 'rgb(88 101 242 / 0.12)',
                  color: '#5865F2',
                }}
              >
                {b.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{b.title}</p>
                <p className="mt-0.5 text-xs text-mute leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div
        className="rounded-xl border border-line p-6 text-center elev-sm"
        style={{
          background: 'linear-gradient(135deg, rgb(88 101 242 / 0.08), rgb(88 101 242 / 0.03))',
        }}
      >
        <p className="text-base font-bold text-ink">Pronto para fazer parte?</p>
        <p className="mt-1 text-sm text-mute">É gratuito e leva menos de 1 minuto para entrar.</p>
        <a
          href="https://discord.gg/juninhos"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#5865F2' }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Entrar no servidor Discord
        </a>
        <p className="mt-3 text-xs text-mute">
          Já é membro?{' '}
          <Link href="/gamification" className="font-semibold" style={{ color: '#5865F2' }}>
            Veja suas badges
          </Link>
        </p>
      </div>
    </div>
  )
}
