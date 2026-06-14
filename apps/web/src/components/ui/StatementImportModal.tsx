"use client";

import { useRef, useState } from "react";
import {
  useStatementImport,
  type ParsedTransaction,
} from "@/hooks/useStatementImport";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ACCEPTED = ".pdf,.csv,.ofx,.txt";

function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors
        ${dragging ? "border-brand bg-brand/5" : "border-line hover:border-brand/50"}`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </span>
      <div className="text-center">
        <p className="text-sm font-semibold text-ink">
          Arraste o extrato aqui ou clique para selecionar
        </p>
        <p className="mt-1 text-xs text-mute">
          PDF, CSV ou OFX · máx. 5 MB · qualquer banco
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}

function UploadingState() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative h-16 w-16">
        <svg
          className="h-16 w-16 animate-spin text-brand"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.2"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-ink">
          Analisando extrato com IA…
        </p>
        <p className="mt-1 text-xs text-mute">
          Isso pode levar alguns segundos
        </p>
      </div>
    </div>
  );
}

function ReviewTable({
  transactions,
  onUpdate,
  onToggleAll,
}: {
  transactions: ParsedTransaction[];
  onUpdate: (i: number, patch: Partial<ParsedTransaction>) => void;
  onToggleAll: (v: boolean) => void;
}) {
  const allSelected = transactions.every((t) => t.selected);
  const selectedCount = transactions.filter((t) => t.selected).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">
          <span className="font-semibold text-ink">{selectedCount}</span> de{" "}
          <span className="font-semibold text-ink">{transactions.length}</span>{" "}
          transações selecionadas
        </p>
        <button
          onClick={() => onToggleAll(!allSelected)}
          className="text-xs font-semibold text-brand hover:underline"
        >
          {allSelected ? "Desmarcar todas" : "Selecionar todas"}
        </button>
      </div>

      <div className="max-h-[380px] overflow-y-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-bg text-xs font-semibold uppercase tracking-wide text-mute">
              <th className="w-10 px-3 py-2.5 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleAll(e.target.checked)}
                  className="accent-brand"
                />
              </th>
              <th className="px-3 py-2.5 text-left">Descrição</th>
              <th className="px-3 py-2.5 text-left">Data</th>
              <th className="px-3 py-2.5 text-left">Categoria</th>
              <th className="px-3 py-2.5 text-left">Conta</th>
              <th className="px-3 py-2.5 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {transactions.map((t, i) => (
              <tr
                key={i}
                className={`transition-colors ${t.selected ? "" : "opacity-40"}`}
              >
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={t.selected}
                    onChange={(e) =>
                      onUpdate(i, { selected: e.target.checked })
                    }
                    className="accent-brand"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-full rounded border border-transparent bg-transparent px-1 py-0.5 text-sm text-ink outline-none focus:border-brand/50 focus:bg-bg"
                    value={t.description}
                    onChange={(e) =>
                      onUpdate(i, { description: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    className="rounded border border-transparent bg-transparent px-1 py-0.5 text-xs text-mute outline-none focus:border-brand/50 focus:bg-bg"
                    value={t.date}
                    onChange={(e) => onUpdate(i, { date: e.target.value })}
                  />
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center rounded-full border border-line bg-bg px-2 py-0.5 text-[11px] text-mute">
                    {t.suggestedCategory}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <select
                    className="rounded border border-transparent bg-transparent px-1 py-0.5 text-xs text-mute outline-none focus:border-brand/50 focus:bg-bg"
                    value={t.accountType}
                    onChange={(e) =>
                      onUpdate(i, {
                        accountType: e.target.value as "PERSONAL" | "BUSINESS",
                      })
                    }
                  >
                    <option value="PERSONAL">Pessoal</option>
                    <option value="BUSINESS">Empresarial</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-right">
                  <span
                    className={`font-semibold ${t.type === "INCOME" ? "text-brand" : "text-rose"}`}
                  >
                    {t.type === "INCOME" ? "+" : "-"} R${" "}
                    {t.amount.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatementImportModal({ open, onClose }: Props) {
  const {
    step,
    transactions,
    errorMsg,
    upload,
    updateTransaction,
    toggleAll,
    confirm,
    reset,
  } = useStatementImport();

  function handleClose() {
    reset();
    onClose();
  }

  if (!open) return null;

  const selectedCount = transactions.filter((t) => t.selected).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="modal-in w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-card shadow-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-ink">
              Importar extrato bancário
            </h2>
            <p className="text-xs text-mute">
              PDF, CSV ou OFX de qualquer banco brasileiro
            </p>
          </div>
          <button
            onClick={handleClose}
            className="grid h-8 w-8 place-items-center rounded-md text-mute transition-colors hover:bg-elev hover:text-ink"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="p-6">
          {step === "idle" && <UploadZone onFile={upload} />}

          {step === "uploading" && <UploadingState />}

          {step === "reviewing" && (
            <ReviewTable
              transactions={transactions}
              onUpdate={updateTransaction}
              onToggleAll={toggleAll}
            />
          )}

          {step === "saving" && (
            <div className="flex flex-col items-center gap-3 py-10">
              <svg
                className="h-12 w-12 animate-spin text-brand"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm text-mute">Salvando transações…</p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <div className="text-center">
                <p className="text-base font-bold text-ink">
                  Importação concluída!
                </p>
                <p className="mt-1 text-sm text-mute">
                  {selectedCount} transaç
                  {selectedCount === 1 ? "ão importada" : "ões importadas"} com
                  sucesso.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg bg-brand px-6 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Fechar
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-rose/10 text-rose">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <div className="text-center">
                <p className="text-base font-bold text-ink">
                  Ops, algo deu errado
                </p>
                <p className="mt-1 text-sm text-mute">{errorMsg}</p>
              </div>
              <button
                onClick={reset}
                className="rounded-lg border border-line bg-bg px-6 py-2 text-sm font-bold text-ink transition-colors hover:border-brand/50"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>

        {/* footer — só na etapa de revisão */}
        {step === "reviewing" && (
          <div className="flex items-center justify-between border-t border-line px-6 py-4">
            <button
              onClick={handleClose}
              className="rounded-lg border border-line bg-bg px-4 py-2 text-sm font-semibold text-mute transition-colors hover:text-ink"
            >
              Cancelar
            </button>
            <button
              onClick={confirm}
              disabled={selectedCount === 0}
              className="rounded-lg bg-brand px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Importar {selectedCount} transaç
              {selectedCount === 1 ? "ão" : "ões"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
