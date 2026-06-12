'use client'

import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '@/components/ui/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useOnboarding } from '@/hooks/useOnboarding'
import { OnboardingTour } from '@/components/ui/OnboardingTour'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useCurrentUser()
  const {
    active: tourActive,
    step: tourStep,
    variant: tourVariant,
    next: tourNext,
    finish: tourFinish,
  } = useOnboarding()

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // trava scroll do body quando drawer está aberto
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', drawerOpen)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [drawerOpen])

  // fecha drawer com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  // abre/fecha drawer a pedido do OnboardingTour no mobile
  useEffect(() => {
    function openDrawer() {
      setDrawerOpen(true)
    }
    function closeDrawerEv() {
      setDrawerOpen(false)
    }
    window.addEventListener('onboarding:open-drawer', openDrawer)
    window.addEventListener('onboarding:close-drawer', closeDrawerEv)
    return () => {
      window.removeEventListener('onboarding:open-drawer', openDrawer)
      window.removeEventListener('onboarding:close-drawer', closeDrawerEv)
    }
  }, [])

  function handleMenuToggle() {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    if (isDesktop) setCollapsed((c) => !c)
    else setDrawerOpen((o) => !o)
  }

  const pl = collapsed ? 'lg:pl-[76px]' : 'lg:pl-[264px]'

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'rgb(var(--c-bg))' }}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        drawerOpen={drawerOpen}
        onDrawerClose={closeDrawer}
      />

      {/* backdrop mobile — fecha o drawer ao clicar fora */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgb(2 6 23 / 0.55)', backdropFilter: 'blur(2px)' }}
          onClick={tourActive ? undefined : closeDrawer}
          aria-hidden="true"
        />
      )}

      <div className={`flex flex-col flex-1 min-w-0 ${pl} transition-[padding] duration-300`}>
        <Header onMenuToggle={handleMenuToggle} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
      {tourActive && (
        <OnboardingTour
          step={tourStep}
          variant={tourVariant}
          onNext={tourNext}
          onFinish={tourFinish}
        />
      )}
    </div>
  )
}
