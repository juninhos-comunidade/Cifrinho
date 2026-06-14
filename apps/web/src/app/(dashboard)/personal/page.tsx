"use client";

import { useState } from "react";
import {
  useTransactions,
  calcPersonal,
  fmt,
  type Transaction,
} from "@/hooks/useTransactions";
import { TransactionModal } from "@/components/ui/TransactionModal";

const CAT_COLORS = ["bg-brand", "bg-blue", "bg-purple", "bg-amber", "bg-rose"];

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-line/40 ${className ?? ""}`} />
  );
}

type Filter = "all" | "income" | "expense";

export default function PersonalPage() {
  const { data: txs, isLoading, isError } = useTransactions();
  const [filter, setFilter] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(t: Transaction) {
    setEditing(t);
    setModalOpen(true);
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-mute">
        Não foi possível carregar os dados.
      </div>
    );
  }

  if (isLoading || !txs) {
    return (
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <Skeleton className="h-44 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  const personal = txs.filter((t) => t.accountType === "PERSONAL");
  const { balance, curIncome, curExpense, categories } = calcPersonal(txs);
  const now = new Date();
  const monthName = now.toLocaleString("pt-BR", { month: "long" });

  const filtered = personal.filter((t) => {
    if (filter === "income") return t.type === "INCOME";
    if (filter === "expense") return t.type === "EXPENSE";
    return true;
  });

  return (
    <>
      <TransactionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        defaultAccountType="PERSONAL"
        editing={editing}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        {/* esquerda */}
        <div className="space-y-5">
          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-mute">Saldo pessoal</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
                  {fmt(balance)}
                </p>
              </div>
              <button
                onClick={openNew}
                className="flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dk"
              >
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
                Lançar
              </button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-line bg-bg p-3">
                <p className="text-xs text-mute">
                  Receitas ({monthName.slice(0, 3)})
                </p>
                <p className="mt-1 text-lg font-bold text-brand">
                  {fmt(curIncome)}
                </p>
              </div>
              <div className="rounded-md border border-line bg-bg p-3">
                <p className="text-xs text-mute">
                  Despesas ({monthName.slice(0, 3)})
                </p>
                <p className="mt-1 text-lg font-bold text-ink">
                  {fmt(curExpense)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-6 elev-sm">
            <h3 className="text-base font-bold text-ink">
              Gastos por categoria
            </h3>
            <p className="text-xs text-mute">
              {monthName} · {fmt(curExpense)} no total
            </p>
            {categories.length === 0 ? (
              <p className="mt-5 text-xs text-mute">
                Nenhuma despesa categorizada este mês.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {categories.map((c, i) => (
                  <div key={c.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm text-ink">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${CAT_COLORS[i % CAT_COLORS.length]}`}
                        ></span>
                        {c.name}
                      </span>
                      <span className="font-semibold">
                        {fmt(c.total)} · {c.pct}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-bg">
                      <div
                        className={`h-full rounded-full ${CAT_COLORS[i % CAT_COLORS.length]}`}
                        style={{ width: `${c.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* direita: lista */}
        <div className="rounded-lg border border-line bg-card elev-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
            <h3 className="text-base font-bold text-ink">
              Transações pessoais
            </h3>
            <div className="seg">
              <button
                className={filter === "all" ? "on" : ""}
                onClick={() => setFilter("all")}
              >
                Todas
              </button>
              <button
                className={filter === "income" ? "on" : ""}
                onClick={() => setFilter("income")}
              >
                Entradas
              </button>
              <button
                className={filter === "expense" ? "on" : ""}
                onClick={() => setFilter("expense")}
              >
                Saídas
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <p className="text-sm text-mute">Nenhuma transação encontrada.</p>
              <button
                onClick={openNew}
                className="text-sm font-bold text-brand hover:underline"
              >
                Fazer primeiro lançamento
              </button>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {filtered.map((t) => {
                const isIncome = t.type === "INCOME";
                return (
                  <button
                    key={t.id}
                    onClick={() => openEdit(t)}
                    className="flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors hover:bg-elev/50"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${isIncome ? "bg-brand/12 text-brand" : "bg-rose/12 text-rose"}`}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        {isIncome ? (
                          <>
                            <path d="M12 19V5M5 12l7-7 7 7" />
                          </>
                        ) : (
                          <>
                            <path d="M12 5v14M5 12l7 7 7-7" />
                          </>
                        )}
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {t.description}
                      </p>
                      <p className="text-xs text-mute">
                        {t.category?.name ?? "Sem categoria"} ·{" "}
                        {new Date(t.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                    {t.category && (
                      <span className="rounded-full bg-elev px-2 py-0.5 text-[11px] font-semibold text-mute">
                        {t.category.name}
                      </span>
                    )}
                    <p
                      className={`w-28 text-right text-sm font-bold ${isIncome ? "text-brand" : "text-ink"}`}
                    >
                      {isIncome ? "+" : "−"}
                      {fmt(Number(t.amount))}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
