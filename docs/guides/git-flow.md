# Git Flow — Cifrinho

> Guia prático para contribuir com o projeto, mesmo que seja sua primeira vez usando Git em equipe.

---

## Como o projeto está organizado no GitHub

O repositório tem duas branches principais que você **nunca edita diretamente**:

| Branch | Para que serve |
|---|---|
| `main` | Código em produção. Só recebe código 100% funcional. |
| `development` | Integração do time. É daqui que você cria sua branch e para onde você manda o PR. |

> O merge de `development` para `main` é feito pelo responsável do projeto ao final de cada sprint, após validação completa.

---

## Passo a passo para contribuir

### 1. Antes de começar qualquer tarefa

Sempre atualize seu `development` local antes de criar uma branch nova:

```bash
git checkout development
git pull origin development
```

> Isso evita conflitos com o trabalho dos outros membros.

---

### 2. Crie sua branch para a tarefa

O nome da branch segue o padrão: `tipo/o-que-voce-fez`

```bash
git checkout -b feature/tela-de-login
```

**Tipos disponíveis:**

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feature/` | Nova funcionalidade | `feature/dashboard-pessoal` |
| `fix/` | Corrigir um bug | `fix/erro-no-login` |
| `style/` | Ajuste visual (sem mudar lógica) | `style/botao-primario` |
| `refactor/` | Melhorar código sem mudar comportamento | `refactor/componente-card` |
| `docs/` | Atualizar documentação | `docs/atualiza-readme` |
| `chore/` | Configuração, dependências, etc. | `chore/atualiza-eslint` |

---

### 3. Faça suas alterações e salve (commit)

Após editar os arquivos, salve seu progresso com um commit:

```bash
git add nome-do-arquivo.tsx
git commit -m "feat: adiciona tela de login com abas"
```

**Formato do commit:** `tipo: descrição curta em português`

Exemplos:
```bash
git commit -m "feat: cria componente de card de transação"
git commit -m "fix: corrige validação do formulário de cadastro"
git commit -m "style: ajusta cores dos botões conforme design system"
```

> Dica: commits pequenos e frequentes são melhores do que um commit gigante no final.

---

### 4. Envie sua branch para o GitHub
    
```bash
git push origin feature/tela-de-login
```

Na primeira vez, use a flag `-u` para vincular a branch:

```bash
git push -u origin feature/tela-de-login
```

---

### 5. Abra um Pull Request (PR)

1. Acesse o repositório no GitHub
2. Clique no botão **"Compare & pull request"** que vai aparecer automaticamente
3. Confirme que o PR está indo de `feature/sua-branch` → `development`
4. Preencha o título e descreva o que foi feito e como testar
5. Peça revisão para pelo menos 1 membro do time
6. Aguarde aprovação antes de fazer o merge

---

## Resumo visual do fluxo

```
development (sempre atualizado)
    │
    ├── git checkout -b feature/minha-tarefa
    │         │
    │         │  (suas alterações + commits)
    │         │
    │         └── git push origin feature/minha-tarefa
    │                       │
    │                       └── Pull Request → development
    │
    └── (após aprovação) merge na development
```

---

## Regras de ouro

- Nunca faça commit direto em `main` ou `development`
- Todo PR aponta para `development` (nunca para `main`)
- Nunca use `--force` sem avisar o squad
- Mantenha as branches curtas — idealmente resolvidas em até 2 dias
- Sempre sincronize com `development` antes de abrir o PR

---

## Dúvidas frequentes

**"Dei push mas não apareceu o botão de PR no GitHub"**
Acesse a aba "Pull requests" e clique em "New pull request" manualmente.

**"Tem conflito no meu PR, o que faço?"**
Avisa no grupo — alguém do time vai ajudar a resolver.

**"Posso commitar direto na `development`?"**
Não. Sempre crie sua própria branch e mande um PR.

**"Preciso de aprovação para dar merge?"**
Sim. Todo PR precisa de pelo menos 1 aprovação de outro membro.
