import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Badges
  const badges = [
    {
      name: 'Primeiro Passo',
      description: 'Cadastrou sua primeira transação',
      icon: '🎯',
      condition: 'first_transaction',
    },
    {
      name: 'Economizador',
      description: 'Terminou o mês no positivo',
      icon: '💰',
      condition: 'positive_month',
    },
    {
      name: 'Organizado',
      description: 'Categorizou 10 transações',
      icon: '📂',
      condition: 'categorized_10',
    },
    {
      name: 'Declarante',
      description: 'Acessou o módulo de Imposto de Renda',
      icon: '📋',
      condition: 'income_tax_access',
    },
    {
      name: 'Empresário',
      description: 'Cadastrou sua primeira transação empresarial',
      icon: '🏢',
      condition: 'first_business_transaction',
    },
  ]

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    })
  }

  console.log(`✅ ${badges.length} badges criados`)
  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
