# Documentação de Endpoints — API Cifrinho

> Este documento serve como referência central para todos os endpoints da API. Atualize-o sempre que criar ou modificar uma rota.

## Base URL

- **Desenvolvimento:** `http://localhost:3333`
- **Produção:** `https://api.cifrinho.railway.app` *(a confirmar)*

## Autenticação

Todos os endpoints protegidos exigem o header:

```
Authorization: Bearer <token_jwt>
```

---

## Módulo: Auth

| Método | Rota             | Descrição                    | Autenticado |
|--------|------------------|------------------------------|-------------|
| POST   | `/auth/register` | Cadastro de novo usuário     | Não         |
| POST   | `/auth/login`    | Login e geração de token JWT | Não         |

---

## Módulo: Transactions

| Método | Rota                     | Descrição                        | Autenticado |
|--------|--------------------------|----------------------------------|-------------|
| GET    | `/transactions`          | Lista todas as transações        | Sim         |
| POST   | `/transactions`          | Cria uma nova transação          | Sim         |
| PUT    | `/transactions/:id`      | Atualiza uma transação           | Sim         |
| DELETE | `/transactions/:id`      | Remove uma transação             | Sim         |

---

## Módulo: Categories

| Método | Rota               | Descrição                     | Autenticado |
|--------|--------------------|-------------------------------|-------------|
| GET    | `/categories`      | Lista todas as categorias     | Sim         |
| POST   | `/categories`      | Cria uma nova categoria       | Sim         |

---

## Módulo: Income Tax

| Método | Rota                    | Descrição                              | Autenticado |
|--------|-------------------------|----------------------------------------|-------------|
| GET    | `/income-tax/summary`   | Resumo fiscal do ano corrente          | Sim         |
| POST   | `/income-tax/documents` | Upload de comprovante fiscal           | Sim         |

---

## Módulo: Badges

| Método | Rota             | Descrição                          | Autenticado |
|--------|------------------|------------------------------------|-------------|
| GET    | `/badges`        | Lista badges disponíveis           | Sim         |
| GET    | `/badges/me`     | Badges conquistadas pelo usuário   | Sim         |
