export default function OverviewPage() {
  return (
    <div>
      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Saldo consolidado', value: 'R$ 24.780', cents: ',50', delta: '+12,4%', deltaColor: 'text-brand', up: true, iconBg: 'bg-brand/15 text-brand', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
          { label: 'Receitas do mês', value: 'R$ 11.350', cents: '', delta: '+8,1%', deltaColor: 'text-brand', up: true, iconBg: 'bg-blue/15 text-blue', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg> },
          { label: 'Despesas do mês', value: 'R$ 6.570', cents: '', delta: '+3,2%', deltaColor: 'text-rose', up: false, iconBg: 'bg-rose/15 text-rose', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg> },
          { label: 'Taxa de poupança', value: '42%', cents: '', delta: 'Meta: 40% atingida', deltaColor: 'text-brand', up: true, iconBg: 'bg-purple/15 text-purple', icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z"/></svg> },
        ].map((kpi, i) => (
          <div key={i} className="rounded-lg border border-line bg-card p-5 elev-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-mute">{kpi.label}</p>
              <span className={`grid h-8 w-8 place-items-center rounded-md ${kpi.iconBg}`}>{kpi.icon}</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{kpi.value}<span className="text-mute">{kpi.cents}</span></p>
            <p className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${kpi.deltaColor}`}>
              {kpi.up
                ? <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 15 6-6 6 6"/></svg>
                : <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              }
              {kpi.delta} <span className="font-medium text-mute">vs. abril</span>
            </p>
          </div>
        ))}
      </div>

      {/* chart + donut */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* bar chart */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-ink">Receitas × Despesas</h3>
              <p className="text-xs text-mute">Últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand"></span>Receitas</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-line"></span>Despesas</span>
            </div>
          </div>
          <div className="mt-6 flex h-52 items-end justify-between gap-3 sm:gap-5">
            {[
              { month: 'Nov', in: 88, out: 52 },
              { month: 'Dez', in: 72, out: 60 },
              { month: 'Jan', in: 96, out: 48 },
              { month: 'Fev', in: 80, out: 66 },
              { month: 'Mar', in: 110, out: 58 },
              { month: 'Abr', in: 100, out: 72 },
              { month: 'Mai', in: 128, out: 74, current: true },
            ].map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center gap-1">
                  <div className="bar w-1/2 bg-brand" style={{ height: m.in }}></div>
                  <div className="bar w-1/2 bg-line" style={{ height: m.out }}></div>
                </div>
                <span className={`text-[11px] ${m.current ? 'font-semibold text-ink' : 'text-faint'}`}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* donut */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Pessoal × Empresarial</h3>
          <p className="text-xs text-mute">Distribuição do saldo</p>
          <div className="mt-5 flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-line))" strokeWidth="5"/>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-blue))" strokeWidth="5" strokeDasharray="61 100" strokeDashoffset="0" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-brand))" strokeWidth="5" strokeDasharray="37 100" strokeDashoffset="-61" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div><p className="text-xl font-extrabold text-ink leading-none">R$ 24,7k</p><p className="text-[10px] text-mute">total</p></div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-ink"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-brand"></span>Pessoal</span><span className="font-bold">R$ 9.210</span></div>
                <p className="mt-0.5 pl-4 text-xs text-mute">37% do total</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-ink"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-blue"></span>Empresarial</span><span className="font-bold">R$ 15.570</span></div>
                <p className="mt-0.5 pl-4 text-xs text-mute">63% do total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* transactions + goals */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* transactions */}
        <div className="rounded-lg border border-line bg-card elev-sm">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h3 className="text-base font-bold text-ink">Transações recentes</h3>
            <button className="text-xs font-bold text-brand hover:underline">Ver todas</button>
          </div>
          <div className="divide-y divide-line">
            {[
              { icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>, iconBg: 'bg-brand/12 text-brand', title: 'Pagamento de cliente · Projeto Web', sub: 'Empresarial · 29 mai', value: '+R$ 4.500', valueColor: 'text-brand' },
              { icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>, iconBg: 'bg-rose/12 text-rose', title: 'Aluguel do escritório', sub: 'Empresarial · 28 mai', value: '−R$ 1.800', valueColor: 'text-ink' },
              { icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2h18l-2 7H5L3 2Z"/><path d="M5 9v11h14V9"/></svg>, iconBg: 'bg-amber/12 text-amber', title: 'Mercado · Supermercado Central', sub: 'Pessoal · 27 mai', value: '−R$ 342,80', valueColor: 'text-ink' },
              { icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>, iconBg: 'bg-blue/12 text-blue', title: 'Assinatura de software', sub: 'Empresarial · 26 mai', value: '−R$ 89,90', valueColor: 'text-ink' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${t.iconBg}`}>{t.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{t.title}</p>
                  <p className="text-xs text-mute">{t.sub}</p>
                </div>
                <p className={`text-sm font-bold ${t.valueColor}`}>{t.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* goals + xp */}
        <div className="space-y-5">
          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Metas</h3>
              <button className="text-xs font-bold text-brand hover:underline">Gerenciar</button>
            </div>
            <div className="mt-4 space-y-4">
              {[
                { label: 'Reserva de emergência', current: 'R$ 12k', total: '20k', pct: 60, color: 'bg-brand' },
                { label: 'Novo notebook', current: 'R$ 4,2k', total: '7k', pct: 60, color: 'bg-blue' },
                { label: 'Reserva do IR 2027', current: 'R$ 1,5k', total: '5k', pct: 30, color: 'bg-purple' },
              ].map((g, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between text-sm text-ink">
                    <span className="font-medium">{g.label}</span>
                    <span className="text-mute">{g.current} / {g.total}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-bg">
                    <div className={`h-full rounded-full ${g.color}`} style={{ width: `${g.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="glow pointer-events-none absolute inset-0" />
            <div className="relative flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">Nível 7 · Poupador Consciente</p>
                <p className="text-xs text-mute">740 / 1000 XP para o próximo nível</p>
              </div>
            </div>
            <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-bg">
              <div className="h-full rounded-full bg-gradient-to-r from-brand to-blue" style={{ width: '74%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
