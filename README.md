<h1 align="center">🚀 Cifrinho</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Comunidade-Juninhos-7B2CBF?style=for-the-badge&logo=discord&logoColor=white" alt="Juninhos Community" />
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status" />
</p>

---

## 📝 Sobre o Projeto

O **Cifrinho** é um ecossistema inteligente de gestão financeira híbrida, projetado para atender tanto às necessidades de controle pessoal quanto empresarial. A plataforma auxilia na organização minuciosa de despesas e receitas, oferecendo uma camada estratégica de planejamento voltada para o Imposto de Renda, facilitando a consolidação de dados fiscais e reduzindo a complexidade na hora de declarar contas.

Este projeto está sendo construído de forma 100% colaborativa dentro do ecossistema da **Comunidade Juninhos**. Nosso foco primordial é aplicar conceitos modernos de engenharia de software para entregar uma solução robusta, de alta performance e com excelente usabilidade.

> 💡 **Nota do Squad:** Este README serve como um documento vivo. Ele será updated continuamente conforme novas funcionalidades forem integradas nas sprints de 30 dias.

---

## 🌐 Deploy

A aplicação está disponível em produção em: **https://cifrinho-app.vercel.app/**

---

## 🛠️ Stack Tecnológica

O projeto foi estruturado seguindo os conceitos de **modularização**, alta coesão e baixo acoplamento:

- **Frontend:** Next.js
- **Backend:** Node.js + Fastify
- **Banco de Dados:** Prisma + NeonDB
- **Infraestrutura:** Vercel + Railway

---

## 📌 Funcionalidades Principais

Aqui está o mapeamento de recursos que estão sendo construídos ou planejados para a plataforma Cifrinho:

- [ ] 🔐 **Sistema de Autenticação:** Login e Cadastro unificados via abas dinâmicas (Tabs sem recarregamento).
- [ ] 📊 **Gestão Híbrida (Pessoal/Empresarial):** Separação clara e intuitiva entre fluxos de caixa e painéis financeiros corporativos e individuais.
- [ ] 📉 **Categorização de Gastos:** Organização inteligente de despesas fixas e variáveis com geração automática de relatórios de consumo.
- [ ] 📅 **Módulo de Imposto de Renda:** Assistente focado na triagem de comprovantes fiscais, cálculo estimado de deduções e preparação de dados para a declaração anual.
- [ ] 🏅 **Ecossistema de Badges:** Gamificação integrada para recompensar o progresso técnico e o engajamento do squad na comunidade.

---

## ⚙️ Como Executar o Projeto Localmente

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- **Ambiente de Execução / Linguagem:** ...
- **Controle de Versão:** ...
- **Gerenciador de Pacotes:** ...

### 🚀 Passos para Instalação

1. Clone o repositório oficial dentro da organização Juninhos:

   ```bash
   git clone [https://github.com/juninhos-comunidade/cifrinho.git](https://github.com/juninhos-comunidade/cifrinho.git)
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd cifrinho
   ```

3. Instale todas as dependências necessárias:

   ```bash
   ...
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example`.

5. Inicie o servidor de desenvolvimento:
   ```bash
   ...
   ```

---

## 🌿 Diretrizes do Git Flow (Guia de Sobrevivência)

Para manter o código limpo e organizado para todo o time, seguimos rigorosamente estas regras de contribuição:

### 1. Estrutura de Branches

| Branch        | Finalidade                                                        |
| ------------- | ----------------------------------------------------------------- |
| `main`        | Código em produção. Nunca recebe commits ou PRs diretos.          |
| `development` | Branch de integração. **Todos os PRs devem ser abertos para cá.** |

### 2. Nomenclatura de Branches

Sempre crie sua branch a partir da `development`:

```bash
git checkout development
git pull origin development
git checkout -b feature/nome-da-funcionalidade
```

Prefixos obrigatórios:

- `feature/nome-da-funcionalidade`
- `fix/correcao-de-bug`
- `docs/atualizacao-readme`

### 3. Padrão de Commits

Os commits devem ser claros, em português e indicar a intenção da alteração:

- `feat: adiciona calculo de previsao de gastos`
- `fix: corrige bug na filtragem por categoria empresarial`
- `style: estiliza os inputs do formulario de imposto de renda`

### 4. Revisão de Código (Pull Requests)

- Nunca faça commit ou PR diretamente na `main` ou `development`.
- Sempre crie sua branch a partir da `development`.
- Abra um **Pull Request (PR)** apontando para `development` e solicite a revisão de pelo menos um outro membro do squad antes de aplicar as alterações.
- O merge de `development` para `main` é feito pelo responsável do projeto ao final de cada sprint.

---

## 👥 Nosso Squad

Um projeto completo só ganha vida com uma equipe sintonizada. Conheça as mentes por trás do desenvolvimento da plataforma:

|                                                 Avatar                                                  | Membro                | Função / Especialidade | GitHub                                  |
| :-----------------------------------------------------------------------------------------------------: | :-------------------- | :--------------------- | :-------------------------------------- |
|             <img src="https://github.com/github.png" width="40" style="border-radius:50%"/>             | **Pedro Augusto**     | Pendente               | ...                                     |
|            <img src="https://github.com/hanxgxrl.png" width="40" style="border-radius:50%"/>            | **Rayane dos Santos** | Full Stack             | [hanxgxrl](https://github.com/hanxgxrl) |
|             <img src="https://github.com/github.png" width="40" style="border-radius:50%"/>             | **Higor Dornelas**    | Pendente               | ...                                     |
|             <img src="https://github.com/github.png" width="40" style="border-radius:50%"/>             | **Lucas Schiavo**     | Pendente               | ...                                     |
| <img src="https://avatars.githubusercontent.com/u/139577518?v=4" width="40" style="border-radius:50%"/> | **Rafhael Hanry**     | Full Stack             | [MrRafha](https://github.com/MrRafha)   |

---

## ⚖️ Licença

Este projeto é de uso exclusivo e educacional dos membros vinculados à **Juninhos Community**.

---

## 🤝 Apoio e Organização

Este projeto é desenvolvido e mantido pelos membros da **Juninhos Community**.
Se precisar de suporte técnico, mentoria de deploy ou dúvidas sobre infraestrutura, use os canais oficiais no Discord.

```

```
