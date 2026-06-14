"use client";

import { useState } from "react";
import {
  useTransactions,
  calcBusiness,
  calcCashFlowBars,
  fmt,
  type Transaction,
} from "@/hooks/useTransactions";
import { TransactionModal } from "@/components/ui/TransactionModal";
import { usePreferences } from "@/contexts/PreferencesContext";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-line/40 ${className ?? ""}`} />
  );
}

function isCurrentMonth(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
}

export default function BusinessPage() {
  const [tab, setTab] = useState<"pf" | "pj">("pf");
  const { data: txs, isLoading, isError } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const { businessEnabled } = usePreferences();

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(t: Transaction) {
    setEditing(t);
    setModalOpen(true);
  }

  if (!businessEnabled) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-line/30 text-mute">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-4" />
          </svg>
        </span>
        <div>
          <p className="text-base font-bold text-ink">
            Conta empresarial desativada
          </p>
          <p className="mt-1 text-sm text-mute">
            Ative nas configurações para acessar o módulo empresarial.
          </p>
        </div>
        <a
          href="/settings"
          className="rounded-lg border border-line bg-card px-5 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/50"
        >
          Ir para Configurações
        </a>
      </div>
    );
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
      <div className="space-y-4">
        <Skeleton className="h-10 w-72 rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  const {
    balance: bizBalance,
    curIncome: bizIncome,
    curExpense: bizExpense,
    meiPct,
    yearIncome,
  } = calcBusiness(txs);
  const pfBalance = txs
    .filter((t) => t.accountType === "PERSONAL")
    .reduce(
      (s, t) =>
        t.type === "INCOME" ? s + Number(t.amount) : s - Number(t.amount),
      0,
    );
  const pfIncome = txs
    .filter(
      (t) =>
        t.accountType === "PERSONAL" &&
        t.type === "INCOME" &&
        isCurrentMonth(t.date),
    )
    .reduce((s, t) => s + Number(t.amount), 0);
  const pfExpense = txs
    .filter(
      (t) =>
        t.accountType === "PERSONAL" &&
        t.type === "EXPENSE" &&
        isCurrentMonth(t.date),
    )
    .reduce((s, t) => s + Number(t.amount), 0);
  const pfBars = calcCashFlowBars(txs, "PERSONAL");
  const pjBars = calcCashFlowBars(txs, "BUSINESS");
  const bizTxs = txs.filter((t) => t.accountType === "BUSINESS");

  const currentAccountType = tab === "pf" ? "PERSONAL" : "BUSINESS";

  return (
    <>
      <TransactionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        defaultAccountType={currentAccountType}
        editing={editing}
      />

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="seg">
            <button
              className={tab === "pf" ? "on" : ""}
              onClick={() => setTab("pf")}
            >
              Pessoa Física
            </button>
            <button
              className={tab === "pj" ? "on" : ""}
              onClick={() => setTab("pj")}
            >
              Pessoa Jurídica (MEI)
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-mute">
              <span className="h-2 w-2 rounded-full bg-brand"></span>
              Contas separadas e consolidadas automaticamente
            </span>
            <button
              onClick={openNew}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dk"
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
        </div>

        {tab === "pf" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Saldo PF</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                  {fmt(pfBalance)}
                </p>
                <p className="mt-1.5 text-xs text-mute">Conta pessoal</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Entradas (mês)</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">
                  {fmt(pfIncome)}
                </p>
                <p className="mt-1.5 text-xs text-mute">
                  {
                    txs.filter(
                      (t) =>
                        t.accountType === "PERSONAL" &&
                        t.type === "INCOME" &&
                        isCurrentMonth(t.date),
                    ).length
                  }{" "}
                  lançamentos
                </p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Saídas (mês)</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                  {fmt(pfExpense)}
                </p>
                <p className="mt-1.5 text-xs text-mute">
                  {
                    txs.filter(
                      (t) =>
                        t.accountType === "PERSONAL" &&
                        t.type === "EXPENSE" &&
                        isCurrentMonth(t.date),
                    ).length
                  }{" "}
                  lançamentos
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-line bg-card p-6 elev-sm">
              <h3 className="text-base font-bold text-ink">
                Fluxo de caixa pessoal
              </h3>
              <p className="text-xs text-mute">Últimos 6 meses</p>
              {pfBars.every((b) => b.net === 0) ? (
                <p className="mt-6 text-sm text-mute">
                  Nenhum lançamento pessoal registrado.
                </p>
              ) : (
                <div className="mt-6 flex h-40 items-end justify-between gap-4">
                  {pfBars.map((b) => (
                    <div
                      key={b.m}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className={`bar w-full max-w-[40px] ${b.net >= 0 ? (b.cur ? "bg-brand" : "bg-brand/70") : "bg-rose/70"}`}
                        style={{ height: b.h }}
                      ></div>
                      <span
                        className={`text-[11px] ${b.cur ? "font-semibold text-ink" : "text-faint"}`}
                      >
                        {b.m}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "pj" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Saldo PJ (MEI)</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                  {fmt(bizBalance)}
                </p>
                <p className="mt-1.5 text-xs text-mute">Conta empresarial</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Faturamento (mês)</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">
                  {fmt(bizIncome)}
                </p>
                <p className="mt-1.5 text-xs text-mute">
                  {
                    txs.filter(
                      (t) =>
                        t.accountType === "BUSINESS" &&
                        t.type === "INCOME" &&
                        isCurrentMonth(t.date),
                    ).length
                  }{" "}
                  lançamentos
                </p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5 elev-sm">
                <p className="text-sm text-mute">Limite MEI anual</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
                  {meiPct}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg">
                  <div
                    className={`h-full rounded-full ${meiPct > 80 ? "bg-rose" : meiPct > 60 ? "bg-amber" : "bg-brand"}`}
                    style={{ width: `${meiPct}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-[11px] text-mute">
                  {fmt(yearIncome)} / R$ 81.000
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-line bg-card p-6 elev-sm">
              <h3 className="text-base font-bold text-ink">
                Fluxo de caixa empresarial
              </h3>
              <p className="text-xs text-mute">Últimos 6 meses</p>
              {pjBars.every((b) => b.net === 0) ? (
                <p className="mt-6 text-sm text-mute">
                  Nenhum lançamento empresarial registrado.
                </p>
              ) : (
                <div className="mt-6 flex h-40 items-end justify-between gap-4">
                  {pjBars.map((b) => (
                    <div
                      key={b.m}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className={`bar w-full max-w-[40px] ${b.net >= 0 ? (b.cur ? "bg-blue" : "bg-blue/70") : "bg-rose/70"}`}
                        style={{ height: b.h }}
                      ></div>
                      <span
                        className={`text-[11px] ${b.cur ? "font-semibold text-ink" : "text-faint"}`}
                      >
                        {b.m}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 rounded-lg border border-line bg-card elev-sm">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h3 className="text-base font-bold text-ink">
                  Lançamentos empresariais
                </h3>
              </div>
              {bizTxs.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  <p className="text-sm text-mute">
                    Nenhum lançamento empresarial registrado.
                  </p>
                  <button
                    onClick={openNew}
                    className="text-sm font-bold text-brand hover:underline"
                  >
                    Fazer primeiro lançamento
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-line">
                  {bizTxs.slice(0, 8).map((t) => {
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
                        <p
                          className={`text-sm font-bold ${isIncome ? "text-brand" : "text-ink"}`}
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
        )}
      </div>
    </>
  );
}
