export default function GamificationPage() {
  const badges = [
    { label: 'Primeiros Passos', img: '/badges/Primeiros passos.png' },
    { label: 'Economizador',     img: '/badges/Economizador.png' },
    { label: 'Organizado',       img: '/badges/Organizado.png' },
    { label: 'Declarante',       img: '/badges/Declarante.png' },
    { label: 'Empresário',       img: '/badges/Empresario.png' },
  ]

  const locked = ['Investidor', 'Mestre', 'Lendário']

  const leaderboard = [
    { pos: 1, initials: 'JV', name: 'João Vitor', xp: '3.120 XP', color: 'bg-purple/20 text-purple', posColor: 'text-amber' },
    { pos: 2, initials: 'MA', name: 'Marina A.', xp: '2.880 XP', color: 'bg-blue/20 text-blue', posColor: 'text-mute' },
    { pos: 3, initials: 'LF', name: 'Luís F.', xp: '2.540 XP', color: 'bg-amber/20 text-amber', posColor: 'text-mute' },
    { pos: 4, initials: 'RA', name: 'Você', xp: '2.310 XP', color: 'bg-gradient-to-br from-brand to-blue text-white', posColor: 'text-brand', me: true },
    { pos: 5, initials: 'CS', name: 'Carla S.', xp: '2.090 XP', color: 'bg-rose/20 text-rose', posColor: 'text-mute' },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-5">
        {/* nível */}
        <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="glow pointer-events-none absolute inset-0" />
          <div className="relative flex items-center gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-ink">Nível 7 · Poupador Consciente</p>
              <p className="text-sm text-mute">Faltam 260 XP para o Nível 8 · Investidor Iniciante</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-bg">
                <div className="h-full rounded-full bg-gradient-to-r from-brand to-blue" style={{ width: '74%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* conquistas */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-ink">Badges</h3>
            <span className="text-xs text-mute">12 de 24 conquistadas</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4">
            {badges.map((b, i) => (
              <div key={i} className="rounded-lg border border-line bg-bg p-4 text-center">
                <img src={b.img} alt={b.label} className="mx-auto h-12 w-12 object-contain" />
                <p className="mt-2 text-xs font-bold text-ink">{b.label}</p>
              </div>
            ))}
            {locked.map((l, i) => (
              <div key={i} className="rounded-lg border border-dashed border-line bg-bg/50 p-4 text-center opacity-55">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-line/40 text-mute">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                </div>
                <p className="mt-2 text-xs font-bold text-mute">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* sequência + posição */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-line bg-card p-5 text-center elev-sm">
            <p className="text-3xl font-extrabold text-amber">7</p>
            <p className="mt-1 text-xs text-mute">dias de sequência</p>
          </div>
          <div className="rounded-lg border border-line bg-card p-5 text-center elev-sm">
            <p className="text-3xl font-extrabold text-brand">#4</p>
            <p className="mt-1 text-xs text-mute">ranking Juninhos</p>
          </div>
        </div>

        {/* ranking */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Ranking da comunidade</h3>
          <p className="text-xs text-mute">Comunidade Juninhos · maio</p>
          <div className="mt-4 space-y-2">
            {leaderboard.map((p) => (
              <div key={p.pos} className={`flex items-center gap-3 rounded-md px-2 py-2 ${p.me ? 'bg-brand/10 ring-1 ring-brand/30' : ''}`}>
                <span className={`w-5 text-center text-sm font-bold ${p.posColor}`}>{p.pos}</span>
                <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${p.color}`}>{p.initials}</span>
                <p className={`flex-1 text-sm ${p.me ? 'font-bold text-ink' : 'font-medium text-ink'}`}>{p.name}</p>
                <span className={`text-xs font-semibold ${p.me ? 'text-brand font-bold' : 'text-mute'}`}>{p.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
