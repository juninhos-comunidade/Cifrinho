'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [errId, setErrId] = useState('CIF-5XX-9F2A')
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    console.error(error)
    const hex = '0123456789ABCDEF'
    const rnd = (n: number) =>
      Array.from({ length: n }, () => hex[Math.floor(Math.random() * 16)]).join('')
    setErrId(`CIF-5XX-${rnd(4)}`)
  }, [error])

  function handleRetry() {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
      reset()
    }, 750)
  }

  return (
    <div
      className="font-sans min-h-screen relative"
      style={{ backgroundColor: 'rgb(var(--c-bg))', color: 'rgb(var(--c-ink))' }}
    >
      {/* rose-tinted ambient glow for error mood */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgb(var(--c-rose) / .12), transparent 60%)',
        }}
      />
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
          {/* ghost "500" behind */}
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
            500
          </span>

          <div className="relative flex w-full max-w-xl flex-col items-center text-center">
            {/* mascot: woozy animation + orbiting stars + spinning spiral eyes */}
            <div className="relative" style={{ animation: 'woozy 4.5s ease-in-out infinite' }}>
              {/* orbiting stars above the head */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-2%',
                  left: '50%',
                  width: 120,
                  height: 54,
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                {[
                  { a: '0deg', color: '#fbbf24', size: 20 },
                  { a: '120deg', color: '#60a5fa', size: 15 },
                  { a: '240deg', color: '#f472b6', size: 17 },
                ].map(({ a, color, size }) => (
                  <span
                    key={a}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      color,
                      animation: 'orbit 3s linear infinite',
                      ['--a' as string]: a,
                    }}
                  >
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.6 6.6L21 9.3l-5 4.3 1.6 6.6L12 16.9 6.4 20.2 8 13.6l-5-4.3 6.4-.7z" />
                    </svg>
                  </span>
                ))}
              </div>

              <div className="relative" style={{ width: 240, height: 240 }}>
                <Image
                  src="/cifrinho-mascot.png"
                  alt="Mascote Cifrinho atordoado"
                  width={240}
                  height={240}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 24px 38px rgb(var(--c-rose) / .26))',
                  }}
                  priority
                />

                {/* left eye: green mask + spinning spiral */}
                <span
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    background: '#10b981',
                    borderRadius: '50%',
                    left: '24.0%',
                    top: '24.0%',
                    width: '9.8%',
                    height: '9.8%',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    zIndex: 3,
                    left: '21.4%',
                    top: '21.4%',
                    width: '15%',
                    height: '15%',
                  }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#0a5c3f"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      animation: 'spin 1.6s linear infinite',
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <path d="M16 16 a1.6 1.6 0 1 0 3.2 0 a3.2 3.2 0 1 1 -6.4 0 a4.8 4.8 0 1 0 9.6 0 a6.4 6.4 0 1 1 -12.8 0 a8 8 0 1 0 16 0" />
                  </svg>
                </span>

                {/* right eye: green mask + counter-clockwise spiral */}
                <span
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    background: '#10b981',
                    borderRadius: '50%',
                    left: '67.3%',
                    top: '24.0%',
                    width: '9.8%',
                    height: '9.8%',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    zIndex: 3,
                    left: '64.7%',
                    top: '21.4%',
                    width: '15%',
                    height: '15%',
                  }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#0a5c3f"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      animation: 'spin 1.6s linear infinite reverse',
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <path d="M16 16 a1.6 1.6 0 1 0 3.2 0 a3.2 3.2 0 1 1 -6.4 0 a4.8 4.8 0 1 0 9.6 0 a6.4 6.4 0 1 1 -12.8 0 a8 8 0 1 0 16 0" />
                  </svg>
                </span>
              </div>
            </div>

            {/* label pill */}
            <div
              className="mt-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ border: '1px solid rgb(var(--c-line))', background: 'rgb(var(--c-card))' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'rgb(var(--c-rose))' }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Erro 500 · Inesperado
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              Eita… algo deu
              <br />
              errado por aqui.
            </h1>
            <p
              className="mt-5 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: 'rgb(var(--c-mute))' }}
            >
              Nosso cofrinho ficou meio tonto e não conseguiu carregar essa página. Já estamos de
              olho — respira fundo e tenta de novo em instantes.
            </p>

            {/* actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleRetry}
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: 'rgb(var(--c-brand))',
                  boxShadow: '0 14px 30px -10px rgb(var(--c-brand) / .5)',
                  pointerEvents: spinning ? 'none' : 'auto',
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
                  style={spinning ? { animation: 'spin .7s linear infinite' } : undefined}
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Tentar novamente
              </button>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold transition-colors"
                style={{
                  border: '1px solid rgb(var(--c-line))',
                  background: 'rgb(var(--c-card))',
                  color: 'rgb(var(--c-ink))',
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
            </div>

            {/* status link + error id */}
            <div
              className="mt-9 flex flex-col items-center gap-2 text-sm"
              style={{ color: 'rgb(var(--c-faint))' }}
            >
              <Link
                href="/status"
                className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'rgb(var(--c-brand))' }}
                />
                Ver status dos sistemas
              </Link>
              <p className="text-xs">
                Código de referência:{' '}
                <span className="font-mono font-semibold" style={{ color: 'rgb(var(--c-mute))' }}>
                  {errId}
                </span>
              </p>
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
        @keyframes woozy {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          25%     { transform: translateY(-6px) rotate(3deg); }
          50%     { transform: translateY(-2px) rotate(-3deg); }
          75%     { transform: translateY(-7px) rotate(4deg); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(var(--a,0deg)) translateX(46px) rotate(calc(-1 * var(--a,0deg))); }
          to   { transform: rotate(calc(var(--a,0deg) + 360deg)) translateX(46px) rotate(calc(-1 * (var(--a,0deg) + 360deg))); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
