export default function StatusPage() {
  const services = [
    "API",
    "Banco de Dados",
    "Autenticação",
    "Dashboard",
    "Notificações",
  ];

  const incidents = [
    {
      date: "02/06/2026",
      description: "Instabilidade temporária na API",
    },
    {
      date: "15/05/2026",
      description: "Manutenção programada",
    },
  ];

  const uptimes = [
    { service: "API", uptime: "99.9%" },
    { service: "Banco de Dados", uptime: "99.8%" },
    { service: "Autenticação", uptime: "99.7%" },
    { service: "Dashboard", uptime: "99.9%" },
    { service: "Notificações", uptime: "99.8%" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">
          Status do Serviço
        </h1>

        <div className="mb-8 rounded-xl border border-green-500 bg-green-500/10 p-6">
          <h2 className="text-xl font-bold text-green-400">
            🟢 Todos os sistemas operacionais
          </h2>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Componentes
          </h2>

          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service}
                className="flex justify-between rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <span>{service}</span>
                <span className="text-green-400">
                  Operacional
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Histórico de Incidentes
          </h2>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.date}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <p className="font-medium">
                  {incident.date}
                </p>
                <p className="text-slate-300">
                  {incident.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Uptime dos Últimos 90 Dias
          </h2>

          <div className="space-y-3">
            {uptimes.map((item) => (
              <div
                key={item.service}
                className="flex justify-between rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <span>{item.service}</span>
                <span className="text-green-400">
                  {item.uptime}
                </span>
              </div>
            ))}
          </div>
        </section>

        <button
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500"
        >
          Assinar Atualizações
        </button>
      </div>
    </main>
  );
}