# Sprint 2 — Dashboard & Transações

**Período:** 02/06 – 13/06/2026
**Meta:** Usuário consegue fazer login, ver o dashboard pessoal e registrar transações.

---

## Bloco 1 — Fechar Sprint 1

| # | Task | Prioridade |
|---|------|-----------|
| S1-1 | Fechar issues #26, #27, #28, #29, #30, #31, #32, #33 no GitHub (já implementados) | Alta |
| S1-2 | Revisar issue #34 — token migrado para cookie ✅ | Alta |
| S1-3 | Revisar issue #35 — layout + middleware implementados ✅ | Alta |
| S1-4 | Confirmar status dos deploys #36 (Vercel) e #37 (Railway) | Média |

---

## Bloco 2 — Dashboard Pessoal

| # | Task | Prioridade |
|---|------|-----------|
| D-1 | Cards de resumo: saldo do mês, total de receitas, total de despesas | Alta |
| D-2 | Listagem de transações recentes (últimas 10) com data, descrição, valor e categoria | Alta |
| D-3 | Filtros básicos na listagem: tipo (receita/despesa) e período (mês atual) | Média |
| D-4 | Empty state para quando não há transações cadastradas | Média |

---

## Bloco 3 — Transações

| # | Task | Prioridade |
|---|------|-----------|
| T-1 | Modal/drawer para criar nova transação (descrição, valor, tipo, data, categoria) | Alta |
| T-2 | Ação de deletar transação com confirmação | Alta |
| T-3 | Ação de editar transação | Média |
| T-4 | Hook `useTransactions` encapsulando fetch, create, update e delete | Média |

---

## Bloco 4 — Categorias

| # | Task | Prioridade |
|---|------|-----------|
| C-1 | Listagem de categorias do usuário | Média |
| C-2 | Formulário para criar categoria (nome, ícone, cor, tipo de conta) | Média |
| C-3 | Seletor de categoria no formulário de transação | Alta |

---

## Bloco 5 — Auth & Sessão

| # | Task | Prioridade |
|---|------|-----------|
| A-1 | Hook `useAuth` para acessar dados do usuário logado | Média |
| A-2 | Exibir nome do usuário no header/sidebar | Baixa |

---

## Nice-to-have (se sobrar capacidade)

- Gráfico de barras: evolução de receitas vs despesas nos últimos 6 meses
- Badges: criar as 5 imagens (512x512px) e exibi-las na tela de perfil
- Página `/business` com as mesmas features do pessoal, filtrada por `accountType: BUSINESS`

---

## Dependências técnicas

- Backend: todos os endpoints necessários já existem (`/transactions`, `/categories`, `/auth`)
- Frontend: `Sidebar`, `Header` e `middleware.ts` implementados na Sprint 1

---

## Definição de pronto (DoD)

- Funciona no desktop e mobile
- Sem erros de TypeScript
- Token expirado redireciona para `/login`
- PR revisado por ao menos 1 pessoa do time
