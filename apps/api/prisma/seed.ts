import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ── Help categories & FAQs ───────────────────────────────────────────────────

  const helpCategories = [
    { slug: 'conta',       label: 'Conta e acesso',    color: '#10B981', bg: 'rgba(16,185,129,0.12)',  order: 1 },
    { slug: 'financas',    label: 'Finanças pessoais', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)',  order: 2 },
    { slug: 'ir',          label: 'Imposto de Renda',  color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)',  order: 3 },
    { slug: 'gamificacao', label: 'Gamificação',       color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  order: 4 },
    { slug: 'planos',      label: 'Planos',            color: '#EC4899', bg: 'rgba(236,72,153,0.12)',  order: 5 },
  ]

  for (const cat of helpCategories) {
    await prisma.helpCategory.upsert({
      where: { slug: cat.slug },
      update: { label: cat.label, color: cat.color, bg: cat.bg, order: cat.order },
      create: cat,
    })
  }

  const helpFaqs: { categorySlug: string; question: string; answer: string; order: number }[] = [
    // Conta e acesso
    { categorySlug: 'conta', order: 1,
      question: 'Como crio minha conta no Cifrinho?',
      answer: 'Acesse cifrinho.app, clique em "Criar conta" e preencha nome, e-mail e senha. Em seguida confirme seu e-mail pelo link que enviamos. Todo o processo leva menos de 2 minutos e não exige cartão de crédito.' },
    { categorySlug: 'conta', order: 2,
      question: 'Esqueci minha senha. Como recupero o acesso?',
      answer: 'Na tela de login, clique em "Esqueci minha senha". Informe o e-mail cadastrado e enviaremos um link de redefinição válido por 30 minutos. Se não receber o e-mail, verifique a caixa de spam ou entre em contato com suporte@cifrinho.app.' },
    { categorySlug: 'conta', order: 3,
      question: 'Como altero meu e-mail ou senha?',
      answer: 'Acesse Configurações → Conta. Lá você pode atualizar seu e-mail (uma confirmação será enviada para o novo endereço) e trocar sua senha a qualquer momento. Recomendamos uma senha com pelo menos 12 caracteres, misturando letras, números e símbolos.' },
    { categorySlug: 'conta', order: 4,
      question: 'Como exporto meus dados antes de cancelar a conta?',
      answer: 'Vá em Configurações → Exportar dados. Você pode baixar todas as transações em CSV, relatórios em PDF e dados fiscais em formato compatível com o IRPF. A exportação fica disponível por 60 dias após o cancelamento da conta.' },
    { categorySlug: 'conta', order: 5,
      question: 'Como cancelo minha conta permanentemente?',
      answer: 'Acesse Configurações → Zona de Risco → Excluir conta. Você precisará confirmar sua senha e aceitar que todos os dados serão apagados de forma irreversível. Recomendamos exportar seus dados antes. A exclusão é concluída em até 30 dias, conforme a LGPD.' },
    { categorySlug: 'conta', order: 6,
      question: 'Meus dados ficam seguros no Cifrinho?',
      answer: 'Sim. Todos os dados trafegam via TLS 1.3 e são armazenados com criptografia AES-256. Senhas nunca são salvas em texto claro — usamos bcrypt com salt único por usuário. Nenhum dado é vendido ou compartilhado com terceiros para fins comerciais.' },
    { categorySlug: 'conta', order: 7,
      question: 'Como funciona o suporte ao cliente?',
      answer: 'Você pode enviar um e-mail para suporte@cifrinho.app ou usar o formulário de contato na página de ajuda. O tempo médio de resposta é de até 2 dias úteis no plano gratuito e 24 horas nos planos pagos.' },

    // Finanças pessoais
    { categorySlug: 'financas', order: 1,
      question: 'Como importo um extrato bancário no Cifrinho?',
      answer: 'Acesse Finanças pessoais → Importar transações. O Cifrinho aceita arquivos OFX (padrão exportado pela maioria dos bancos) e CSV. Após o upload, as transações são listadas para revisão antes de serem salvas — você pode editar categorias e descrições antes de confirmar.' },
    { categorySlug: 'financas', order: 2,
      question: 'Quais formatos de arquivo são aceitos na importação?',
      answer: 'Atualmente aceitamos OFX (Open Financial Exchange) e CSV. O OFX é o formato padrão exportado por Nubank, Itaú, Bradesco, Santander e a maioria dos bancos brasileiros. Para CSV, disponibilizamos um modelo para download dentro da tela de importação.' },
    { categorySlug: 'financas', order: 3,
      question: 'Como categorizo uma transação manualmente?',
      answer: 'Na lista de transações, clique no ícone de lápis ao lado da transação desejada e selecione a categoria no menu. Você também pode criar categorias personalizadas em Configurações → Categorias. Transações recorrentes podem ser categorizadas em lote.' },
    { categorySlug: 'financas', order: 4,
      question: 'Como funciona a separação entre finanças pessoais e empresariais?',
      answer: 'O Cifrinho mantém dois painéis independentes — PF (pessoa física) e PJ (pessoa jurídica). Cada um tem contas, categorias e relatórios próprios. Você pode alternar entre eles no menu lateral e também ver uma visão consolidada no painel de Visão Geral.' },
    { categorySlug: 'financas', order: 5,
      question: 'Posso definir metas de economia ou limite de gastos?',
      answer: 'Sim. Em Finanças pessoais → Metas, você cria objetivos com valor alvo e prazo. Em Categorias você pode definir um orçamento mensal por categoria — o Cifrinho envia uma notificação quando você se aproximar do limite.' },
    { categorySlug: 'financas', order: 6,
      question: 'O Cifrinho funciona no celular?',
      answer: 'A versão web é totalmente responsiva e funciona bem em qualquer navegador mobile. Apps nativos para iOS e Android estão no roadmap e devem ser lançados em 2026. Você pode adicionar o site à tela inicial do seu celular como um atalho.' },
    { categorySlug: 'financas', order: 7,
      question: 'Posso usar o Cifrinho para MEI ou pequenas empresas?',
      answer: 'Sim. O painel empresarial foi pensado para freelancers, MEIs e pequenas empresas. Você registra receitas e despesas do negócio separadamente das pessoais, acompanha o fluxo de caixa e gera relatórios simples — sem precisar de software de contabilidade separado.' },

    // Imposto de Renda
    { categorySlug: 'ir', order: 1,
      question: 'O Cifrinho faz minha declaração de IR automaticamente?',
      answer: 'O Cifrinho organiza comprovantes, estima deduções e consolida seus dados fiscais ao longo do ano. A declaração oficial ainda precisa ser submetida pelo programa da Receita Federal (IRPF). Pense no Cifrinho como seu assistente que deixa tudo pronto antes de abril.' },
    { categorySlug: 'ir', order: 2,
      question: 'Como importo comprovantes para o IR?',
      answer: 'Em Imposto de Renda → Comprovantes, você pode fazer upload de PDFs, imagens (JPG/PNG) e XMLs de notas fiscais. O Cifrinho lê os valores automaticamente e sugere a categoria de dedução correta (saúde, educação, previdência etc.) para você confirmar.' },
    { categorySlug: 'ir', order: 3,
      question: 'Quais deduções o Cifrinho identifica automaticamente?',
      answer: 'O Cifrinho reconhece despesas médicas (consultas, exames, planos de saúde), despesas com educação (escola, faculdade, cursos), contribuições ao INSS e previdência privada (PGBL), pensão alimentícia judicial e dependentes. Os cálculos são estimativas — sempre confira com um contador.' },
    { categorySlug: 'ir', order: 4,
      question: 'Posso exportar os dados para preencher no programa da Receita Federal?',
      answer: 'Sim. Em Imposto de Renda → Exportar, você baixa um relatório em PDF com todos os valores organizados por ficha da declaração (rendimentos, deduções, bens e direitos). É só usar esse relatório como guia ao preencher o IRPF oficialmente.' },
    { categorySlug: 'ir', order: 5,
      question: 'O Cifrinho funciona para declaração simplificada e completa?',
      answer: 'Sim. O painel de IR mostra uma estimativa comparando as duas modalidades — simplificada (desconto padrão de 20%) e completa (deduções reais). Assim você consegue decidir qual opção é mais vantajosa antes de abrir o programa da Receita.' },

    // Gamificação
    { categorySlug: 'gamificacao', order: 1,
      question: 'O que são XP e badges?',
      answer: 'XP (pontos de experiência) são ganhos ao realizar ações financeiras saudáveis: registrar transações, cumprir metas, usar o app por dias consecutivos e manter o orçamento em dia. Ao acumular XP você sobe de nível. As badges são conquistas visuais desbloqueadas por marcos específicos, como "IR em dia" ou "7 dias seguidos".' },
    { categorySlug: 'gamificacao', order: 2,
      question: 'Como desbloqueio uma badge?',
      answer: 'Cada badge tem um critério específico exibido na tela de Gamificação → Badges. Exemplos: "Primeiros passos" é desbloqueada ao salvar a primeira meta; "Declarante" ao finalizar os dados do IR; "Economizador" ao manter 7 dias consecutivos sem ultrapassar o orçamento. Passe o mouse sobre uma badge bloqueada para ver o que falta.' },
    { categorySlug: 'gamificacao', order: 3,
      question: 'Perco meu progresso se ficar alguns dias sem usar o app?',
      answer: 'Seu nível e badges conquistadas nunca são perdidos. O que pode ser resetado é a contagem de sequência (streak) de uso diário — mas isso só afeta a progressão de badges específicas de sequência, não seu nível geral ou XP acumulado.' },
    { categorySlug: 'gamificacao', order: 4,
      question: 'Existe ranking ou competição com outros usuários?',
      answer: 'Ainda não temos ranking público, mas é uma funcionalidade planejada para a integração com a Comunidade Juninhos. A ideia é que membros do squad possam comparar conquistas e se motivar mutuamente — fique de olho no roadmap.' },
    { categorySlug: 'gamificacao', order: 5,
      question: 'As badges têm alguma utilidade além do visual?',
      answer: 'Por enquanto as badges são recompensas visuais que reconhecem seus hábitos financeiros. No futuro, planejamos integrá-las a benefícios dentro da plataforma — como descontos em planos pagos ou acesso antecipado a novos recursos para usuários com badges raras.' },

    // Planos
    { categorySlug: 'planos', order: 1,
      question: 'O Cifrinho é gratuito?',
      answer: 'Sim. O plano gratuito permite gerenciar finanças pessoais, criar até 2 contas, importar extratos e acompanhar metas. Os planos pagos desbloqueiam gestão empresarial completa, Imposto de Renda avançado, contas ilimitadas e suporte prioritário.' },
    { categorySlug: 'planos', order: 2,
      question: 'Quais são os planos disponíveis e os preços?',
      answer: 'Atualmente temos o plano Gratuito (para sempre), o plano Pro (para quem quer gestão pessoal completa sem limites) e o plano Business (para quem precisa de gestão PF + PJ integrada e recursos de IR avançados). Os valores atualizados ficam na página de Planos dentro do app.' },
    { categorySlug: 'planos', order: 3,
      question: 'Como faço upgrade ou downgrade do meu plano?',
      answer: 'Vá em Configurações → Plano atual. Lá você pode fazer upgrade com pagamento imediato (o valor é proporcional ao período restante) ou downgrade ao final do ciclo de cobrança. Ao fazer downgrade, seus dados são preservados — apenas os recursos exclusivos do plano superior são desativados.' },
    { categorySlug: 'planos', order: 4,
      question: 'Como cancelo meu plano pago?',
      answer: 'Acesse Configurações → Plano atual → Cancelar assinatura. O acesso aos recursos pagos continua até o fim do período já pago. Não fazemos cobrança após o cancelamento e não há multa. Seus dados permanecem acessíveis no plano gratuito após o cancelamento.' },
    { categorySlug: 'planos', order: 5,
      question: 'Consigo reembolso se não gostar do plano?',
      answer: 'Oferecemos garantia de 7 dias para novos assinantes. Se dentro desse prazo você não ficar satisfeito, entre em contato com suporte@cifrinho.app que processamos o reembolso integral sem perguntas. Após 7 dias, não fazemos reembolsos parciais.' },
  ]

  // busca todas as categorias de uma vez para evitar N+1 no seed
  const categoryMap = Object.fromEntries(
    (await prisma.helpCategory.findMany()).map((c) => [c.slug, c.id])
  )

  for (const faq of helpFaqs) {
    const categoryId = categoryMap[faq.categorySlug]
    await prisma.helpFaq.upsert({
      where: {
        // upsert por combinação única de categoryId + question
        categoryId_question: { categoryId, question: faq.question },
      },
      update: { answer: faq.answer, order: faq.order },
      create: { categoryId, question: faq.question, answer: faq.answer, order: faq.order },
    })
  }

  console.log(`✅ ${helpCategories.length} categorias de ajuda criadas`)
  console.log(`✅ ${helpFaqs.length} FAQs criadas`)

  // ── Badges ───────────────────────────────────────────────────────────────────

  const badges = [
    {
      name: 'Primeiros Passos',
      description: 'Conclua o tutorial de boas-vindas do Cifrinho',
      icon: '/badges/Primeiros passos.png',
      condition: null, // desbloqueado quando onboarding for implementado
    },
    {
      name: 'Organizado',
      description: 'Crie 3 metas de economia',
      icon: '/badges/Organizado.png',
      condition: 'goals_3',
    },
    {
      name: 'Economizador',
      description: 'Crie e conclua 1 meta de economia',
      icon: '/badges/Economizador.png',
      condition: 'goals_completed_1',
    },
    {
      name: 'Empresário',
      description: 'Liste 2 investimentos na conta empresarial',
      icon: '/badges/Empresario.png',
      condition: 'business_investment_2',
    },
    {
      name: 'Declarante',
      description: 'Exporte os dados do seu Imposto de Renda',
      icon: '/badges/Declarante.png',
      condition: null, // desbloqueado quando exportação IR for implementada
    },
  ]

  // Remove badges que não fazem mais parte do conjunto oficial
  const officialNames = badges.map(b => b.name)
  await prisma.badge.deleteMany({ where: { name: { notIn: officialNames } } })

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: { description: badge.description, icon: badge.icon, condition: badge.condition },
      create: badge,
    })
  }

  console.log(`✅ ${badges.length} badges criados/atualizados`)

  // ── Incidents iniciais ───────────────────────────────────────────────────────

  const incidents = [
    {
      title: 'Manutenção programada · Autenticação',
      description: 'Janela de atualização do provedor de login. Logins podiam levar alguns segundos a mais.',
      severity: 'MEDIUM' as const,
      resolvedAt: new Date('2026-06-02T18:00:00Z'),
      createdAt:  new Date('2026-06-02T14:00:00Z'),
    },
    {
      title: 'Lentidão em relatórios',
      description: 'Exportações de IR ficaram lentas por 22 min. Resolvido com escala de workers.',
      severity: 'HIGH' as const,
      resolvedAt: new Date('2026-05-28T12:22:00Z'),
      createdAt:  new Date('2026-05-28T12:00:00Z'),
    },
    {
      title: 'Ajuste em webhooks de PIX',
      description: 'Pequeno atraso na confirmação de pagamentos. Sem impacto em saldos.',
      severity: 'LOW' as const,
      resolvedAt: new Date('2026-05-15T10:30:00Z'),
      createdAt:  new Date('2026-05-15T09:45:00Z'),
    },
  ]

  for (const inc of incidents) {
    const existing = await prisma.incident.findFirst({ where: { title: inc.title } })
    if (!existing) {
      await prisma.incident.create({ data: inc })
    }
  }

  console.log(`✅ ${incidents.length} incidents iniciais verificados`)
  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
