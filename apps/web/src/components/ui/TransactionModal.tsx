'use client'

import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface Category {
  id: string
  name: string
  accountType: 'PERSONAL' | 'BUSINESS'
}

interface Transaction {
  id: string
  description: string
  amount: string
  type: 'INCOME' | 'EXPENSE'
  accountType: 'PERSONAL' | 'BUSINESS'
  date: string
  categoryId: string | null
}

interface Props {
  open: boolean
  onClose: () => void
  defaultAccountType?: 'PERSONAL' | 'BUSINESS'
  editing?: Transaction | null
}

const EMPTY: Omit<Transaction, 'id'> = {
  description: '',
  amount: '',
  type: 'EXPENSE',
  accountType: 'PERSONAL',
  date: new Date().toISOString().slice(0, 10),
  categoryId: null,
}

export function TransactionModal({ open, onClose, defaultAccountType, editing }: Props) {
  const qc = useQueryClient()
  const overlayRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ ...EMPTY })
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          description: editing.description,
          amount: Number(editing.amount).toFixed(2).replace('.', ','),
          type: editing.type,
          accountType: editing.accountType,
          date: editing.date.slice(0, 10),
          categoryId: editing.categoryId,
        })
      } else {
        setForm({ ...EMPTY, accountType: defaultAccountType ?? 'PERSONAL' })
      }
      setError('')
    }
  }, [open, editing, defaultAccountType])

  // Fechar com Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/categories')
      return data
    },
    enabled: open,
  })

  const filteredCats = categories.filter(c => c.accountType === form.accountType)

  function parseAmount(raw: string): number {
    return Number(raw.replace(/\./g, '').replace(',', '.'))
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const amount = parseAmount(form.amount as string)
      if (isNaN(amount) || amount <= 0) throw new Error('Valor inválido.')
      if (!form.description.trim()) throw new Error('Descrição obrigatória.')

      const payload = {
        description: form.description.trim(),
        amount,
        type: form.type,
        accountType: form.accountType,
        date: new Date(form.date + 'T12:00:00.000Z').toISOString(),
        categoryId: form.categoryId || undefined,
      }

      if (editing) {
        await api.put(`/transactions/${editing.id}`, payload)
      } else {
        await api.post('/transactions', payload)
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions'] })
      onClose()
    },
    onError: (err: any) => {
      setError(err.message ?? err.response?.data?.message ?? 'Erro ao salvar.')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/transactions/${editing!.id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions'] })
      onClose()
    },
    onError: (err: any) => {
      setError(err.response?.data?.message ?? 'Erro ao excluir.')
    },
  })

  const busy = saveMutation.isPending || deleteMutation.isPending

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }))
    setError('')
  }

  if (!open) return null

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
          <h2 className="text-base font-bold text-ink">
            {editing ? 'Editar transação' : 'Nova transação'}
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-mute transition-colors hover:bg-elev hover:text-ink"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* corpo */}
        <div className="space-y-4 px-6 py-5">
          {/* tipo: entrada / saída */}
          <div className="seg w-full">
            <button
              type="button"
              className={`flex-1 ${form.type === 'EXPENSE' ? 'on' : ''}`}
              onClick={() => set('type', 'EXPENSE')}
            >
              Saída
            </button>
            <button
              type="button"
              className={`flex-1 ${form.type === 'INCOME' ? 'on' : ''}`}
              onClick={() => set('type', 'INCOME')}
            >
              Entrada
            </button>
          </div>

          {/* conta: pessoal / empresarial */}
          <div className="seg w-full">
            <button
              type="button"
              className={`flex-1 ${form.accountType === 'PERSONAL' ? 'on' : ''}`}
              onClick={() => set('accountType', 'PERSONAL')}
            >
              Pessoal
            </button>
            <button
              type="button"
              className={`flex-1 ${form.accountType === 'BUSINESS' ? 'on' : ''}`}
              onClick={() => set('accountType', 'BUSINESS')}
            >
              Empresarial
            </button>
          </div>

          {/* descrição */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Freela de design"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="modal-field"
            />
          </div>

          {/* valor + data */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-mute">Valor (R$)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={form.amount as string}
                onChange={e => set('amount', e.target.value)}
                className="modal-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-mute">Data</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className="modal-field"
              />
            </div>
          </div>

          {/* categoria */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute">Categoria (opcional)</label>
            <select
              value={form.categoryId ?? ''}
              onChange={e => set('categoryId', e.target.value || null)}
              className="modal-field"
            >
              <option value="">Sem categoria</option>
              {filteredCats.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="rounded-lg border border-rose/20 bg-rose/10 px-4 py-2.5 text-sm text-rose">
              {error}
            </p>
          )}
        </div>

        {/* rodapé */}
        <div className={`flex gap-3 border-t border-line px-6 py-4 ${editing ? 'justify-between' : 'justify-end'}`}>
          {editing && (
            <button
              type="button"
              onClick={() => deleteMutation.mutate()}
              disabled={busy}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-rose transition-colors hover:bg-rose/10 disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              {deleteMutation.isPending ? 'Excluindo…' : 'Excluir'}
            </button>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-mute transition-colors hover:bg-elev disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => saveMutation.mutate()}
              disabled={busy}
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dk disabled:opacity-50"
            >
              {saveMutation.isPending ? 'Salvando…' : editing ? 'Salvar' : 'Lançar'}
            </button>
          </div>
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
        .modal-field option {
          background: rgb(var(--c-card));
          color: rgb(var(--c-ink));
        }
      `}</style>
    </div>
  )
}
