import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const BADGES = [
  { file: 'Primeiros passos.png', title: 'Primeiros Passos', sub: 'Salvou a 1ª meta', color: '#21C25E', bg: 'rgba(33,194,94,0.15)' },
  { file: 'Organizado.png',       title: 'Organizado',       sub: '30 dias categorizando', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  { file: 'Declarante.png',       title: 'IR em Dia',        sub: 'Declaração pronta',    color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
  { file: 'Economizador.png',     title: 'Economizador',     sub: '7 dias seguidos',      color: '#21C25E', bg: 'rgba(33,194,94,0.15)' },
  { file: 'Empresario.png',       title: 'Empresário',       sub: 'PJ conectado',         color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
]

export default function LandingPage() {
  return (
    <div className="font-sans antialiased overflow-x-hidden" style={{ backgroundColor: '#0F172A', color: '#F9FAFB' }}>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/cifrinho-mascot.png" alt="Mascote Cifrinho" width={36} height={36} className="rounded-full" />
            <span className="text-lg font-extrabold tracking-tight text-ink">Cifrinho</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#recursos" className="text-sm font-medium text-mute transition-colors hover:text-ink">Recursos</a>
            <a href="#imposto" className="text-sm font-medium text-mute transition-colors hover:text-ink">Imposto de Renda</a>
            <a href="#badges" className="text-sm font-medium text-mute transition-colors hover:text-ink">Gamificação</a>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className="hidden rounded-md px-4 py-2 text-sm font-semibold text-mute transition-colors hover:text-ink sm:block">Entrar</Link>
            <Link href="/login" className="rounded-md px-4 py-2 text-sm font-bold text-bg shadow-lg transition-all duration-200 hover:opacity-90" style={{ backgroundColor: '#21C25E' }}>Criar conta</Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(33,194,94,0.18), transparent 60%)' }} />
        <div className="pointer-events-none absolute inset-0 -z-10 h-[120%]" style={{
          backgroundImage: 'linear-gradient(to right, rgba(31,41,55,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,41,55,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
        }} />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-20 sm:px-8 md:pt-24 md:pb-28 lg:grid-cols-[1.05fr_0.95fr]">
          {/* copy — hero entra imediatamente, sem delay */}
          <div className="text-center lg:text-left">
            <a href="https://www.juninhos.com/" target="_blank" rel="noopener"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Construído pela Comunidade Juninhos
            </a>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-ink">
              Sua vida financeira,<br className="hidden sm:block" />
              <span style={{ color: '#21C25E' }}>pessoal e empresarial</span><br className="hidden sm:block" />
              no mesmo lugar.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mute lg:mx-0">
              O Cifrinho organiza despesas, receitas e dados fiscais com inteligência — e ainda deixa seu Imposto de Renda pronto antes da hora. Gestão híbrida de verdade.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <Link href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-md px-7 py-3.5 text-base font-bold text-bg shadow-xl transition-all duration-200 hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: '#21C25E', boxShadow: '0 20px 40px -10px rgba(33,194,94,0.25)' }}>
                Começar gratuitamente
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <a href="#recursos" className="flex w-full items-center justify-center gap-2 rounded-md border border-line bg-card px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-mute/40 sm:w-auto">
                Ver recursos
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mute lg:justify-start">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" style={{ color: '#21C25E' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" style={{ color: '#21C25E' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                Dados criptografados
              </span>
            </div>
          </div>

          {/* mini dashboard mock */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(33,194,94,0.1)' }} />
            <div className="relative mx-auto max-w-md rounded-xl border border-line bg-card/80 p-6 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image src="/cifrinho-mascot.png" alt="" width={44} height={44} className="rounded-full" style={{ animation: 'float 6s ease-in-out infinite' }} />
                  <div>
                    <p className="text-sm font-bold text-ink">Olá, Rafhael</p>
                    <p className="text-xs text-mute">Saldo consolidado</p>
                  </div>
                </div>
                <span className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-semibold" style={{ color: '#21C25E' }}>Maio</span>
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-ink">R$ 24.780<span className="text-mute">,50</span></p>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#21C25E' }}>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 15 6-6 6 6" /></svg>
                +12,4% vs. abril
              </div>
              <div className="mt-6 flex h-28 items-end gap-2.5">
                {[42, 58, 48, 72, 96, 64].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{
                    height: `${h}%`,
                    backgroundColor: i === 4 ? '#21C25E' : i === 2 ? 'rgba(59,130,246,0.6)' : '#1F2937',
                  }} />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-line bg-bg p-3">
                  <p className="text-[11px] font-medium text-mute">Pessoal</p>
                  <p className="mt-0.5 text-sm font-bold text-ink">R$ 9.210</p>
                </div>
                <div className="rounded-md border border-line bg-bg p-3">
                  <p className="text-[11px] font-medium text-mute">Empresarial</p>
                  <p className="mt-0.5 text-sm font-bold text-ink">R$ 15.570</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-md border border-line bg-card px-3 py-2 shadow-xl sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-md" style={{ backgroundColor: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
              </span>
              <div>
                <p className="text-xs font-bold leading-none text-ink">IR em dia!</p>
                <p className="mt-1 text-[10px] text-mute">Badge desbloqueada</p>
              </div>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="mx-auto max-w-7xl border-t border-line/60 px-5 py-7 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-sm text-mute">
            <span className="font-semibold text-ink">Confiado por quem leva grana a sério:</span>
            <span>Freelancers</span><span>MEIs</span><span>Pequenas empresas</span><span>Profissionais PJ</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="recursos" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#21C25E' }}>Recursos</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-ink">Um ecossistema, três frentes</h2>
          <p className="mt-4 text-lg text-mute">Gestão pessoal, controle empresarial e Imposto de Renda — integrados, sem precisar pular entre planilhas e apps.</p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              delay: 0,
              accent: '#21C25E', accentBg: 'rgba(33,194,94,0.15)',
              hoverBorder: 'hover:border-brand/40',
              icon: <><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z" /></>,
              title: 'Gestão pessoal',
              desc: 'Categorize gastos fixos e variáveis automaticamente, acompanhe metas e veja para onde seu dinheiro vai — com relatórios de consumo gerados sozinhos.',
              items: ['Categorização inteligente', 'Relatórios de consumo', 'Metas e alertas'],
            },
            {
              delay: 100,
              accent: '#3B82F6', accentBg: 'rgba(59,130,246,0.15)',
              hoverBorder: 'hover:border-blue/40',
              icon: <><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></>,
              title: 'Gestão empresarial',
              desc: 'Separe fluxos de caixa pessoais dos corporativos com painéis dedicados. Visão clara de receitas, despesas e saúde financeira do seu negócio.',
              items: ['Painéis PF e PJ separados', 'Fluxo de caixa em tempo real', 'Consolidação híbrida'],
            },
            {
              delay: 200,
              accent: '#8B5CF6', accentBg: 'rgba(139,92,246,0.15)',
              hoverBorder: 'hover:border-purple/40',
              icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" /></>,
              title: 'Imposto de Renda',
              desc: 'Um assistente que faz a triagem de comprovantes, estima deduções e prepara os dados da sua declaração ao longo do ano — chega de correria em abril.',
              items: ['Triagem de comprovantes', 'Cálculo estimado de deduções', 'Dados prontos para declarar'],
            },
          ].map(({ delay, accent, accentBg, hoverBorder, icon, title, desc, items }) => (
            <ScrollReveal key={title} delay={delay}>
              <article id={title === 'Imposto de Renda' ? 'imposto' : undefined}
                className={`group h-full rounded-lg border border-line bg-card p-7 transition-all duration-200 hover:-translate-y-1 ${hoverBorder}`}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-md" style={{ backgroundColor: accentBg, color: accent }}>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </div>
                <h3 className="text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{desc}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-ink/90">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* GAMIFICATION */}
      <section id="badges" className="relative overflow-hidden border-y border-line/60 py-20 md:py-28" style={{ backgroundColor: 'rgba(17,24,39,0.3)' }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 opacity-60" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(33,194,94,0.18), transparent 60%)' }} />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#8B5CF6' }}>Gamificação</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-ink">Organizar a grana<br />vira conquista.</h2>
              <p className="mt-5 text-lg leading-relaxed text-mute">Cada hábito financeiro saudável desbloqueia uma badge. Mantenha sequências, suba de nível e acompanhe seu progresso junto com o squad da Comunidade Juninhos.</p>
              <div className="mt-8 flex items-center gap-5">
                <div>
                  <p className="text-3xl font-extrabold" style={{ color: '#21C25E' }}>Nível 7</p>
                  <p className="text-sm text-mute">Poupador Consciente</p>
                </div>
                <div className="h-12 w-px bg-line" />
                <div>
                  <p className="text-3xl font-extrabold text-ink">12</p>
                  <p className="text-sm text-mute">badges conquistadas</p>
                </div>
              </div>
              <div className="mt-7 max-w-sm">
                <div className="mb-1.5 flex justify-between text-xs font-medium text-mute">
                  <span>Progresso para o Nível 8</span>
                  <span className="text-ink">740 / 1000 XP</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg">
                  <div className="h-full rounded-full" style={{ width: '74%', background: 'linear-gradient(to right, #21C25E, #3B82F6)' }} />
                </div>
              </div>
            </ScrollReveal>

            {/* badge grid com imagens reais */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {BADGES.map(({ file, title, sub, color, bg }, i) => (
                <ScrollReveal key={title} delay={i * 80}>
                  <div className="group h-full rounded-lg border border-line bg-card p-5 text-center transition-all hover:-translate-y-1">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: bg }}>
                      <Image
                        src={`/badges/${file}`}
                        alt={title}
                        width={48}
                        height={48}
                        className="object-contain drop-shadow-md"
                        unoptimized
                      />
                    </div>
                    <p className="mt-3 text-sm font-bold text-ink">{title}</p>
                    <p className="mt-0.5 text-[11px] text-mute">{sub}</p>
                  </div>
                </ScrollReveal>
              ))}
              {/* locked */}
              <ScrollReveal delay={BADGES.length * 80}>
                <div className="h-full rounded-lg border border-dashed border-line p-5 text-center opacity-60" style={{ backgroundColor: 'rgba(15,23,42,0.4)' }}>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-line/40 text-mute">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  </div>
                  <p className="mt-3 text-sm font-bold text-mute">Mestre</p>
                  <p className="mt-0.5 text-[11px] text-mute">Bloqueada</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-xl border border-line bg-card px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(33,194,94,0.18), transparent 60%)' }} />
            <Image src="/cifrinho-mascot.png" alt="Mascote Cifrinho" width={96} height={96} className="relative mx-auto mb-6 rounded-full" style={{ animation: 'float 6s ease-in-out infinite' }} />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-ink">Comece a organizar seu cifrinho hoje</h2>
            <p className="relative mx-auto mt-4 max-w-lg text-lg text-mute">Gratuito para começar. Sem cartão, sem complicação — só clareza financeira de verdade.</p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-md px-8 py-3.5 text-base font-bold text-bg shadow-xl transition-all duration-200 hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: '#21C25E', boxShadow: '0 20px 40px -10px rgba(33,194,94,0.25)' }}>
                Criar conta grátis
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <a href="#recursos" className="flex w-full items-center justify-center rounded-md border border-line bg-bg px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:border-mute/40 sm:w-auto">
                Ver recursos
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line/70">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <Image src="/cifrinho-mascot.png" alt="" width={36} height={36} className="rounded-full" />
                <span className="text-lg font-extrabold tracking-tight text-ink">Cifrinho</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">Ecossistema inteligente de gestão financeira híbrida — pessoal, empresarial e fiscal.</p>
              <a href="https://www.juninhos.com/" target="_blank" rel="noopener"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#8B5CF6' }} />
                Comunidade Juninhos
              </a>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Produto</p>
              <ul className="mt-4 space-y-3 text-sm text-mute">
                <li><a href="#recursos" className="transition-colors hover:text-ink">Gestão pessoal</a></li>
                <li><a href="#recursos" className="transition-colors hover:text-ink">Gestão empresarial</a></li>
                <li><a href="#imposto" className="transition-colors hover:text-ink">Imposto de Renda</a></li>
                <li><a href="#badges" className="transition-colors hover:text-ink">Gamificação</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Recursos</p>
              <ul className="mt-4 space-y-3 text-sm text-mute">
                <li><a href="/ajuda" className="transition-colors hover:text-ink">Central de ajuda</a></li>
                <li><a href="/status" className="transition-colors hover:text-ink">Status</a></li>
                <li><a href="/roadmap" className="transition-colors hover:text-ink">Roadmap</a></li>
                <li><a href="/discord" className="transition-colors hover:text-ink">Discord</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Legal</p>
              <ul className="mt-4 space-y-3 text-sm text-mute">
                <li><a href="/legal#privacidade" className="transition-colors hover:text-ink">Privacidade</a></li>
                <li><a href="/legal#termos" className="transition-colors hover:text-ink">Termos</a></li>
                <li><a href="/legal#seguranca" className="transition-colors hover:text-ink">Segurança</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/70 pt-7 text-sm text-mute sm:flex-row">
            <p>© 2026 Cifrinho · Uso educacional ·{' '}
              <a href="https://www.juninhos.com/" target="_blank" rel="noopener" className="transition-colors hover:text-ink">Juninhos Community</a>.
            </p>
            <p className="flex items-center gap-1.5">
              Feito com{' '}
              <svg className="h-4 w-4 inline" style={{ color: '#21C25E' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.35-9.3-8.06C1.1 10.43 1.5 7.2 4 5.8c1.9-1.06 4.2-.4 5.4 1.1L12 9.9l2.6-3c1.2-1.5 3.5-2.16 5.4-1.1 2.5 1.4 2.9 4.63 1.3 7.14C18.7 16.65 12 21 12 21Z" /></svg>
              {' '}e muito café.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  )
}
