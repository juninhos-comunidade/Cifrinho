import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Badge {
  id: string
  name: string
  description: string
  icon: string | null
  condition: string | null
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: string
  badge: Badge
}

async function fetchAllBadges(): Promise<Badge[]> {
  const { data } = await api.get<Badge[]>('/badges')
  return data
}

async function fetchMyBadges(): Promise<UserBadge[]> {
  const { data } = await api.get<UserBadge[]>('/badges/me')
  return data
}

export function useBadges() {
  const all  = useQuery({ queryKey: ['badges', 'all'], queryFn: fetchAllBadges })
  const mine = useQuery({ queryKey: ['badges', 'me'],  queryFn: fetchMyBadges })

  const earnedIds = new Set((mine.data ?? []).map(ub => ub.badgeId))
  const earned  = (mine.data ?? []).map(ub => ub.badge)
  const locked  = (all.data  ?? []).filter(b => !earnedIds.has(b.id))

  return {
    earned,
    locked,
    isLoading: all.isLoading || mine.isLoading,
    isError:   all.isError   || mine.isError,
  }
}
