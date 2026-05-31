export default function IncomeTaxPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        {/* status */}
        <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="glow pointer-events-none absolute inset-0" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                Exercício 2026 · ano-base 2025
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-ink">Sua declaração está 68% pronta</h3>
              <p className="mt-1 text-sm text-mute">Faltam 3 documentos. O Cifrinho organiza tudo ao longo do ano.</p>
            </div>
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 36 36" className="h-28 w-28 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-line))" strokeWidth="4"/>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--c-brand))" strokeWidth="4" strokeDasharray="68 100" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <p className="text-2xl font-extrabold text-ink">68%</p>
              </div>
            </div>
          </div>
        </div>

        {/* checklist */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Checklist de documentos</h3>
          <div className="mt-4 space-y-2.5">
            {[
              { label: 'Informes de rendimento (PF)', status: 'Completo', done: true },
              { label: 'Notas fiscais emitidas (MEI)', status: 'Completo', done: true },
              { label: 'Recibos médicos dedutíveis', status: '2 pendentes', done: false, warn: true },
              { label: 'Comprovante de previdência', status: 'Não iniciado', done: false, warn: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3">
                {item.done ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg></span>
                ) : item.warn ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-amber text-amber"><svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 6v6l4 2"/></svg></span>
                ) : (
                  <span className="h-6 w-6 rounded-full border-2 border-faint"></span>
                )}
                <p className="flex-1 text-sm font-medium text-ink">{item.label}</p>
                <span className={`text-xs ${item.done ? 'text-brand' : item.warn ? 'text-amber' : 'text-faint'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* restituição */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <p className="text-sm text-mute">Restituição estimada</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand">R$ 1.840</p>
          <p className="mt-1.5 text-xs text-mute">Com base nas deduções já registradas</p>
          <div className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            {[
              { label: 'Deduções com saúde', value: 'R$ 3.200' },
              { label: 'Previdência', value: 'R$ 1.100' },
              { label: 'Dependentes', value: 'R$ 2.275' },
            ].map((d, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-mute">{d.label}</span>
                <span className="font-semibold text-ink">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* prazos */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Prazos</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: 'Abertura da declaração', sub: 'Março de 2026', color: 'bg-brand', done: true },
              { label: 'Revisão dos dados', sub: 'Até 30 de abril', color: 'bg-amber', done: true },
              { label: 'Prazo final de envio', sub: '31 de maio de 2026', color: 'border-2 border-faint', done: false },
            ].map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className={`h-2.5 w-2.5 rounded-full ${p.color}`}></span>
                  {i < 2 && <span className="mt-1 w-px flex-1 bg-line"></span>}
                </div>
                <div className="-mt-1 pb-1">
                  <p className={`text-sm font-semibold ${p.done ? 'text-ink' : 'text-mute'}`}>{p.label}</p>
                  <p className={`text-xs ${p.done ? 'text-mute' : 'text-faint'}`}>{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
