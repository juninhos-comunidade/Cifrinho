# ADR-001 — Adoção de estrutura Monorepo

**Data:** 2026-05-24
**Status:** Aceito

## Contexto

O Cifrinho possui dois aplicativos distintos (frontend e backend) que compartilham tipos e schemas. Precisávamos decidir entre um repositório separado por app (multi-repo) ou um único repositório contendo tudo (monorepo).

## Decisão

Adotar estrutura **monorepo** com a seguinte organização:

```
apps/web    → Next.js
apps/api    → Fastify
packages/   → Código compartilhado
```

## Motivos

- Facilita o compartilhamento de tipos TypeScript entre frontend e backend sem publicar pacotes npm
- Simplifica a configuração de CI/CD para um time pequeno
- Um único `git clone` coloca o dev em ambiente funcional
- Reduz o overhead de coordenar versões entre repositórios separados

## Consequências

- O repositório cresce em tamanho, mas é gerenciável no estágio atual do projeto
- É necessário configurar workspaces npm para gerenciar as dependências de cada app isoladamente
