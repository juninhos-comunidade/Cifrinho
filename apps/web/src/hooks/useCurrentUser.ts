import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuth, type AuthUser } from '@/contexts/AuthContext'

async function fetchMe(): Promise<AuthUser> {
  const { data } = await api.get<{ user: AuthUser }>('/auth/me')
  return data.user
}

export function useCurrentUser() {
  const { user, setUser } = useAuth()

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    enabled: user === null,
    retry: false,
  })

  useEffect(() => {
    if (query.data && !user) {
      setUser(query.data)
      // garante que categorias padrão existam para usuários criados antes deste recurso
      api.post('/auth/seed-categories').catch(() => {})
    }
  }, [query.data, user, setUser])

  return { user: user ?? query.data ?? null, isLoading: query.isLoading }
}
