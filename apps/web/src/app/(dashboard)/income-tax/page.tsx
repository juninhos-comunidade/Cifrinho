"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { fmt } from "@/hooks/useTransactions";

interface IncomeTaxSummary {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

async function fetchIncomeTax(): Promise<IncomeTaxSummary> {
  const { data } = await api.get<IncomeTaxSummary>("/income-tax/summary");
  return data;
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-line/40 ${className ?? ""}`} />
  );
}

export default function IncomeTaxPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["income-tax", "summary"],
    queryFn: fetchIncomeTax,
  });

  const pct = data
    ? Math.min(
        Math.round(
          (data.transactionCount / Math.max(data.transactionCount + 3, 1)) *
            100,
        ),
        100,
      )
    : 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        {/* situação */}
        <div className="relative overflow-hidden rounded-lg border border-line bg-card p-6 elev-sm">
          <div className="glow pointer-events-none absolute inset-0" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                {isLoading
                  ? "Carregando…"
                  : `Exercício ${(data?.year ?? new Date().getFullYear()) + 1} · ano-base ${data?.year ?? new Date().getFullYear()}`}
              </span>
              {isLoading ? (
                <Skeleton className="mt-3 h-7 w-72" />
              ) : (
                <h3 className="mt-3 text-2xl font-extrabold text-ink">
                  {data && data.transactionCount > 0
                    ? `${data.transactionCount} lançamentos registrados este ano`
                    : "Nenhum lançamento registrado este ano"}
                </h3>
              )}
              <p className="mt-1 text-sm text-mute">
                O Cifrinho organiza seus dados ao longo do ano.
              </p>
            </div>
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 36 36" className="h-28 w-28 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="rgb(var(--c-line))"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="rgb(var(--c-brand))"
                  strokeWidth="4"
                  strokeDasharray={`${pct} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <p className="text-2xl font-extrabold text-ink">{pct}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* resumo financeiro do ano */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Resumo do ano-base</h3>
          {isError && (
            <p className="mt-4 text-sm text-mute">
              Não foi possível carregar o resumo.
            </p>
          )}
          {isLoading ? (
            <div className="mt-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-md" />
              ))}
            </div>
          ) : data ? (
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Total de receitas",
                  value: fmt(data.totalIncome),
                  color: "text-brand",
                },
                {
                  label: "Total de despesas",
                  value: fmt(data.totalExpenses),
                  color: "text-ink",
                },
                {
                  label: "Saldo do período",
                  value: fmt(data.balance),
                  color: data.balance >= 0 ? "text-brand" : "text-rose",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-line bg-bg px-4 py-3"
                >
                  <span className="text-sm text-mute">{row.label}</span>
                  <span className={`text-sm font-bold ${row.color}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* checklist (estático — aguarda endpoints dedicados) */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">
            Checklist de documentos
          </h3>
          <div className="mt-4 space-y-2.5">
            {[
              {
                label: "Informes de rendimento (PF)",
                status: "Não iniciado",
                done: false,
                warn: false,
              },
              {
                label: "Notas fiscais emitidas (MEI)",
                status: "Não iniciado",
                done: false,
                warn: false,
              },
              {
                label: "Recibos médicos dedutíveis",
                status: "Não iniciado",
                done: false,
                warn: false,
              },
              {
                label: "Comprovante de previdência",
                status: "Não iniciado",
                done: false,
                warn: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3"
              >
                {item.done ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                ) : item.warn ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-amber text-amber">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border-2 border-faint"></span>
                )}
                <p className="flex-1 text-sm font-medium text-ink">
                  {item.label}
                </p>
                <span
                  className={`text-xs ${item.done ? "text-brand" : item.warn ? "text-amber" : "text-faint"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* restituição estimada */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <p className="text-sm text-mute">Restituição estimada</p>
          {isLoading ? (
            <Skeleton className="mt-2 h-10 w-36" />
          ) : (
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand">
              {data ? fmt(Math.max(data.balance * 0.075, 0)) : "R$ 0,00"}
            </p>
          )}
          <p className="mt-1.5 text-xs text-mute">
            Estimativa com base nos lançamentos registrados
          </p>
          {data && (
            <div className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-mute">Receitas tributáveis</span>
                <span className="font-semibold text-ink">
                  {fmt(data.totalIncome)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Despesas dedutíveis</span>
                <span className="font-semibold text-ink">
                  {fmt(data.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Base de cálculo</span>
                <span
                  className={`font-semibold ${data.balance >= 0 ? "text-brand" : "text-rose"}`}
                >
                  {fmt(data.balance)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* prazos */}
        <div className="rounded-lg border border-line bg-card p-6 elev-sm">
          <h3 className="text-base font-bold text-ink">Prazos</h3>
          <div className="mt-4 space-y-4">
            {[
              {
                label: "Abertura da declaração",
                sub: "Março de 2026",
                color: "bg-brand",
                done: true,
              },
              {
                label: "Revisão dos dados",
                sub: "Até 30 de abril",
                color: "bg-amber",
                done: true,
              },
              {
                label: "Prazo final de envio",
                sub: "31 de maio de 2026",
                color: "border-2 border-faint",
                done: false,
              },
            ].map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${p.color}`}
                  ></span>
                  {i < 2 && <span className="mt-1 w-px flex-1 bg-line"></span>}
                </div>
                <div className="-mt-1 pb-1">
                  <p
                    className={`text-sm font-semibold ${p.done ? "text-ink" : "text-mute"}`}
                  >
                    {p.label}
                  </p>
                  <p
                    className={`text-xs ${p.done ? "text-mute" : "text-faint"}`}
                  >
                    {p.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
