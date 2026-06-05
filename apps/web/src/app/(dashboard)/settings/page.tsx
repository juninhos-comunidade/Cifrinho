'use client'

import { useState } from 'react'
import { usePreferences } from '@/contexts/PreferencesContext'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'

function Toggle({ defaultOn = false, onChange }: { defaultOn?: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div
      className={`tgl${on ? ' on' : ''}`}
      onClick={() => {
        const next = !on
        setOn(next)
        onChange?.(next)
      }}
    />
  )
}

function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const { logout } = useAuth()
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    setLoading(true)
    setError('')
    try {
      await api.delete('/auth/account')
      await logout()
    } catch {
      setError('Não foi possível encerrar a conta. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md rounded-xl border bg-card shadow-2xl" style={{ borderColor: 'rgb(var(--c-rose) / 0.3)' }}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose/10 text-rose">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </span>
            <div>
              <h2 className="text-base font-bold text-ink">Encerrar conta permanentemente</h2>
              <p className="mt-1 text-sm text-mute">
                Todos os seus dados — transações, categorias, badges e configurações — serão excluídos de forma irreversível.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold text-mute">
              Digite <span className="font-bold text-rose">ENCERRAR</span> para confirmar
            </label>
            <input
              className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-rose/60"
              placeholder="ENCERRAR"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg border border-rose/20 bg-rose/10 px-3 py-2 text-xs text-rose">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4" style={{ borderColor: 'rgb(var(--c-line))' }}>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-line bg-bg px-4 py-2 text-sm font-semibold text-mute transition-colors hover:text-ink disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={confirm !== 'ENCERRAR' || loading}
            className="rounded-lg bg-rose px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Encerrando…' : 'Encerrar conta'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { businessEnabled, setBusinessEnabled } = usePreferences()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

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

      {/* contas */}
      <div className="rounded-lg border border-line bg-card p-6 elev-sm">
        <h3 className="text-base font-bold text-ink">Contas</h3>
        <p className="text-xs text-mute">Ative ou desative módulos do dashboard</p>
        <div className="mt-4 divide-y divide-line">
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm font-semibold text-ink">Conta empresarial (MEI / PJ)</p>
              <p className="text-xs text-mute">Exibe o módulo Empresarial e a opção "Empresarial" nos lançamentos</p>
            </div>
            <Toggle defaultOn={businessEnabled} onChange={setBusinessEnabled} />
          </div>
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
            <p className="text-sm font-semibold text-ink">Alterar senha</p>
            <button className="rounded-md border border-line bg-bg px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-brand/50">Alterar</button>
          </div>
        </div>
      </div>

      {/* zona de risco */}
      <div className="rounded-lg border p-6 elev-sm" style={{ borderColor: 'rgb(var(--c-rose) / 0.3)', backgroundColor: 'rgb(var(--c-card))' }}>
        <h3 className="text-base font-bold text-rose">Zona de risco</h3>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Encerrar conta</p>
            <p className="text-xs text-mute">Exclui permanentemente seus dados</p>
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-md border px-3.5 py-1.5 text-xs font-bold text-rose transition-colors hover:bg-rose/10"
            style={{ borderColor: 'rgb(var(--c-rose) / 0.4)' }}
          >
            Encerrar
          </button>
        </div>
      </div>

      {deleteModalOpen && <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />}
    </div>
  )
}
