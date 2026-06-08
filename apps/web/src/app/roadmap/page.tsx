const IN_PROGRESS = [
  "Integração API real",
  "Central de Ajuda",
  "Roadmap",
  "Status",
  "Discord",
];

const PLANNED = [
  "2FA",
  "Open Banking",
  "App mobile",
  "Exportação CSV/PDF",
  "Notificações push",
];

const DONE = [
  "Landing page",
  "Autenticação",
  "Dashboard",
  "Gestão Pessoal",
  "Gestão Empresarial",
  "IR",
  "Gamificação",
  "Página Legal",
];

export default function RoadmapPage() {
  return (
    
<main className="min-h-screen bg-slate-950 text-white p-8">
  <h1 className="text-4xl font-bold text-center mb-2">
  Roadmap do Produto
</h1>

<p className="text-slate-400 text-center mb-8">
  Acompanhe a evolução das funcionalidades do produto.
</p>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-slate-900 p-4 rounded-xl">
      <h2 className="font-bold text-yellow-400 mb-4 text-xl">
        Em Progresso
      </h2>

      <div className="space-y-2">
        {IN_PROGRESS.map((item) => (
          <div
            key={item}
            className="bg-slate-800 rounded-lg p-3"
          >
            {item}
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
  <h2 className="font-bold text-blue-400 mb-4 text-xl">
    Planejado
  </h2>

  <div className="space-y-2">
    {PLANNED.map((item) => (
      <div
        key={item}
        className="bg-slate-800 rounded-lg p-3"
      >
        {item}
      </div>
    ))}
  </div>
</div>

    <div className="bg-slate-900 p-4 rounded-xl">
  <h2 className="font-bold text-green-400 mb-4 text-xl">
    Concluído
  </h2>

  <div className="space-y-2">
    {DONE.map((item) => (
      <div
        key={item}
        className="bg-slate-800 rounded-lg p-3"
      >
        {item}
      </div>
    ))}
  </div>
</div>

  </div>
  <div className="mt-8 flex justify-center">
  <button
    disabled
    className="
      px-6 py-3
      rounded-xl
      bg-slate-700
      text-slate-400
      cursor-not-allowed
    "
  >
    Votação em Features (em breve)
  </button>
</div>
</main>
  );
}