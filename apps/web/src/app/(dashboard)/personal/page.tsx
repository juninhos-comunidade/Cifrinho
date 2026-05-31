export default function PersonalPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
      {/* left: balance + categories */}
      <div className="space-y-5">
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-mute">Saldo pessoal</p>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-ink">R$ 9.210<span className="text-mute">,30</span></p>
            </div>
            <button className="flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dk">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              Lançar
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-line bg-bg p-3">
              <p className="text-xs text-mute">Receitas (mai)</p>
              <p className="mt-1 text-lg font-bold text-brand">R$ 3.100</p>
            </div>
            <div className="rounded-md border border-line bg-bg p-3">
              <p className="text-xs text-mute">Despesas (mai)</p>
              <p className="mt-1 text-lg font-bold text-ink">R$ 2.180</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Gastos por categoria</h3>
          <p className="text-xs text-mute">Maio · R$ 2.180 no total</p>
          <div className="mt-5 space-y-4">
            {[
              { label: 'Alimentação', value: 'R$ 720 · 33%', pct: 86, color: 'bg-brand', warn: '86% do orçamento de R$ 840', warnColor: 'text-amber' },
              { label: 'Moradia',     value: 'R$ 650 · 30%', pct: 65, color: 'bg-blue',  warn: '', warnColor: '' },
              { label: 'Transporte', value: 'R$ 380 · 17%', pct: 48, color: 'bg-purple', warn: '', warnColor: '' },
              { label: 'Lazer',      value: 'R$ 430 · 20%', pct: 54, color: 'bg-amber',  warn: '', warnColor: '' },
            ].map((c, i) => (
              <div key={i}>
                <div className="mb-1.5 flex items-center justify-between text-sm text-ink">
                  <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-sm ${c.color}`}></span>{c.label}</span>
                  <span className="font-semibold">{c.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }}></div>
                </div>
                {c.warn && <p className={`mt-1 text-[11px] ${c.warnColor}`}>{c.warn}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right: transactions */}
      <div className="rounded-lg border border-line bg-card elev-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
          <h3 className="text-base font-bold text-ink">Transações</h3>
          <div className="seg">
            <button className="on">Todas</button>
            <button>Entradas</button>
            <button>Saídas</button>
          </div>
        </div>
        <div className="divide-y divide-line">
          {[
            { iconBg: 'bg-brand/12 text-brand', title: 'Freela de design', sub: 'Receita · 30 mai', tag: 'Trabalho', tagColor: 'bg-brand/12 text-brand', value: '+R$ 1.500', valueColor: 'text-brand' },
            { iconBg: 'bg-amber/12 text-amber', title: 'Supermercado Central', sub: 'Alimentação · 27 mai', tag: 'Mercado', tagColor: 'bg-elev text-mute', value: '−R$ 342,80', valueColor: 'text-ink' },
            { iconBg: 'bg-purple/12 text-purple', title: 'Combustível', sub: 'Transporte · 25 mai', tag: 'Carro', tagColor: 'bg-elev text-mute', value: '−R$ 220,00', valueColor: 'text-ink' },
            { iconBg: 'bg-blue/12 text-blue', title: 'Aluguel apartamento', sub: 'Moradia · 22 mai', tag: 'Fixo', tagColor: 'bg-elev text-mute', value: '−R$ 650,00', valueColor: 'text-ink' },
            { iconBg: 'bg-amber/12 text-amber', title: 'Cinema + jantar', sub: 'Lazer · 18 mai', tag: 'Lazer', tagColor: 'bg-elev text-mute', value: '−R$ 184,00', valueColor: 'text-ink' },
            { iconBg: 'bg-brand/12 text-brand', title: 'Reembolso', sub: 'Receita · 15 mai', tag: 'Extra', tagColor: 'bg-brand/12 text-brand', value: '+R$ 320,00', valueColor: 'text-brand' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${t.iconBg}`}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {t.value.startsWith('+') ? <><path d="M12 19V5M5 12l7-7 7 7"/></> : <><path d="M12 5v14M5 12l7 7 7-7"/></>}
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{t.title}</p>
                <p className="text-xs text-mute">{t.sub}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${t.tagColor}`}>{t.tag}</span>
              <p className={`w-24 text-right text-sm font-bold ${t.valueColor}`}>{t.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
