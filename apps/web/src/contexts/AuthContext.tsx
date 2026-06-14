'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { api } from '@/lib/api'

export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextValue {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  logout: () => void
  initials: string
  firstName: string
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null)

  const setUser = useCallback((u: AuthUser | null) => {
    setUserState(u)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } catch {}
    setUserState(null)
    window.location.href = '/login'
  }, [])

  const initials = user ? getInitials(user.name) : '??'
  const firstName = user ? user.name.trim().split(/\s+/)[0] : ''

  return (
    <AuthContext.Provider value={{ user, setUser, logout, initials, firstName }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
