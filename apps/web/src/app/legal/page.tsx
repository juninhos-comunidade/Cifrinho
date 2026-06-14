import Link from 'next/link'
import Image from 'next/image'

const sections = [
  {
    id: 'privacidade',
    label: 'Privacidade',
    color: '#21C25E',
    bg: 'rgba(33,194,94,0.12)',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Política de Privacidade',
    updated: '01 de junho de 2026',
    content: [
      {
        heading: 'Quais dados coletamos',
        body: `Coletamos apenas os dados estritamente necessários para o funcionamento do Cifrinho:
• **Dados de cadastro:** nome, endereço de e-mail e senha (armazenada com hash bcrypt).
• **Dados financeiros:** transações, categorias, metas e saldos que você registra manualmente no app.
• **Dados fiscais:** informações inseridas na seção de Imposto de Renda (renda, deduções, comprovantes).
• **Dados de uso:** páginas visitadas, funcionalidades utilizadas e eventuais erros (logs técnicos anônimos).
Não coletamos dados de geolocalização, contatos do celular, câmera ou microfone.`,
      },
      {
        heading: 'Como usamos seus dados',
        body: `Seus dados são usados exclusivamente para:
• Exibir suas finanças dentro do app de forma consolidada.
• Calcular estimativas de Imposto de Renda e relatórios pessoais/empresariais.
• Enviar notificações que você habilitou (alertas de metas, prazos fiscais).
• Melhorar a plataforma com base em métricas de uso agregadas e anônimas.
Nunca vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais.`,
      },
      {
        heading: 'Compartilhamento de dados',
        body: `Seus dados podem ser acessados por:
• **Nossa infraestrutura:** servidores em nuvem com criptografia em repouso e em trânsito (TLS 1.3+).
• **Obrigação legal:** somente se exigido por autoridade judicial competente mediante ordem formal.
Não integramos com open banking, corretoras ou bancos sem seu consentimento explícito e ação manual.`,
      },
      {
        heading: 'Retenção e exclusão',
        body: `Você pode solicitar a exclusão completa da sua conta e dados a qualquer momento em Configurações → Zona de Risco → Excluir conta. Os dados são removidos dos nossos sistemas em até 30 dias. Logs de segurança podem ser retidos por até 90 dias após a exclusão para fins de auditoria.`,
      },
      {
        heading: 'Seus direitos (LGPD)',
        body: `Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:
• Acessar, corrigir e exportar seus dados.
• Revogar consentimentos concedidos.
• Solicitar a exclusão de dados pessoais.
• Ser informado sobre com quem seus dados foram compartilhados.
Para exercer qualquer um desses direitos, entre em contato via e-mail: privacidade@cifrinho.app`,
      },
    ],
  },
  {
    id: 'termos',
    label: 'Termos',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    title: 'Termos de Uso',
    updated: '01 de junho de 2026',
    content: [
      {
        heading: 'Aceitação dos termos',
        body: `Ao criar uma conta no Cifrinho, você concorda com estes Termos de Uso. Se não concordar, não utilize o serviço. O Cifrinho é um projeto educacional desenvolvido pela Comunidade Juninhos e não substitui serviços de contabilidade, assessoria financeira ou consultoria fiscal profissional.`,
      },
      {
        heading: 'Uso permitido',
        body: `Você pode usar o Cifrinho para:
• Organizar suas finanças pessoais e empresariais.
• Registrar e categorizar transações.
• Acompanhar metas financeiras.
• Preparar dados para sua declaração de Imposto de Renda.
Você é responsável pela veracidade das informações inseridas e pelo uso adequado dos relatórios gerados.`,
      },
      {
        heading: 'Uso proibido',
        body: `É vedado:
• Usar o app para atividades ilegais, lavagem de dinheiro ou fraude fiscal.
• Tentar acessar contas de outros usuários.
• Realizar engenharia reversa, scraping ou extração automatizada de dados.
• Revender ou sublicenciar o serviço sem autorização.
Violações podem resultar em suspensão imediata da conta.`,
      },
      {
        heading: 'Isenção de responsabilidade',
        body: `O Cifrinho é uma ferramenta de organização. Os cálculos de Imposto de Renda são **estimativas** baseadas nas informações inseridas — não constituem declaração oficial nem substituem o programa da Receita Federal (IRPF). Sempre valide os dados com um contador antes de submeter sua declaração.`,
      },
      {
        heading: 'Modificações no serviço',
        body: `Podemos alterar, suspender ou encerrar funcionalidades com aviso prévio de 30 dias por e-mail. Em caso de encerramento do serviço, disponibilizaremos exportação completa dos seus dados por no mínimo 60 dias.`,
      },
      {
        heading: 'Lei aplicável',
        body: `Estes termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de São Paulo/SP para resolução de conflitos, sem prejuízo de resolução por mediação ou arbitragem.`,
      },
    ],
  },
  {
    id: 'seguranca',
    label: 'Segurança',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    title: 'Segurança',
    updated: '01 de junho de 2026',
    content: [
      {
        heading: 'Como protegemos seus dados',
        body: `Adotamos as seguintes medidas técnicas e organizacionais:
• **Criptografia em trânsito:** toda comunicação usa TLS 1.3.
• **Criptografia em repouso:** dados sensíveis armazenados com AES-256.
• **Senhas:** nunca armazenamos senhas em texto claro — usamos bcrypt com salt único por usuário.
• **Tokens JWT:** com expiração curta e renovação automática via refresh token em cookie HttpOnly.
• **Princípio do menor privilégio:** cada serviço interno acessa apenas os dados de que precisa.`,
      },
      {
        heading: 'Autenticação e sessão',
        body: `• Login protegido contra força bruta com rate limiting (máx. 10 tentativas / 15 min por IP).
• Sessões expiram automaticamente após inatividade.
• Ao fazer logout, todos os tokens são invalidados no servidor.
• Em breve: autenticação em dois fatores (2FA) via TOTP (Google Authenticator, Authy).`,
      },
      {
        heading: 'Infraestrutura',
        body: `• Servidores em provedores de nuvem com certificações SOC 2 e ISO 27001.
• Backups automáticos diários com retenção de 30 dias.
• Monitoramento 24/7 com alertas de anomalia.
• Ambientes de produção e desenvolvimento estritamente separados.`,
      },
      {
        heading: 'Divulgação responsável (Bug Bounty)',
        body: `Encontrou uma vulnerabilidade? Agradecemos a divulgação responsável. Envie os detalhes para seguranca@cifrinho.app com:
• Descrição do problema e passos para reprodução.
• Impacto potencial estimado.
• Sugestão de correção (opcional).
Respondemos em até 72 horas e não tomamos ações legais contra pesquisadores que seguem este processo.`,
      },
      {
        heading: 'Incidentes de segurança',
        body: `Em caso de vazamento ou incidente que afete seus dados, notificaremos você por e-mail em até 72 horas após a confirmação do incidente, conforme exigido pela LGPD. A notificação incluirá: natureza do incidente, dados afetados, medidas tomadas e recomendações para você.`,
      },
    ],
  },
]

export default function LegalPage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: '#0F172A', color: '#F9FAFB' }}
    >
      {/* NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/cifrinho-mascot.png"
              alt="Cifrinho"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-lg font-extrabold tracking-tight text-ink">Cifrinho</span>
          </Link>
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-bold text-bg transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#21C25E' }}
          >
            Entrar
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-bold uppercase tracking-widest"
            style={{ color: '#21C25E' }}
          >
            Legal
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Transparência total
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-mute">
            Aqui explicamos claramente como usamos seus dados, quais são as regras do serviço e como
            mantemos tudo seguro.
          </p>
          {/* nav âncoras */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-mute transition-colors hover:text-ink"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Seções */}
        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              {/* cabeçalho da seção */}
              <div
                className="mb-8 flex items-center gap-4 rounded-xl border border-line p-6"
                style={{ backgroundColor: section.bg }}
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-lg"
                  style={{
                    backgroundColor: `${section.color}20`,
                    color: section.color,
                  }}
                >
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-ink">{section.title}</h2>
                  <p className="mt-0.5 text-sm text-mute">Última atualização: {section.updated}</p>
                </div>
              </div>

              {/* conteúdo */}
              <div className="space-y-6">
                {section.content.map((block) => (
                  <div key={block.heading} className="rounded-lg border border-line bg-card p-6">
                    <h3 className="mb-3 text-base font-bold text-ink">{block.heading}</h3>
                    <div className="text-sm leading-relaxed text-mute whitespace-pre-line">
                      {block.body.split('**').map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="font-semibold text-ink">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contato */}
        <div className="mt-16 rounded-xl border border-line bg-card p-8 text-center">
          <p className="text-lg font-bold text-ink">Dúvidas sobre privacidade ou segurança?</p>
          <p className="mt-2 text-sm text-mute">Nossa equipe responde em até 3 dias úteis.</p>
          <a
            href="mailto:privacidade@cifrinho.app"
            className="mt-5 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-bg transition-all hover:opacity-90"
            style={{ backgroundColor: '#21C25E' }}
          >
            privacidade@cifrinho.app
          </a>
        </div>

        {/* voltar */}
        <div className="mt-10 text-center">
          <Link href="/" className="text-sm text-mute transition-colors hover:text-ink">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
