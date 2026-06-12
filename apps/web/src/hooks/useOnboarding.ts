'use client'

import { useState, useEffect, useCallback } from 'react'

const KEY_DESKTOP = 'cif.onboarding.desktop.done'
const KEY_MOBILE = 'cif.onboarding.mobile.done'

export type OnboardingVariant = 'desktop' | 'mobile'

// desktop: 5 passos | mobile: 4 passos
export type DesktopStep = 0 | 1 | 2 | 3 | 4
export type MobileStep = 0 | 1 | 2 | 3
export type OnboardingStep = DesktopStep | MobileStep

export function useOnboarding() {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState<OnboardingStep>(0)
  const [variant, setVariant] = useState<OnboardingVariant>('desktop')

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    const key = isMobile ? KEY_MOBILE : KEY_DESKTOP
    setVariant(isMobile ? 'mobile' : 'desktop')
    try {
      if (!localStorage.getItem(key)) setActive(true)
    } catch {}
  }, [])

  const maxStep = variant === 'mobile' ? 3 : 4

  const next = useCallback(() => {
    setStep((s) => (s >= maxStep ? s : ((s + 1) as OnboardingStep)))
  }, [maxStep])

  const finish = useCallback(() => {
    const key = variant === 'mobile' ? KEY_MOBILE : KEY_DESKTOP
    try {
      localStorage.setItem(key, '1')
    } catch {}
    setActive(false)
  }, [variant])

  return { active, step, variant, next, finish }
}
