# Arquitetura Geral — Cifrinho

## Visão Estrutural

O Cifrinho adota uma arquitetura **monorepo** dividida em dois aplicativos principais e um pacote compartilhado:

```
apps/
  web/   → Frontend (Next.js)
  api/   → Backend (Node.js + Fastify + Prisma)
packages/
  shared/ → Tipos, schemas e utilitários compartilhados entre web e api
```

## Stack

| Camada        | Tecnologia            | Responsabilidade                                      |
|---------------|-----------------------|-------------------------------------------------------|
| Frontend      | Next.js (App Router)  | Interface do usuário, rotas, SSR/SSG                  |
| Backend       | Node.js + Fastify     | API REST, regras de negócio, autenticação             |
| ORM           | Prisma                | Mapeamento objeto-relacional, migrations              |
| Banco de Dados| NeonDB (PostgreSQL)   | Persistência dos dados em nuvem                       |
| Deploy Web    | Vercel                | Hospedagem do frontend com CI/CD automático           |
| Deploy API    | Railway               | Hospedagem do backend com CI/CD automático            |

## Fluxo de Dados

```
Usuário → Next.js (Frontend) → Fastify API (Backend) → Prisma → NeonDB
```

## Módulos do Backend

- `auth` — Registro, login, geração e validação de tokens JWT
- `transactions` — CRUD de receitas e despesas (pessoal e empresarial)
- `categories` — Categorias de gastos fixos e variáveis
- `income-tax` — Lógica do assistente de Imposto de Renda
- `badges` — Sistema de gamificação e conquistas do squad

## Decisões Arquiteturais

Consulte a pasta [`decisions/`](../decisions/) para os registros de ADR (Architecture Decision Records).
