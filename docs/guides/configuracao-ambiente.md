# Guia de Configuração do Ambiente de Desenvolvimento

## Pré-requisitos

Antes de começar, instale as ferramentas abaixo:

| Ferramenta  | Versão recomendada | Link                             |
|-------------|-------------------|----------------------------------|
| Node.js     | 20.x (LTS)        | https://nodejs.org               |
| npm         | 10.x+             | Incluso com o Node.js            |
| Git         | Qualquer recente  | https://git-scm.com              |

## Passo a Passo

### 1. Clonar o repositório

```bash
git clone https://github.com/juninhos-comunidade/cifrinho.git
cd cifrinho
```

### 2. Instalar dependências

```bash
# Na raiz do monorepo (instala dependências de todos os apps)
npm install
```

### 3. Configurar variáveis de ambiente

**Frontend (`apps/web`):**

```bash
cp apps/web/.env.example apps/web/.env.local
```

**Backend (`apps/api`):**

```bash
cp apps/api/.env.example apps/api/.env
```

Preencha os valores no arquivo `.env` gerado. Os campos obrigatórios são:

| Variável        | Descrição                          |
|-----------------|------------------------------------|
| `DATABASE_URL`  | String de conexão do NeonDB        |
| `JWT_SECRET`    | Chave secreta para assinar tokens  |

### 4. Executar as migrations do banco

```bash
cd apps/api
npx prisma migrate dev
```

### 5. Iniciar os servidores

Em terminais separados:

```bash
# Terminal 1 — Backend
cd apps/api
npm run dev

# Terminal 2 — Frontend
cd apps/web
npm run dev
```

- Frontend disponível em: `http://localhost:3000`
- Backend disponível em: `http://localhost:3333`

## Problemas comuns

**Erro de conexão com o banco:**
Verifique se a `DATABASE_URL` no `.env` está correta e se o NeonDB está acessível.

**Porta já em uso:**
Encerre o processo que ocupa a porta ou altere a porta padrão nas configs do app.
