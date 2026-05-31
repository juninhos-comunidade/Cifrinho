'use client'

import { useState } from 'react'

export default function BusinessPage() {
  const [tab, setTab] = useState<'pf' | 'pj'>('pf')

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="seg">
          <button className={tab === 'pf' ? 'on' : ''} onClick={() => setTab('pf')}>Pessoa Física</button>
          <button className={tab === 'pj' ? 'on' : ''} onClick={() => setTab('pj')}>Pessoa Jurídica (MEI)</button>
        </div>
        <span className="flex items-center gap-2 text-xs text-mute">
          <span className="h-2 w-2 rounded-full bg-brand"></span>
          Contas separadas e consolidadas automaticamente
        </span>
      </div>

      {tab === 'pf' && (
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-card p-5 elev-sm"><p className="text-sm text-mute">Saldo PF</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">R$ 9.210</p><p className="mt-1.5 text-xs text-mute">Conta pessoal</p></div>
            <div className="rounded-lg border border-line bg-card p-5 elev-sm"><p className="text-sm text-mute">Entradas (mai)</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">R$ 3.100</p><p className="mt-1.5 text-xs text-mute">2 lançamentos</p></div>
            <div className="rounded-lg border border-line bg-card p-5 elev-sm"><p className="text-sm text-mute">Saídas (mai)</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">R$ 2.180</p><p className="mt-1.5 text-xs text-mute">14 lançamentos</p></div>
          </div>
          <div className="mt-5 rounded-lg border border-line bg-card p-6 elev-sm">
            <h3 className="text-base font-bold text-ink">Fluxo de caixa pessoal</h3>
            <p className="text-xs text-mute">Últimos 6 meses</p>
            <div className="mt-6 flex h-40 items-end justify-between gap-4">
              {[{ m: 'Dez', h: 70 }, { m: 'Jan', h: 58 }, { m: 'Fev', h: 86 }, { m: 'Mar', h: 64 }, { m: 'Abr', h: 92 }, { m: 'Mai', h: 104, cur: true }].map((b) => (
                <div key={b.m} className="flex flex-1 flex-col items-center gap-2">
                  <div className={`bar w-full max-w-[40px] ${b.cur ? 'bg-brand' : 'bg-brand/70'}`} style={{ height: b.h }}></div>
                  <span className={`text-[11px] ${b.cur ? 'font-semibold text-ink' : 'text-faint'}`}>{b.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'pj' && (
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-card p-5 elev-sm"><p className="text-sm text-mute">Saldo PJ (MEI)</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">R$ 15.570</p><p className="mt-1.5 text-xs text-mute">CNPJ ··31</p></div>
            <div className="rounded-lg border border-line bg-card p-5 elev-sm"><p className="text-sm text-mute">Faturamento (mai)</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">R$ 8.250</p><p className="mt-1.5 text-xs text-mute">3 notas emitidas</p></div>
            <div className="rounded-lg border border-line bg-card p-5 elev-sm">
              <p className="text-sm text-mute">Limite MEI anual</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">38%</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg"><div className="h-full rounded-full bg-amber" style={{ width: '38%' }}></div></div>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-line bg-card elev-sm">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-base font-bold text-ink">Notas fiscais emitidas</h3>
              <button className="flex items-center gap-1.5 rounded-md border border-line bg-bg px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:border-brand/50">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Emitir NF-e
              </button>
            </div>
            <div className="divide-y divide-line">
              {[
                { title: 'NF-e #0042 · Projeto Web', sub: 'Cliente Acme Ltda · 29 mai', status: 'Paga', statusColor: 'bg-brand/12 text-brand', value: 'R$ 4.500' },
                { title: 'NF-e #0041 · Consultoria', sub: 'Cliente Beta SA · 18 mai', status: 'Paga', statusColor: 'bg-brand/12 text-brand', value: 'R$ 2.250' },
                { title: 'NF-e #0040 · Manutenção', sub: 'Cliente Acme Ltda · 10 mai', status: 'Pendente', statusColor: 'bg-amber/15 text-amber', value: 'R$ 1.500' },
              ].map((nf, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-blue/12 text-blue">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{nf.title}</p>
                    <p className="text-xs text-mute">{nf.sub}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${nf.statusColor}`}>{nf.status}</span>
                  <p className="w-24 text-right text-sm font-bold text-ink">{nf.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
