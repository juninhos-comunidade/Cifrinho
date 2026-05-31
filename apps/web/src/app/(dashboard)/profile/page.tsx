export default function ProfilePage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
      {/* profile card */}
      <div className="rounded-lg border border-line bg-card p-6 text-center elev-sm">
        <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand to-blue text-3xl font-bold text-white">RA</span>
        <h3 className="mt-4 text-xl font-bold text-ink">Rafhael Almeida</h3>
        <p className="text-sm text-mute">rafhael@email.com</p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
          Freelancer · MEI
        </span>
        <button className="mt-5 w-full rounded-md border border-line bg-bg py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand/50">Editar perfil</button>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
          <div><p className="text-lg font-extrabold text-ink">7</p><p className="text-[11px] text-mute">nível</p></div>
          <div><p className="text-lg font-extrabold text-ink">12</p><p className="text-[11px] text-mute">badges</p></div>
          <div><p className="text-lg font-extrabold text-ink">2a</p><p className="text-[11px] text-mute">na plataforma</p></div>
        </div>
      </div>

      <div className="space-y-5">
        {/* dados pessoais */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Dados pessoais</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Nome completo', value: 'Rafhael Almeida' },
              { label: 'CPF', value: '···.···.789-00' },
              { label: 'E-mail', value: 'rafhael@email.com' },
              { label: 'Telefone', value: '(11) 9····-4321' },
              { label: 'CNPJ (MEI)', value: '··.···.···/0001-31' },
              { label: 'Cidade', value: 'São Paulo, SP' },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-xs font-medium text-mute">{f.label}</label>
                <div className="mt-1.5 rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm text-ink">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* contas conectadas */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Contas conectadas</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-brand/15 text-brand font-bold">P</span>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">PicPay</p><p className="text-xs text-mute">Conta pessoal · conectada</p></div>
              <span className="h-2 w-2 rounded-full bg-brand"></span>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-blue/15 text-blue font-bold">B</span>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">Banco PJ</p><p className="text-xs text-mute">Conta MEI · conectada</p></div>
              <span className="h-2 w-2 rounded-full bg-brand"></span>
            </div>
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-line py-2.5 text-sm font-semibold text-mute transition-colors hover:border-brand/50 hover:text-ink">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              Conectar nova conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
