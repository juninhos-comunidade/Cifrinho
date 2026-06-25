'use client'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useAuth } from '@/contexts/AuthContext'
import { useBadges } from '@/hooks/useBadges'

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-line/40 ${className ?? ''}`} />
}

export default function ProfilePage() {
  const { user, isLoading } = useCurrentUser()
  const { initials } = useAuth()
  const { earned } = useBadges()

  const joinedYear = user ? new Date().getFullYear() - new Date(user.createdAt).getFullYear() : null
  const joinedLabel =
    joinedYear === 0 ? 'este ano' : joinedYear === 1 ? '1 ano' : `${joinedYear} anos`

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
      {/* cartão de perfil */}
      <div className="rounded-lg border border-line bg-card p-6 text-center elev-sm">
        <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand to-blue text-3xl font-bold text-white">
          {isLoading ? '…' : initials}
        </span>

        {isLoading ? (
          <div className="mt-4 flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-52" />
          </div>
        ) : (
          <>
            <h3 className="mt-4 text-xl font-bold text-ink">{user?.name}</h3>
            <p className="text-sm text-mute">{user?.email}</p>
          </>
        )}

        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
          Cifrinho
        </span>
        <button className="mt-5 w-full rounded-md border border-line bg-bg py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand/50">
          Editar perfil
        </button>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
          <div>
            <p className="text-lg font-extrabold text-ink">{Math.min(earned.length + 1, 10)}</p>
            <p className="text-[11px] text-mute">nível</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-ink">{earned.length}</p>
            <p className="text-[11px] text-mute">badges</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-ink">{isLoading ? '…' : joinedLabel}</p>
            <p className="text-[11px] text-mute">na plataforma</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* dados pessoais */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Dados pessoais</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-1.5 h-3 w-24" />
                    <Skeleton className="h-10 rounded-md" />
                  </div>
                ))
              : [
                  { label: 'Nome completo', value: user?.name ?? '—' },
                  { label: 'E-mail', value: user?.email ?? '—' },
                  {
                    label: 'Membro desde',
                    value: user
                      ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
                          month: 'long',
                          year: 'numeric',
                        })
                      : '—',
                  },
                  {
                    label: 'ID da conta',
                    value: user ? `#${user.id.slice(0, 8).toUpperCase()}` : '—',
                  },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-medium text-mute">{f.label}</label>
                    <div className="mt-1.5 rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm text-ink">
                      {f.value}
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* contas conectadas */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Contas conectadas</h3>
          <div className="mt-4 space-y-3">
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-line py-2.5 text-sm font-semibold text-mute transition-colors hover:border-brand/50 hover:text-ink">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Conectar conta bancária
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
