# Sprint 2 — Backlog completo & telas pendentes

> **Objetivo:** conectar o frontend à API real, entregar as páginas institucionais e preparar o produto para rodar publicamente.

---

## Contexto da Sprint 1 (entregue)

- Monorepo configurado (apps/web + apps/api + packages/shared)
- Schema do banco e seed inicial
- Fluxo de autenticação (login/register com cookies JWT)
- Landing page com scroll reveal, badges reais e mascote
- Todas as telas do dashboard com dados mockados (overview, personal, business, income-tax, gamification, profile, settings)
- Página legal unificada (privacidade, termos, segurança) em `/legal`

---

## Tasks da Sprint 2

### 1. Páginas institucionais/suporte

#### 1.1 Central de Ajuda (`/ajuda`)
**O que deve ter:**
- Barra de busca de artigos no topo
- Categorias em cards: Conta e acesso, Finanças pessoais, IR, Gamificação, Planos
- Lista dos artigos mais acessados
- Seção de FAQ expansível (accordion) com ~10 perguntas
- CTA no rodapé: "Não encontrou? Fale com a gente" → mailto

#### 1.2 Status do Serviço (`/status`)
**O que deve ter:**
- Banner de status geral: "Todos os sistemas operacionais" (verde) ou alerta de incidente
- Grid de componentes: API, Banco de dados, Autenticação, Dashboard, Notificações — com badge de status
- Histórico de incidentes dos últimos 30 dias (mockado)
- Uptime % dos últimos 90 dias por serviço
- Botão "Assinar atualizações" (placeholder)

#### 1.3 Roadmap (`/roadmap`)
**O que deve ter:**
- Três colunas kanban: **Em progresso** / **Planejado** / **Concluído**
- Cards de feature com: título, descrição, tag de área, data estimada
- Conteúdo inicial:
  - **Concluído:** Landing page, Autenticação, Dashboard, Gestão Pessoal, Gestão Empresarial, IR, Gamificação, Página Legal
  - **Em progresso:** Integração API real, Central de Ajuda, Roadmap, Status, Discord
  - **Planejado:** 2FA, Open Banking, App mobile, Exportação CSV/PDF, Notificações push
- Botão de votação em features (disabled/placeholder por enquanto)

#### 1.4 Página Discord (`/discord`)
**O que deve ter:**
- Hero com logo Discord + copy de boas-vindas à comunidade Juninhos
- Descrição dos canais: #geral, #duvidas-cifrinho, #sugestoes, #ir-e-impostos
- Benefícios: suporte da comunidade, acesso antecipado, badges exclusivas
- CTA: botão "Entrar no servidor" com link para o Discord da Juninhos
- Contador mockado de membros (ex: 2.400+ membros)

---

### 2. Integração frontend ↔ API

#### 2.1 Autenticação real
- [ ] Formulário de login → `POST /auth/login`
- [ ] Formulário de registro → `POST /auth/register`
- [ ] Tratar erros (credenciais inválidas, e-mail já cadastrado)
- [ ] Token JWT em cookie HttpOnly via response da API

#### 2.2 Transações
- [ ] Listar transações em `/personal` e `/business` → `GET /transactions`
- [ ] Modal/drawer para adicionar transação (descrição, valor, categoria, data, tipo PF/PJ) → `POST /transactions`
- [ ] Deletar transação → `DELETE /transactions/:id`

#### 2.3 Overview com dados reais
- [ ] KPIs reais da API (saldo, receitas, despesas do mês)
- [ ] Gráfico com dados dos últimos 6 meses

#### 2.4 Gamificação real
- [ ] Badges desbloqueadas do usuário → `GET /badges/user`
- [ ] XP e nível reais → `GET /gamification/progress`

---

### 3. Melhorias de UX

#### 3.1 Onboarding pós-cadastro
- [ ] Fluxo de 3 passos: (1) tipo de uso PF/PJ, (2) primeira categoria, (3) primeira meta
- [ ] Pode ser modal ou página `/onboarding`

#### 3.2 Páginas de erro
- [ ] `src/app/not-found.tsx` — 404 temática com mascote e link de volta
- [ ] `src/app/error.tsx` — erro genérico com botão "tentar novamente"

#### 3.3 Responsividade mobile
- [ ] Testar todas as telas em 375px (iPhone SE)
- [ ] Sidebar vira drawer com overlay em mobile
- [ ] Header com menu hamburguer em mobile

---

### 4. Infraestrutura e qualidade

- [ ] `.env.example` com `NEXT_PUBLIC_API_URL`, `JWT_SECRET`, `DATABASE_URL`
- [ ] Loading states / skeletons nas páginas que consomem API
- [ ] ESLint + Prettier com pre-commit hook
- [ ] Testes de integração: `/auth/login` e `/auth/register`
- [ ] GitHub Actions: lint + typecheck + testes em cada PR

---

## Telas faltando (backlog total)

| Tela | Rota | Prioridade | Sprint |
|---|---|---|---|
| Central de Ajuda | `/ajuda` | Alta | 2 |
| Status do serviço | `/status` | Alta | 2 |
| Roadmap | `/roadmap` | Média | 2 |
| Página Discord | `/discord` | Média | 2 |
| Onboarding | `/onboarding` | Alta | 2 |
| Página 404 | automática | Alta | 2 |
| Página de erro genérico | automática | Alta | 2 |
| Reset de senha | `/recuperar-senha` | Alta | 2 |
| Confirmação de e-mail | `/confirmar-email` | Média | 3 |
| Checkout / upgrade | `/upgrade` | Baixa | 3 |
| Perfil público (gamificação) | `/u/:username` | Baixa | 3 |

---

## Definição de pronto (DoD)

Uma task está **pronta** quando:
1. Código commitado e PR aberto com descrição
2. TypeScript sem erros (`tsc --noEmit`)
3. Lint passando
4. Testado manualmente no browser (desktop + mobile 375px)
5. PR revisado por ao menos 1 membro
