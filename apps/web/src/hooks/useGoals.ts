import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Goal {
  id: string
  userId: string
  name: string
  targetAmount: string
  months: number
  monthlyAmount: string
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  startDate: string
  completedAt: string | null
  createdAt: string
}

async function fetchGoals(): Promise<Goal[]> {
  const { data } = await api.get<Goal[]>('/goals')
  return data
}

export function useGoals() {
  const qc = useQueryClient()

  const query = useQuery({ queryKey: ['goals'], queryFn: fetchGoals })

  const create = useMutation({
    mutationFn: (payload: { name: string; targetAmount: number; months: 1 | 2 | 3 }) =>
      api.post('/goals', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] })
      qc.invalidateQueries({ queryKey: ['transactions'] })
      qc.invalidateQueries({ queryKey: ['gamification'] })
    },
  })

  const complete = useMutation({
    mutationFn: (id: string) => api.patch(`/goals/${id}/complete`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] })
      qc.invalidateQueries({ queryKey: ['gamification'] })
    },
  })

  const cancel = useMutation({
    mutationFn: (id: string) => api.delete(`/goals/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['goals'] }),
  })

  const active = (query.data ?? []).filter(g => g.status === 'ACTIVE')
  const completed = (query.data ?? []).filter(g => g.status === 'COMPLETED')

  return {
    goals: query.data ?? [],
    active,
    completed,
    isLoading: query.isLoading,
    isError: query.isError,
    create,
    complete,
    cancel,
  }
}
