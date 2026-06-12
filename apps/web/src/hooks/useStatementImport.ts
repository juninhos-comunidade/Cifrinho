import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface ParsedTransaction {
  description: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  date: string
  suggestedCategory: string
  categoryId: string | null
  accountType: 'PERSONAL' | 'BUSINESS'
  selected: boolean
}

export type ImportStep = 'idle' | 'uploading' | 'reviewing' | 'saving' | 'done' | 'error'

export function useStatementImport() {
  const qc = useQueryClient()
  const [step, setStep] = useState<ImportStep>('idle')
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  async function upload(file: File) {
    setStep('uploading')
    setErrorMsg('')
    try {
      const form = new FormData()
      form.append('file', file)
      const { data } = await api.post<{
        transactions: Omit<ParsedTransaction, 'accountType' | 'selected'>[]
      }>('/statements/parse', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      setTransactions(
        data.transactions.map((t) => ({ ...t, accountType: 'PERSONAL', selected: true }))
      )
      setStep('reviewing')
    } catch (err: unknown) {
      setErrorMsg(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'Erro ao processar o extrato.'
      )
      setStep('error')
    }
  }

  function updateTransaction(index: number, patch: Partial<ParsedTransaction>) {
    setTransactions((prev) => prev.map((t, i) => (i === index ? { ...t, ...patch } : t)))
  }

  function toggleAll(selected: boolean) {
    setTransactions((prev) => prev.map((t) => ({ ...t, selected })))
  }

  async function confirm() {
    const toSave = transactions.filter((t) => t.selected)
    if (toSave.length === 0) return
    setStep('saving')
    try {
      await api.post('/transactions/batch', {
        transactions: toSave.map(({ selected: _selected, ...t }) => t),
      })
      qc.invalidateQueries({ queryKey: ['transactions'] })
      setStep('done')
    } catch (err: unknown) {
      setErrorMsg(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'Erro ao salvar as transações.'
      )
      setStep('error')
    }
  }

  function reset() {
    setStep('idle')
    setTransactions([])
    setErrorMsg('')
  }

  return { step, transactions, errorMsg, upload, updateTransaction, toggleAll, confirm, reset }
}
