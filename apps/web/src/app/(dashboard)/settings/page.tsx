'use client'

import { useState } from 'react'

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return <div className={`tgl${on ? ' on' : ''}`} onClick={() => setOn(!on)} />
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* aparência */}
      <div className="rounded-lg border border-line bg-card p-6 elev-sm">
        <h3 className="text-base font-bold text-ink">Aparência</h3>
        <p className="text-xs text-mute">Escolha o tema da interface</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
          {[
            { label: 'Escuro', sub: 'Padrão', theme: 'dark', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>, iconBg: 'bg-bg-deep text-ink' },
            { label: 'Claro', sub: 'Alto contraste', theme: 'light', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>, iconBg: 'bg-elev text-amber' },
          ].map((t) => (
            <button
              key={t.theme}
              onClick={() => document.documentElement.setAttribute('data-theme', t.theme)}
              className="flex items-center gap-3 rounded-lg border-2 border-line p-3 text-left transition-colors hover:border-brand/50"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-md ${t.iconBg}`}>{t.icon}</span>
              <span>
                <span className="block text-sm font-bold text-ink">{t.label}</span>
                <span className="block text-xs text-mute">{t.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* notificações */}
      <div className="rounded-lg border border-line bg-card p-6 elev-sm">
        <h3 className="text-base font-bold text-ink">Notificações</h3>
        <div className="mt-4 divide-y divide-line">
          {[
            { label: 'Alertas de orçamento', desc: 'Avisar quando uma categoria passar de 80%', on: true },
            { label: 'Novas badges', desc: 'Quando você desbloquear uma conquista', on: true },
            { label: 'Lembretes de IR', desc: 'Prazos e documentos pendentes', on: true },
            { label: 'Resumo semanal por e-mail', desc: 'Todo domingo às 9h', on: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-semibold text-ink">{n.label}</p>
                <p className="text-xs text-mute">{n.desc}</p>
              </div>
              <Toggle defaultOn={n.on} />
            </div>
          ))}
        </div>
      </div>

      {/* segurança */}
      <div className="rounded-lg border border-line bg-card p-6 elev-sm">
        <h3 className="text-base font-bold text-ink">Segurança</h3>
        <div className="mt-4 divide-y divide-line">
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm font-semibold text-ink">Autenticação em dois fatores</p>
              <p className="text-xs text-mute">Proteja o acesso com um código extra</p>
            </div>
            <Toggle defaultOn />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm font-semibold text-ink">Login por biometria</p>
              <p className="text-xs text-mute">Face ID / impressão digital no app</p>
            </div>
            <Toggle defaultOn />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <p className="text-sm font-semibold text-ink">Alterar senha</p>
            <button className="rounded-md border border-line bg-bg px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-brand/50">Alterar</button>
          </div>
        </div>
      </div>

      {/* danger zone */}
      <div className="rounded-lg border p-6 elev-sm" style={{ borderColor: 'rgb(var(--c-rose) / 0.3)', backgroundColor: 'rgb(var(--c-card))' }}>
        <h3 className="text-base font-bold text-rose">Zona de risco</h3>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Encerrar conta</p>
            <p className="text-xs text-mute">Exclui permanentemente seus dados</p>
          </div>
          <button className="rounded-md border px-3.5 py-1.5 text-xs font-bold text-rose transition-colors hover:bg-rose/10" style={{ borderColor: 'rgb(var(--c-rose) / 0.4)' }}>Encerrar</button>
        </div>
      </div>
    </div>
  )
}
