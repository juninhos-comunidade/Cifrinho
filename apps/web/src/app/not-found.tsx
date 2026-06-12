import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="font-sans min-h-screen relative"
      style={{ backgroundColor: 'rgb(var(--c-bg))', color: 'rgb(var(--c-ink))' }}
    >
      {/* ambient background */}
      <div className="glow pointer-events-none fixed inset-0" />
      <div
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(31,41,55,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,41,55,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        }}
      />

      <div className="relative flex min-h-screen flex-col">
        {/* top bar */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/cifrinho-mascot.png"
              alt="Cifrinho"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xl font-extrabold tracking-tight">Cifrinho</span>
          </Link>
        </header>

        {/* centered content */}
        <main className="relative flex flex-1 items-center justify-center px-6 py-10">
          {/* ghost "404" behind */}
          <span
            className="pointer-events-none absolute select-none text-[34vw] sm:text-[26vw] lg:text-[280px]"
            aria-hidden="true"
            style={{
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '2px rgb(var(--c-line))',
            }}
          >
            404
          </span>

          <div className="relative flex w-full max-w-xl flex-col items-center text-center">
            {/* mascot with pigfloat + worried eyelids + sweat drop + question marks */}
            <div className="relative" style={{ animation: 'pigfloat 6s ease-in-out infinite' }}>
              <div className="relative" style={{ width: 240, height: 240 }}>
                <Image
                  src="/cifrinho-mascot.png"
                  alt="Mascote Cifrinho confuso"
                  width={240}
                  height={240}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 24px 38px rgb(var(--c-brand) / .28))',
                  }}
                  priority
                />

                {/* worried half-lidded eyelids */}
                <span
                  style={{
                    position: 'absolute',
                    background: '#10b981',
                    zIndex: 3,
                    borderRadius: '0 0 60% 60% / 0 0 80% 80%',
                    transform: 'scaleY(.42)',
                    transformOrigin: 'top center',
                    left: '25.5%',
                    top: '23.8%',
                    width: '6.8%',
                    height: '10.4%',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    background: '#10b981',
                    zIndex: 3,
                    borderRadius: '0 0 60% 60% / 0 0 80% 80%',
                    transform: 'scaleY(.42)',
                    transformOrigin: 'top center',
                    left: '68.8%',
                    top: '23.8%',
                    width: '6.8%',
                    height: '10.4%',
                  }}
                />

                {/* sweat drop */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '3%',
                    right: '13%',
                    width: 30,
                    height: 38,
                    zIndex: 6,
                    animation: 'sweatbob 2.6s ease-in-out infinite',
                  }}
                >
                  <svg
                    viewBox="0 0 30 38"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      filter: 'drop-shadow(0 4px 7px rgb(0 0 0 / .28))',
                    }}
                  >
                    <defs>
                      <linearGradient id="dropg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#7dd3fc" />
                        <stop offset="1" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M15 1 C15 1 2 19 2 27 a13 13 0 0 0 26 0 C28 19 15 1 15 1 Z"
                      fill="url(#dropg)"
                    />
                    <ellipse cx="10.5" cy="26" rx="3.4" ry="5" fill="#fff" opacity=".55" />
                  </svg>
                </span>
              </div>

              {/* floating question marks */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  color: 'rgb(var(--c-faint))',
                  fontWeight: 900,
                  pointerEvents: 'none',
                  fontSize: '1.5rem',
                  top: '6%',
                  left: '-6%',
                  animation: 'qfloat 4.5s ease-in-out infinite',
                  ['--r' as string]: '-12deg',
                }}
              >
                ?
              </span>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  color: 'rgb(var(--c-faint))',
                  fontWeight: 900,
                  pointerEvents: 'none',
                  fontSize: '1.125rem',
                  top: '-4%',
                  left: '46%',
                  animation: 'qfloat 4.5s ease-in-out 1.1s infinite',
                  ['--r' as string]: '14deg',
                }}
              >
                ?
              </span>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  color: 'rgb(var(--c-faint))',
                  fontWeight: 900,
                  pointerEvents: 'none',
                  fontSize: '1.25rem',
                  top: '18%',
                  right: '-10%',
                  animation: 'qfloat 4.5s ease-in-out .6s infinite',
                  ['--r' as string]: '8deg',
                }}
              >
                ?
              </span>
            </div>

            {/* label pill */}
            <div
              className="mt-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ border: '1px solid rgb(var(--c-line))', background: 'rgb(var(--c-card))' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'rgb(var(--c-amber))' }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Erro 404
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              Ops! Essa página
              <br />a gente não achou.
            </h1>
            <p
              className="mt-5 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: 'rgb(var(--c-mute))' }}
            >
              Desculpa o transtorno — o link pode ter mudado de lugar ou nunca ter existido. Mas
              relaxa: seu dinheiro continua seguro com a gente.
            </p>

            {/* actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: 'rgb(var(--c-brand))',
                  boxShadow: '0 14px 30px -10px rgb(var(--c-brand) / .5)',
                }}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
                </svg>
                Voltar ao início
              </Link>
              <Link
                href="/overview"
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold transition-colors"
                style={{
                  border: '1px solid rgb(var(--c-line))',
                  background: 'rgb(var(--c-card))',
                  color: 'rgb(var(--c-ink))',
                }}
              >
                Ir para o painel
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* quick links */}
            <div
              className="mt-9 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm"
              style={{ color: 'rgb(var(--c-faint))' }}
            >
              <span>Talvez você procure:</span>
              <Link
                href="/overview"
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Painel
              </Link>
              <span style={{ color: 'rgb(var(--c-line))' }}>·</span>
              <Link
                href="/roadmap"
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Roadmap
              </Link>
              <span style={{ color: 'rgb(var(--c-line))' }}>·</span>
              <Link
                href="/status"
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Status
              </Link>
              <span style={{ color: 'rgb(var(--c-line))' }}>·</span>
              <Link
                href="/login"
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Entrar
              </Link>
            </div>
          </div>
        </main>

        {/* footer */}
        <footer className="px-6 py-6 text-center sm:px-10">
          <p className="text-xs" style={{ color: 'rgb(var(--c-faint))' }}>
            © 2026 Cifrinho · Feito pela Comunidade Juninhos
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes pigfloat {
          0%,100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes sweatbob {
          0%,100% { transform: translateY(0) scale(1); }
          45%     { transform: translateY(5px) scale(1.04,.97); }
          70%     { transform: translateY(2px) scale(.98,1.03); }
        }
        @keyframes qfloat {
          0%,100% { transform: translateY(0) rotate(var(--r,0deg)); opacity:.35; }
          50%     { transform: translateY(-10px) rotate(var(--r,0deg)); opacity:.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
