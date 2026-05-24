# Git Flow — Guia do Squad Cifrinho

## Branches principais

| Branch   | Finalidade                                               |
|----------|----------------------------------------------------------|
| `main`   | Código em produção. Nunca recebe commits diretos.        |

## Nomenclatura de branches

Sempre crie sua branch a partir da `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/nome-da-funcionalidade
```

Prefixos obrigatórios:

| Prefixo    | Quando usar                              |
|------------|------------------------------------------|
| `feature/` | Nova funcionalidade                      |
| `fix/`     | Correção de bug                          |
| `docs/`    | Atualização de documentação              |
| `style/`   | Ajustes visuais sem lógica              |
| `refactor/`| Refatoração sem mudança de comportamento |
| `chore/`   | Tarefas de manutenção (configs, deps)    |

## Padrão de commits

Commits em português, no imperativo, seguindo o formato:

```
<tipo>: <descrição curta>
```

Exemplos:

```
feat: adiciona tela de login com abas dinâmicas
fix: corrige cálculo de deduções no módulo de IR
docs: atualiza guia de configuração do ambiente
style: ajusta espaçamento no dashboard pessoal
```

## Pull Requests

1. Faça push da sua branch: `git push origin feature/minha-tarefa`
2. Abra um PR no GitHub apontando para `main`
3. Preencha o template do PR com o que foi feito e como testar
4. Solicite revisão de **pelo menos um** outro membro do squad
5. Aguarde aprovação antes de fazer o merge

## Regras de ouro

- Nunca faça commit diretamente na `main`
- Nunca use `--force` sem avisar o squad
- Mantenha as branches curtas (idealmente resolvidas em até 2 dias)
- Sempre sincronize com a `main` antes de abrir o PR
