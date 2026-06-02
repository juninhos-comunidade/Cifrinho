'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = [
  {
    id: 'conta',
    label: 'Conta e acesso',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'financas',
    label: 'Finanças pessoais',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z" />
      </svg>
    ),
  },
  {
    id: 'ir',
    label: 'Imposto de Renda',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'gamificacao',
    label: 'Gamificação',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'planos',
    label: 'Planos',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

const TOP_ARTICLES = [
  { title: 'Como criar minha conta no Cifrinho', categoryId: 'conta', category: 'Conta e acesso', views: 4820, color: '#10B981' },
  { title: 'Como categorizar uma transação', categoryId: 'financas', category: 'Finanças pessoais', views: 3914, color: '#3B82F6' },
  { title: 'Como importar comprovantes para o IR', categoryId: 'ir', category: 'Imposto de Renda', views: 3201, color: '#8B5CF6' },
  { title: 'O que são badges e como desbloqueá-las', categoryId: 'gamificacao', category: 'Gamificação', views: 2788, color: '#F59E0B' },
  { title: 'Diferença entre conta pessoal e empresarial', categoryId: 'financas', category: 'Finanças pessoais', views: 2450, color: '#3B82F6' },
  { title: 'Como redefinir minha senha', categoryId: 'conta', category: 'Conta e acesso', views: 2103, color: '#10B981' },
  { title: 'Quais deduções o Cifrinho calcula automaticamente', categoryId: 'ir', category: 'Imposto de Renda', views: 1980, color: '#8B5CF6' },
  { title: 'Como mudar de plano ou cancelar', categoryId: 'planos', category: 'Planos', views: 1645, color: '#EC4899' },
]

const FAQS = [
  // ── Conta e acesso ──────────────────────────────────────────────────────────
  {
    categoryId: 'conta',
    q: 'Como crio minha conta no Cifrinho?',
    a: 'Acesse cifrinho.app, clique em "Criar conta" e preencha nome, e-mail e senha. Em seguida confirme seu e-mail pelo link que enviamos. Todo o processo leva menos de 2 minutos e não exige cartão de crédito.',
  },
  {
    categoryId: 'conta',
    q: 'Esqueci minha senha. Como recupero o acesso?',
    a: 'Na tela de login, clique em "Esqueci minha senha". Informe o e-mail cadastrado e enviaremos um link de redefinição válido por 30 minutos. Se não receber o e-mail, verifique a caixa de spam ou entre em contato com suporte@cifrinho.app.',
  },
  {
    categoryId: 'conta',
    q: 'Como altero meu e-mail ou senha?',
    a: 'Acesse Configurações → Conta. Lá você pode atualizar seu e-mail (uma confirmação será enviada para o novo endereço) e trocar sua senha a qualquer momento. Recomendamos uma senha com pelo menos 12 caracteres, misturando letras, números e símbolos.',
  },
  {
    categoryId: 'conta',
    q: 'Como exporto meus dados antes de cancelar a conta?',
    a: 'Vá em Configurações → Exportar dados. Você pode baixar todas as transações em CSV, relatórios em PDF e dados fiscais em formato compatível com o IRPF. A exportação fica disponível por 60 dias após o cancelamento da conta.',
  },
  {
    categoryId: 'conta',
    q: 'Como cancelo minha conta permanentemente?',
    a: 'Acesse Configurações → Zona de Risco → Excluir conta. Você precisará confirmar sua senha e aceitar que todos os dados serão apagados de forma irreversível. Recomendamos exportar seus dados antes. A exclusão é concluída em até 30 dias, conforme a LGPD.',
  },
  {
    categoryId: 'conta',
    q: 'Meus dados ficam seguros no Cifrinho?',
    a: 'Sim. Todos os dados trafegam via TLS 1.3 e são armazenados com criptografia AES-256. Senhas nunca são salvas em texto claro — usamos bcrypt com salt único por usuário. Nenhum dado é vendido ou compartilhado com terceiros para fins comerciais.',
  },
  {
    categoryId: 'conta',
    q: 'Como funciona o suporte ao cliente?',
    a: 'Você pode enviar um e-mail para suporte@cifrinho.app ou usar o formulário de contato na página de ajuda. O tempo médio de resposta é de até 2 dias úteis no plano gratuito e 24 horas nos planos pagos.',
  },

  // ── Finanças pessoais ────────────────────────────────────────────────────────
  {
    categoryId: 'financas',
    q: 'Como importo um extrato bancário no Cifrinho?',
    a: 'Acesse Finanças pessoais → Importar transações. O Cifrinho aceita arquivos OFX (padrão exportado pela maioria dos bancos) e CSV. Após o upload, as transações são listadas para revisão antes de serem salvas — você pode editar categorias e descrições antes de confirmar.',
  },
  {
    categoryId: 'financas',
    q: 'Quais formatos de arquivo são aceitos na importação?',
    a: 'Atualmente aceitamos OFX (Open Financial Exchange) e CSV. O OFX é o formato padrão exportado por Nubank, Itaú, Bradesco, Santander e a maioria dos bancos brasileiros. Para CSV, disponibilizamos um modelo para download dentro da tela de importação.',
  },
  {
    categoryId: 'financas',
    q: 'Como categorizo uma transação manualmente?',
    a: 'Na lista de transações, clique no ícone de lápis ao lado da transação desejada e selecione a categoria no menu. Você também pode criar categorias personalizadas em Configurações → Categorias. Transações recorrentes podem ser categorizadas em lote.',
  },
  {
    categoryId: 'financas',
    q: 'Como funciona a separação entre finanças pessoais e empresariais?',
    a: 'O Cifrinho mantém dois painéis independentes — PF (pessoa física) e PJ (pessoa jurídica). Cada um tem contas, categorias e relatórios próprios. Você pode alternar entre eles no menu lateral e também ver uma visão consolidada no painel de Visão Geral.',
  },
  {
    categoryId: 'financas',
    q: 'Posso definir metas de economia ou limite de gastos?',
    a: 'Sim. Em Finanças pessoais → Metas, você cria objetivos com valor alvo e prazo. Em Categorias você pode definir um orçamento mensal por categoria — o Cifrinho envia uma notificação quando você se aproximar do limite.',
  },
  {
    categoryId: 'financas',
    q: 'O Cifrinho funciona no celular?',
    a: 'A versão web é totalmente responsiva e funciona bem em qualquer navegador mobile. Apps nativos para iOS e Android estão no roadmap e devem ser lançados em 2026. Você pode adicionar o site à tela inicial do seu celular como um atalho.',
  },
  {
    categoryId: 'financas',
    q: 'Posso usar o Cifrinho para MEI ou pequenas empresas?',
    a: 'Sim. O painel empresarial foi pensado para freelancers, MEIs e pequenas empresas. Você registra receitas e despesas do negócio separadamente das pessoais, acompanha o fluxo de caixa e gera relatórios simples — sem precisar de software de contabilidade separado.',
  },

  // ── Imposto de Renda ─────────────────────────────────────────────────────────
  {
    categoryId: 'ir',
    q: 'O Cifrinho faz minha declaração de IR automaticamente?',
    a: 'O Cifrinho organiza comprovantes, estima deduções e consolida seus dados fiscais ao longo do ano. A declaração oficial ainda precisa ser submetida pelo programa da Receita Federal (IRPF). Pense no Cifrinho como seu assistente que deixa tudo pronto antes de abril.',
  },
  {
    categoryId: 'ir',
    q: 'Como importo comprovantes para o IR?',
    a: 'Em Imposto de Renda → Comprovantes, você pode fazer upload de PDFs, imagens (JPG/PNG) e XMLs de notas fiscais. O Cifrinho lê os valores automaticamente e sugere a categoria de dedução correta (saúde, educação, previdência etc.) para você confirmar.',
  },
  {
    categoryId: 'ir',
    q: 'Quais deduções o Cifrinho identifica automaticamente?',
    a: 'O Cifrinho reconhece despesas médicas (consultas, exames, planos de saúde), despesas com educação (escola, faculdade, cursos), contribuições ao INSS e previdência privada (PGBL), pensão alimentícia judicial e dependentes. Os cálculos são estimativas — sempre confira com um contador.',
  },
  {
    categoryId: 'ir',
    q: 'Posso exportar os dados para preencher no programa da Receita Federal?',
    a: 'Sim. Em Imposto de Renda → Exportar, você baixa um relatório em PDF com todos os valores organizados por ficha da declaração (rendimentos, deduções, bens e direitos). É só usar esse relatório como guia ao preencher o IRPF oficialmente.',
  },
  {
    categoryId: 'ir',
    q: 'O Cifrinho funciona para declaração simplificada e completa?',
    a: 'Sim. O painel de IR mostra uma estimativa comparando as duas modalidades — simplificada (desconto padrão de 20%) e completa (deduções reais). Assim você consegue decidir qual opção é mais vantajosa antes de abrir o programa da Receita.',
  },

  // ── Gamificação ──────────────────────────────────────────────────────────────
  {
    categoryId: 'gamificacao',
    q: 'O que são XP e badges?',
    a: 'XP (pontos de experiência) são ganhos ao realizar ações financeiras saudáveis: registrar transações, cumprir metas, usar o app por dias consecutivos e manter o orçamento em dia. Ao acumular XP você sobe de nível. As badges são conquistas visuais desbloqueadas por marcos específicos, como "IR em dia" ou "7 dias seguidos".',
  },
  {
    categoryId: 'gamificacao',
    q: 'Como desbloqueo uma badge?',
    a: 'Cada badge tem um critério específico exibido na tela de Gamificação → Badges. Exemplos: "Primeiros passos" é desbloqueada ao salvar a primeira meta; "Declarante" ao finalizar os dados do IR; "Economizador" ao manter 7 dias consecutivos sem ultrapassar o orçamento. Passe o mouse sobre uma badge bloqueada para ver o que falta.',
  },
  {
    categoryId: 'gamificacao',
    q: 'Perco meu progresso se ficar alguns dias sem usar o app?',
    a: 'Seu nível e badges conquistadas nunca são perdidos. O que pode ser resetado é a contagem de sequência (streak) de uso diário — mas isso só afeta a progressão de badges específicas de sequência, não seu nível geral ou XP acumulado.',
  },
  {
    categoryId: 'gamificacao',
    q: 'Existe ranking ou competição com outros usuários?',
    a: 'Ainda não temos ranking público, mas é uma funcionalidade planejada para a integração com a Comunidade Juninhos. A ideia é que membros do squad possam comparar conquistas e se motivar mutuamente — fique de olho no roadmap.',
  },
  {
    categoryId: 'gamificacao',
    q: 'As badges têm alguma utilidade além do visual?',
    a: 'Por enquanto as badges são recompensas visuais que reconhecem seus hábitos financeiros. No futuro, planejamos integrá-las a benefícios dentro da plataforma — como descontos em planos pagos ou acesso antecipado a novos recursos para usuários com badges raras.',
  },

  // ── Planos ───────────────────────────────────────────────────────────────────
  {
    categoryId: 'planos',
    q: 'O Cifrinho é gratuito?',
    a: 'Sim. O plano gratuito permite gerenciar finanças pessoais, criar até 2 contas, importar extratos e acompanhar metas. Os planos pagos desbloqueiam gestão empresarial completa, Imposto de Renda avançado, contas ilimitadas e suporte prioritário.',
  },
  {
    categoryId: 'planos',
    q: 'Quais são os planos disponíveis e os preços?',
    a: 'Atualmente temos o plano Gratuito (para sempre), o plano Pro (para quem quer gestão pessoal completa sem limites) e o plano Business (para quem precisa de gestão PF + PJ integrada e recursos de IR avançados). Os valores atualizados ficam na página de Planos dentro do app.',
  },
  {
    categoryId: 'planos',
    q: 'Como faço upgrade ou downgrade do meu plano?',
    a: 'Vá em Configurações → Plano atual. Lá você pode fazer upgrade com pagamento imediato (o valor é proporcional ao período restante) ou downgrade ao final do ciclo de cobrança. Ao fazer downgrade, seus dados são preservados — apenas os recursos exclusivos do plano superior são desativados.',
  },
  {
    categoryId: 'planos',
    q: 'Como cancelo meu plano pago?',
    a: 'Acesse Configurações → Plano atual → Cancelar assinatura. O acesso aos recursos pagos continua até o fim do período já pago. Não fazemos cobrança após o cancelamento e não há multa. Seus dados permanecem acessíveis no plano gratuito após o cancelamento.',
  },
  {
    categoryId: 'planos',
    q: 'Consigo reembolso se não gostar do plano?',
    a: 'Oferecemos garantia de 7 dias para novos assinantes. Se dentro desse prazo você não ficar satisfeito, entre em contato com suporte@cifrinho.app que processamos o reembolso integral sem perguntas. Após 7 dias, não fazemos reembolsos parciais.',
  },
]

export default function AjudaPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function handleCategoryClick(id: string) {
    const next = activeCategory === id ? null : id
    setActiveCategory(next)
    setQuery('')
    setOpenIndex(null)
  }

  function clearFilters() {
    setActiveCategory(null)
    setQuery('')
    setOpenIndex(null)
  }

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)

  const faqCountByCategory = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, FAQS.filter((f) => f.categoryId === c.id).length])
  )

  const filteredArticles = TOP_ARTICLES.filter((a) => {
    if (activeCategory) return a.categoryId === activeCategory
    return true
  })

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCategory = activeCategory ? f.categoryId === activeCategory : true
    const matchesQuery =
      query.trim() === '' ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  const isFiltered = activeCategory !== null || query.trim() !== ''
  const hideStaticSections = query.trim() !== ''

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: '#0F172A', color: '#F9FAFB' }}>

      {/* NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl" style={{ borderColor: '#1F2937' }}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/cifrinho-mascot.png" alt="Cifrinho" width={36} height={36} className="rounded-full" />
            <span className="text-lg font-extrabold tracking-tight" style={{ color: '#F9FAFB' }}>Cifrinho</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#9CA3AF' }}>Início</Link>
            <Link href="/legal" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#9CA3AF' }}>Legal</Link>
          </div>
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-bold transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#10B981', color: '#0F172A' }}
          >
            Entrar
          </Link>
        </nav>
      </header>

      {/* HERO + BUSCA */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.15), transparent 60%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(31,41,55,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,41,55,0.4) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
          }}
        />

        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 md:py-24">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Central de Ajuda</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: '#F9FAFB' }}>
            Como podemos ajudar?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg" style={{ color: '#9CA3AF' }}>
            Busque artigos, explore categorias ou confira as perguntas mais frequentes.
          </p>

          {/* campo de busca */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: '#9CA3AF' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveCategory(null); setOpenIndex(null) }}
              placeholder="Buscar artigos e perguntas frequentes…"
              className="w-full rounded-xl border py-4 pl-12 pr-4 text-base outline-none transition-all"
              style={{
                borderColor: query ? '#10B981' : '#1F2937',
                backgroundColor: '#111827',
                color: '#F9FAFB',
                boxShadow: query ? '0 0 0 3px rgba(16,185,129,0.15)' : 'none',
              }}
            />
            {query && (
              <button
                onClick={clearFilters}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                style={{ color: '#9CA3AF' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* chips rápidos */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {['Senha', 'Importar OFX', 'Badge', 'IR', 'MEI', 'Cancelar conta'].map((chip) => (
              <button
                key={chip}
                onClick={() => { setQuery(chip); setActiveCategory(null); setOpenIndex(null) }}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:border-emerald-500/50 hover:text-white"
                style={{ borderColor: '#1F2937', backgroundColor: '#111827', color: '#9CA3AF' }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      {!hideStaticSections && (
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: '#F9FAFB' }}>Explorar por categoria</h2>
            {activeCategory && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:text-white"
                style={{ borderColor: activeCat?.color + '50', color: activeCat?.color, backgroundColor: activeCat?.bg }}
              >
                {activeCat?.label}
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="relative flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-200 hover:-translate-y-1"
                  style={{
                    borderColor: isActive ? cat.color : '#1F2937',
                    backgroundColor: isActive ? cat.bg : '#111827',
                    boxShadow: isActive ? `0 0 0 1px ${cat.color}40` : 'none',
                  }}
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-lg"
                    style={{ backgroundColor: isActive ? cat.color + '25' : cat.bg, color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#F9FAFB' }}>{cat.label}</p>
                    <p className="mt-0.5 text-xs" style={{ color: '#9CA3AF' }}>{faqCountByCategory[cat.id]} perguntas</p>
                  </div>
                  {isActive && (
                    <span
                      className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: cat.color, color: '#0F172A' }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* ARTIGOS MAIS ACESSADOS */}
      {!hideStaticSections && (
        <section className="border-y py-16" style={{ borderColor: '#1F2937', backgroundColor: 'rgba(17,24,39,0.4)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: '#F9FAFB' }}>
                {activeCategory ? `Artigos — ${activeCat?.label}` : 'Artigos mais acessados'}
              </h2>
              <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>esta semana</span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredArticles.map((article, i) => (
                  <a
                    key={article.title}
                    href="#"
                    className="group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-px"
                    style={{ borderColor: '#1F2937', backgroundColor: '#111827' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#374151' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1F2937' }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                      style={{ backgroundColor: article.color + '15', color: article.color }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold transition-colors group-hover:text-white" style={{ color: '#F9FAFB' }}>
                        {article.title}
                      </p>
                      <p className="mt-0.5 text-xs" style={{ color: '#9CA3AF' }}>
                        {article.category} · {article.views.toLocaleString('pt-BR')} visualizações
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: '#9CA3AF' }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                Nenhum artigo em destaque nesta categoria ainda.
              </p>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>FAQ</p>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: '#F9FAFB' }}>
            {query.trim()
              ? `Resultados para "${query}"`
              : activeCategory
              ? `Perguntas — ${activeCat?.label}`
              : 'Perguntas frequentes'}
          </h2>
          {isFiltered && (
            <p className="mt-2 text-sm" style={{ color: '#9CA3AF' }}>
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          )}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: isOpen ? '#10B98140' : '#1F2937',
                    backgroundColor: isOpen ? 'rgba(16,185,129,0.05)' : '#111827',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-semibold leading-snug" style={{ color: '#F9FAFB' }}>
                      {faq.q}
                    </span>
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: isOpen ? '#10B981' : '#1F2937',
                        color: isOpen ? '#0F172A' : '#9CA3AF',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t px-6 pb-5 pt-4" style={{ borderColor: '#10B98130' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border p-12 text-center" style={{ borderColor: '#1F2937', backgroundColor: '#111827' }}>
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full" style={{ backgroundColor: '#1F2937' }}>
              <svg className="h-6 w-6" style={{ color: '#9CA3AF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="font-semibold" style={{ color: '#F9FAFB' }}>Nenhum resultado encontrado</p>
            <p className="mt-1 text-sm" style={{ color: '#9CA3AF' }}>Tente outros termos ou entre em contato com a gente.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#10B981' }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      {/* CTA RODAPÉ */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div
          className="relative overflow-hidden rounded-2xl border p-10 text-center sm:p-14"
          style={{ borderColor: '#1F2937', backgroundColor: '#111827' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.12), transparent 60%)' }}
          />
          <div className="relative">
            <div
              className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full"
              style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10B981' }}
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: '#F9FAFB' }}>
              Não encontrou o que precisava?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base" style={{ color: '#9CA3AF' }}>
              Nossa equipe está pronta para ajudar. Respondemos em até 2 dias úteis.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:suporte@cifrinho.app"
                className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#10B981', color: '#0F172A', boxShadow: '0 16px 32px -8px rgba(16,185,129,0.25)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Fale com a gente
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a
                href="mailto:suporte@cifrinho.app"
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: '#9CA3AF' }}
              >
                suporte@cifrinho.app
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ SIMPLES */}
      <footer className="border-t" style={{ borderColor: '#1F2937' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm sm:flex-row sm:px-8" style={{ color: '#9CA3AF' }}>
          <div className="flex items-center gap-2.5">
            <Image src="/cifrinho-mascot.png" alt="" width={28} height={28} className="rounded-full" />
            <span>© 2026 Cifrinho · Uso educacional</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="transition-colors hover:text-white">Início</Link>
            <Link href="/legal" className="transition-colors hover:text-white">Legal</Link>
            <a href="mailto:suporte@cifrinho.app" className="transition-colors hover:text-white">Contato</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
