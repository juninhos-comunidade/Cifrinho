'use client'

import { useState, useRef, useEffect } from 'react'
import { useGoals } from '@/hooks/useGoals'
import { fmt } from '@/hooks/useTransactions'

interface Props {
  open: boolean
  onClose: () => void
}

const MONTHS_OPTIONS = [
  { value: 1, label: '1 mês' },
  { value: 2, label: '2 meses' },
  { value: 3, label: '3 meses' },
] as const

export function GoalModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { create } = useGoals()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [months, setMonths] = useState<1 | 2 | 3>(1)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) { setName(''); setAmount(''); setMonths(1); setError('') }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  function parseAmount(raw: string): number {
    return Number(raw.replace(/\./g, '').replace(',', '.'))
  }

  const parsed = parseAmount(amount)
  const monthly = parsed > 0 ? Math.ceil((parsed / months) * 100) / 100 : 0

  async function handleSubmit() {
    const targetAmount = parseAmount(amount)
    if (!name.trim()) { setError('Dê um nome para a meta.'); return }
    if (isNaN(targetAmount) || targetAmount <= 0) { setError('Valor inválido.'); return }

    try {
      await create.mutateAsync({ name: name.trim(), targetAmount, months })
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Erro ao criar meta.')
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgb(0 0 0 / 0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-line bg-card shadow-xl"
        style={{ animation: 'modal-in .22s cubic-bezier(.2,1,.4,1) both' }}
      >
        {/* cabeçalho */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-brand/15 text-brand text-lg">🎯</span>
            <h2 className="text-base font-bold text-ink">Nova meta de economia</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-mute transition-colors hover:bg-elev hover:text-ink"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* corpo */}
        <div className="space-y-4 px-6 py-5">
          {/* nome */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute">Nome da meta</label>
            <input
              type="text"
              placeholder="Ex: Reserva de emergência"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              className="modal-field"
            />
          </div>

          {/* valor */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute">Quanto quer economizar? (R$)</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={amount}
              onChange={e => { setAmount(e.target.value); setError('') }}
              className="modal-field"
            />
          </div>

          {/* prazo */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute">Em quanto tempo?</label>
            <div className="seg w-full">
              {MONTHS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`flex-1 ${months === opt.value ? 'on' : ''}`}
                  onClick={() => setMonths(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* preview */}
          {monthly > 0 && (
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs text-mute">Será lançado como despesa mensal</p>
              <p className="mt-1 text-2xl font-extrabold text-brand">{fmt(monthly)}<span className="text-sm font-semibold text-mute">/mês</span></p>
              <p className="mt-0.5 text-xs text-mute">
                por {months} {months === 1 ? 'mês' : 'meses'} · total {fmt(parsed)}
              </p>
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-rose/20 bg-rose/10 px-4 py-2.5 text-sm text-rose">{error}</p>
          )}
        </div>

        {/* rodapé */}
        <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={create.isPending}
            className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-mute transition-colors hover:bg-elev disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={create.isPending}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dk disabled:opacity-50"
          >
            {create.isPending ? 'Criando…' : 'Criar meta'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to   { opacity: 1; transform: none; }
        }
        .modal-field {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgb(var(--c-line));
          background: rgb(var(--c-bg));
          color: rgb(var(--c-ink));
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .modal-field::placeholder { color: rgb(var(--c-faint)); }
        .modal-field:focus {
          border-color: rgb(var(--c-brand) / .7);
          box-shadow: 0 0 0 3px rgb(var(--c-brand) / .14);
        }
      `}</style>
    </div>
  )
}
