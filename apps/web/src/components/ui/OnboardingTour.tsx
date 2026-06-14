'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import type { OnboardingStep, OnboardingVariant } from '@/hooks/useOnboarding'

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

interface Step {
  target: string
  title: string
  message: string
  position: 'right' | 'left' | 'top' | 'bottom'
  requiresDrawer?: boolean // mobile only: abre o drawer antes de medir
}

// ---------------------------------------------------------------------------
// Passos desktop — sidebar sempre visível, grid 4 colunas
// ---------------------------------------------------------------------------

const STEPS_DESKTOP: Step[] = [
  {
    target: 'kpi-balance',
    title: 'Seu saldo consolidado',
    message:
      'Oi! Eu sou o Cifrinho 👋 Aqui você acompanha seu saldo total em tempo real — pessoal e empresarial juntos.',
    position: 'bottom',
  },
  {
    target: 'btn-lancar',
    title: 'Registre seu primeiro lançamento',
    message:
      'Clique aqui para adicionar uma receita ou despesa. Quanto mais você lançar, melhor o Cifrinho te ajuda!',
    position: 'bottom',
  },
  {
    target: 'nav-personal',
    title: 'Gestão pessoal',
    message:
      'Na sidebar você navega entre as seções. "Pessoal" é onde ficam seus gastos organizados por categoria.',
    position: 'right',
  },
  {
    target: 'card-goals',
    title: 'Crie suas metas',
    message:
      'Defina metas de economia — viagem, reserva de emergência, qualquer objetivo. O Cifrinho acompanha o progresso.',
    position: 'top',
  },
  {
    target: 'avatar-header',
    title: 'Seu perfil',
    message: 'Tudo pronto! Acesse seu perfil para personalizar a conta. Bom controle, Juninho! 🎉',
    position: 'bottom',
  },
]

// ---------------------------------------------------------------------------
// Passos mobile — sidebar off-canvas, layout empilhado em coluna única
// ---------------------------------------------------------------------------

const STEPS_MOBILE: Step[] = [
  {
    target: 'kpi-balance',
    title: 'Seu saldo consolidado',
    message:
      'Oi! Eu sou o Cifrinho 👋 Aqui você vê seu saldo total. Role a tela para explorar seus gráficos e transações.',
    position: 'bottom',
  },
  {
    target: 'btn-lancar',
    title: 'Primeiro lançamento',
    message:
      'Toque aqui para registrar uma receita ou despesa. É rápido e o Cifrinho categoriza pra você!',
    position: 'bottom',
  },
  {
    target: 'nav-personal',
    title: 'Menu de navegação',
    message:
      'O menu lateral abre aqui. "Pessoal" é onde ficam seus gastos, categorias e histórico.',
    position: 'bottom',
    requiresDrawer: true,
  },
  {
    target: 'avatar-header',
    title: 'Seu perfil',
    message:
      'Tudo pronto! Toque aqui para acessar seu perfil e personalizar a conta. Bom controle! 🎉',
    position: 'bottom',
  },
]

// ---------------------------------------------------------------------------
// Eventos para controlar o drawer a partir do tour
// ---------------------------------------------------------------------------

export function dispatchOpenDrawer() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('onboarding:open-drawer'))
}
export function dispatchCloseDrawer() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('onboarding:close-drawer'))
}

// ---------------------------------------------------------------------------
// Geometria
// ---------------------------------------------------------------------------

interface SpotlightRect {
  top: number
  left: number
  width: number
  height: number
}

const GAP = 10

function getRect(target: string): SpotlightRect | null {
  const el = document.querySelector(`[data-onboarding="${target}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  // elemento existe no DOM mas está fora da viewport (ex: drawer fechado)
  if (r.right < 0 || r.left > window.innerWidth || r.bottom < 0 || r.top > window.innerHeight)
    return null
  return {
    top: r.top - GAP,
    left: r.left - GAP,
    width: r.width + GAP * 2,
    height: r.height + GAP * 2,
  }
}

function getBalloonStyle(rect: SpotlightRect, preferred: Step['position']) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const BW = Math.min(300, vw - 24) // largura do balloon clamped à viewport
  const BH = 170 // altura estimada para cálculo de espaço
  const M = 12

  const spaceBottom = vh - (rect.top + rect.height)
  const spaceTop = rect.top
  const spaceRight = vw - (rect.left + rect.width)

  // fallback automático se a posição preferida não couber
  let pos = preferred
  if (pos === 'right' && spaceRight < BW + M) pos = 'bottom'
  if (pos === 'bottom' && spaceBottom < BH + M) pos = 'top'
  if (pos === 'top' && spaceTop < BH + M) pos = 'bottom'

  const cx = rect.left + rect.width / 2
  const clampedL = Math.max(M, Math.min(cx - BW / 2, vw - BW - M))

  switch (pos) {
    case 'bottom':
      return { top: rect.top + rect.height + M, left: clampedL }
    case 'top':
      return { top: Math.max(M, rect.top - BH - M), left: clampedL }
    case 'right':
      return {
        top: Math.max(M, Math.min(rect.top + rect.height / 2 - BH / 2, vh - BH - M)),
        left: Math.min(rect.left + rect.width + M, vw - BW - M),
      }
    case 'left':
      return {
        top: Math.max(M, Math.min(rect.top + rect.height / 2 - BH / 2, vh - BH - M)),
        left: Math.max(M, rect.left - BW - M),
      }
  }
}

// ---------------------------------------------------------------------------
// Componente do balão com mascote
// ---------------------------------------------------------------------------

function Balloon({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="shrink-0" style={{ animation: 'ob-float 3s ease-in-out infinite' }}>
        <Image
          src="/cifrinho-mascot.png"
          alt="Cifrinho"
          width={56}
          height={56}
          style={{ filter: 'drop-shadow(0 6px 12px rgb(16 185 129 / .4))' }}
        />
      </div>
      <div
        className="min-w-0 rounded-2xl rounded-tl-sm border p-3.5"
        style={{
          background: 'rgb(var(--c-card))',
          borderColor: 'rgb(var(--c-line))',
          boxShadow: '0 16px 48px rgb(0 0 0 / .32)',
        }}
      >
        <p className="text-sm font-bold text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed" style={{ color: 'rgb(var(--c-mute))' }}>
          {message}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

interface OnboardingTourProps {
  step: OnboardingStep
  variant: OnboardingVariant
  onNext: () => void
  onFinish: () => void
}

export function OnboardingTour({ step, variant, onNext, onFinish }: OnboardingTourProps) {
  const steps = variant === 'mobile' ? STEPS_MOBILE : STEPS_DESKTOP
  const totalSteps = steps.length
  const current = steps[step] ?? steps[steps.length - 1]
  const isLast = step >= totalSteps - 1

  const [rect, setRect] = useState<SpotlightRect | null>(null)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number>(0)

  // mede o elemento alvo (com retry para aguardar render/API)
  useEffect(() => {
    setVisible(false)
    cancelAnimationFrame(rafRef.current)

    const needsDrawer = !!current.requiresDrawer && variant === 'mobile'
    if (needsDrawer) dispatchOpenDrawer()

    let attempts = 0
    const delay = needsDrawer ? 340 : 0 // aguarda animação do drawer (300ms)

    const timer = setTimeout(() => {
      function tryMeasure() {
        const r = getRect(current.target)
        if (r) {
          setRect(r)
          setTimeout(() => setVisible(true), 50)
          return
        }
        if (++attempts < 30) rafRef.current = requestAnimationFrame(tryMeasure)
      }
      rafRef.current = requestAnimationFrame(tryMeasure)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [current.target, current.requiresDrawer, variant])

  // fecha drawer ao sair de um passo que o abriu
  useEffect(() => {
    return () => {
      if (current.requiresDrawer && variant === 'mobile') dispatchCloseDrawer()
    }
  }, [current.requiresDrawer, variant])

  const handleFinish = useCallback(() => {
    if (variant === 'mobile') dispatchCloseDrawer()
    onFinish()
  }, [variant, onFinish])

  const handleNext = useCallback(() => {
    const nextStep = steps[step + 1]
    if (current.requiresDrawer && !nextStep?.requiresDrawer && variant === 'mobile') {
      dispatchCloseDrawer()
    }
    onNext()
  }, [steps, step, current.requiresDrawer, variant, onNext])

  // re-mede no resize
  useEffect(() => {
    function onResize() {
      const r = getRect(current.target)
      if (r) setRect(r)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [current.target])

  // scroll suave para o alvo
  useEffect(() => {
    if (!visible) return
    document
      .querySelector(`[data-onboarding="${current.target}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [visible, current.target])

  const balloonW = typeof window !== 'undefined' ? Math.min(300, window.innerWidth - 24) : 300
  const balloonStyle = rect ? getBalloonStyle(rect, current.position) : {}

  return (
    <>
      <style>{`
        @keyframes ob-float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes ob-in {
          from { opacity:0; transform:translateY(8px) scale(.97); }
          to   { opacity:1; transform:none; }
        }
      `}</style>

      {/* overlay escuro com buraco radial sobre o alvo */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: 'none',
          background: rect
            ? `radial-gradient(ellipse ${rect.width / 2 + 28}px ${rect.height / 2 + 20}px at ${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px, transparent 68%, rgb(2 6 23 / 0.84) 100%)`
            : 'rgb(2 6 23 / 0.84)',
        }}
      />

      {/* ring de destaque */}
      {rect && visible && (
        <div
          className="fixed z-[9999] rounded-xl pointer-events-none"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: '0 0 0 3px rgb(16 185 129 / .75), 0 0 28px rgb(16 185 129 / .28)',
            transition: 'top .28s ease, left .28s ease, width .28s ease, height .28s ease',
          }}
        />
      )}

      {/* balloon */}
      {rect && visible && (
        <div
          className="fixed z-[10000]"
          style={{
            ...balloonStyle,
            width: balloonW,
            animation: 'ob-in .3s cubic-bezier(.2,1,.4,1) both',
          }}
        >
          <Balloon title={current.title} message={current.message} />

          {/* controles */}
          <div className="mt-2.5 flex items-center justify-between px-0.5">
            {/* dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 18 : 6,
                    height: 6,
                    background:
                      i === step
                        ? 'rgb(var(--c-brand))'
                        : i < step
                          ? 'rgb(var(--c-brand) / .4)'
                          : 'rgb(var(--c-line))',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFinish}
                className="rounded-md px-2.5 py-1.5 text-xs font-semibold"
                style={{ color: 'rgb(var(--c-mute))' }}
              >
                Pular
              </button>
              <button
                onClick={isLast ? handleFinish : handleNext}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-bold text-white"
                style={{ background: 'rgb(var(--c-brand))' }}
              >
                {isLast ? 'Começar!' : 'Próximo'}
                {!isLast && (
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toque fora avança */}
      {visible && (
        <div
          className="fixed inset-0 z-[9997] cursor-pointer"
          onClick={isLast ? handleFinish : handleNext}
        />
      )}
    </>
  )
}
