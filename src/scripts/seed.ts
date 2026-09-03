import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../payload.config'

dotenv.config()

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '../..')
const productsDir = path.join(root, 'public/products')

const GROUPS = [
  {
    slug: 'sacolas',
    title: 'Sacolas',
    description:
      'Sacolas plásticas, em TNT e em algodão, produzidas e personalizadas com a identidade da sua marca.',
  },
  {
    slug: 'etiquetas',
    title: 'Etiquetas',
    description:
      'Etiquetas adesivas, emborrachadas, bordadas e em DTF para roupas, acessórios e embalagens.',
  },
  {
    slug: 'tags-e-acessorios',
    title: 'Tags & Acessórios',
    description:
      'Tags, chaveiros, lacres de segurança, acabamentos metálicos e demais itens complementares.',
  },
  {
    slug: 'embalagens',
    title: 'Embalagens',
    description:
      'Caixas personalizadas e papel de seda para finalizar a experiência de compra com sofisticação.',
  },
]

const CATEGORIES = [
  {
    slug: 'sacolas-alca-vazada',
    title: 'Sacolas Alça Vazada',
    group: 'sacolas',
    description:
      'Sacolas plásticas com alça vazada, ideais para lojas de moda e varejo. Resistentes e impressas com a arte da sua marca.',
  },
  {
    slug: 'sacolas-alca-fita',
    title: 'Sacolas Alça Fita',
    group: 'sacolas',
    description:
      'Sacolas plásticas com alça em fita, acabamento reforçado e ótimo custo-benefício para o dia a dia da loja.',
  },
  {
    slug: 'sacolas-alca-cadeado',
    title: 'Sacolas Alça Cadeado',
    group: 'sacolas',
    description:
      'Modelo com alça em formato de cadeado, leve e prático, muito utilizado em confecções e franquias.',
  },
  {
    slug: 'sacolas-tnt',
    title: 'Sacolas em TNT',
    group: 'sacolas',
    description:
      'Sacolas em TNT nas cores e tamanhos que sua marca precisar, com impressão de alta durabilidade.',
  },
  {
    slug: 'sacolas-algodao',
    title: 'Sacolas de Algodão',
    group: 'sacolas',
    description:
      'Sacolas de algodão cru, sustentáveis e versáteis, com acabamento premium para marcas que valorizam a experiência.',
  },
  {
    slug: 'etiquetas-adesivas',
    title: 'Etiquetas Adesivas',
    group: 'etiquetas',
    description:
      'Etiquetas adesivas personalizadas para embalagens, cartões e materiais de identificação da sua marca.',
  },
  {
    slug: 'etiquetas-emborrachadas',
    title: 'Etiquetas Emborrachadas',
    group: 'etiquetas',
    description:
      'Etiquetas em silicone emborrachado, com relevo e alta definição de cor — acabamento de moda premium.',
  },
  {
    slug: 'etiquetas-dtf',
    title: 'Etiquetas em DTF',
    group: 'etiquetas',
    description:
      'Etiquetas em DTF (transfer digital), com cores vibrantes e ótima aderência em tecidos diversos.',
  },
  {
    slug: 'etiquetas-bordadas',
    title: 'Etiquetas Bordadas',
    group: 'etiquetas',
    description:
      'Etiquetas bordadas com acabamento sofisticado, ideais para marcas de moda que buscam requinte nos detalhes.',
  },
  {
    slug: 'tags',
    title: 'Tags Personalizadas',
    group: 'tags-e-acessorios',
    description:
      'Tags em papel e material especial, com recortes exclusivos para valorizar a apresentação do seu produto.',
  },
  {
    slug: 'tags-brinco',
    title: 'Tags para Brincos',
    group: 'tags-e-acessorios',
    description:
      'Cartelas e tags específicas para exposição e venda de brincos e pequenos acessórios.',
  },
  {
    slug: 'chaveiros',
    title: 'Chaveiros Personalizados',
    group: 'tags-e-acessorios',
    description:
      'Chaveiros bordados e emborrachados, ótimos como brinde ou item complementar da sua marca.',
  },
  {
    slug: 'lacres-seguranca',
    title: 'Lacres de Segurança',
    group: 'tags-e-acessorios',
    description:
      'Lacres de segurança nas cores da sua marca, para reforçar a proteção e a confiança na entrega.',
  },
  {
    slug: 'acabamentos-metalicos',
    title: 'Acabamentos Metálicos',
    group: 'tags-e-acessorios',
    description:
      'Rebites, botões e acabamentos metálicos personalizados, com gravação exclusiva da sua marca.',
  },
  {
    slug: 'papel-seda',
    title: 'Papel de Seda',
    group: 'embalagens',
    description:
      'Papel de seda personalizado para embrulhar produtos com delicadeza e reforçar a identidade visual.',
  },
  {
    slug: 'caixas',
    title: 'Caixas Personalizadas',
    group: 'embalagens',
    description:
      'Caixas de papelão em diversos tamanhos, personalizadas para envio e apresentação dos seus produtos.',
  },
]

function mimeFromName(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

function isBlobUrl(url: string | null | undefined) {
  return Boolean(url && url.includes('blob.vercel-storage.com'))
}

async function findBySlug(payload, collection: string, slug: string) {
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  return result.docs[0] || null
}

async function uploadFile(payload, absPath: string, alt: string, filename: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })

  const buffer = fs.readFileSync(absPath)
  const file = {
    data: buffer,
    mimetype: mimeFromName(filename),
    name: filename,
    size: buffer.length,
  }

  const doc = existing.docs[0]
  if (doc) {
    if (isBlobUrl(doc.url)) return doc
    return payload.update({
      collection: 'media',
      id: doc.id,
      data: { alt },
      file,
    })
  }

  return payload.create({
    collection: 'media',
    data: { alt },
    file,
  })
}

async function listProductImages(slug: string) {
  const dir = path.join(productsDir, slug)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => path.join(dir, file))
}

async function seed() {
  const usePostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)
  if (usePostgres && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      'POSTGRES_URL definido sem BLOB_READ_WRITE_TOKEN.\n' +
        'Em produção as fotos vão para o Vercel Blob — configure o token antes de rodar o seed.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@rmembalagens.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123'

  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (!users.docs[0]) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
      },
    })
    console.log(`Usuário admin criado: ${adminEmail}`)
  }

  const hero = await uploadFile(
    payload,
    path.join(root, 'public/hero.jpg'),
    'Hero RM Embalagens',
    'hero.jpg'
  )

  const aboutImage = await uploadFile(
    payload,
    path.join(root, 'src/assets/img/inicial/sacolas/IMG-20220726-WA0040.jpg'),
    'Produção RM Embalagens',
    'sobre-producao.jpg'
  )

  const groupIds: Record<string, number | string> = {}
  for (const [index, group] of GROUPS.entries()) {
    const existing = await findBySlug(payload, 'product-groups', group.slug)
    const saved = existing
      ? await payload.update({
          collection: 'product-groups',
          id: existing.id,
          data: { ...group, order: index },
        })
      : await payload.create({
          collection: 'product-groups',
          data: { ...group, order: index },
        })
    groupIds[group.slug] = saved.id
    console.log(`Grupo: ${group.title}`)
  }

  const firstImageBySlug: Record<string, number | string> = {}

  for (const [index, category] of CATEGORIES.entries()) {
    const files = await listProductImages(category.slug)
    const galleryIds: Array<number | string> = []

    for (const [fileIndex, filePath] of files.entries()) {
      const ext = path.extname(filePath)
      const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
      const media = await uploadFile(
        payload,
        filePath,
        `${category.title} — foto ${fileIndex + 1}`,
        filename
      )
      galleryIds.push(media.id)
      if (fileIndex === 0) firstImageBySlug[category.slug] = media.id
    }

    const existing = await findBySlug(payload, 'product-categories', category.slug)
    const data = {
      title: category.title,
      slug: category.slug,
      description: category.description,
      group: groupIds[category.group],
      gallery: galleryIds,
      order: index,
    }

    if (existing) {
      await payload.update({ collection: 'product-categories', id: existing.id, data })
    } else {
      await payload.create({ collection: 'product-categories', data })
    }
    console.log(`Categoria: ${category.title} (${galleryIds.length} fotos)`)
  }

  const proofSlugs = ['sacolas-algodao', 'etiquetas-bordadas', 'chaveiros', 'lacres-seguranca']
  const proofImages = proofSlugs.map((slug) => firstImageBySlug[slug]).filter(Boolean)

  await payload.updateGlobal({
    slug: 'site',
    data: {
      defaultTitle: 'RM Embalagens — Embalagens e Etiquetas Personalizadas',
      defaultDescription:
        'Fabricante e distribuidora de sacolas, etiquetas, tags e acabamentos personalizados para marcas em todo o Brasil.',
      keywords:
        'embalagens personalizadas, sacolas personalizadas, etiquetas, sacolas tnt, tags, chaveiros personalizados, rm embalagens, campo grande rj',
      phone: '(21) 96428-2763',
      whatsapp: '5521964282763',
      instagramUrl: 'https://www.instagram.com/rmembalagens/',
      instagramHandle: '@rmembalagens',
      address: 'Campo Grande — Rio de Janeiro, RJ',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58809.48443130842!2d-43.61131257623399!3d-22.891496795245867!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be17999363715%3A0x46c3f27867ad9332!2sCampo%20Grande%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1662176077455!5m2!1spt-BR!2sbr',
      catalogPageEyebrow: 'Catálogo',
      catalogPageTitle: 'Nossos produtos',
      catalogPageLead:
        'Explore nossas linhas de produção por categoria. Cada item pode ser personalizado com as cores, materiais e a arte da sua marca.',
      catalogSeoTitle: 'Produtos | RM Embalagens',
      catalogSeoDescription:
        'Catálogo completo de sacolas, etiquetas, tags e acabamentos personalizados da RM Embalagens.',
      footerBlurb:
        'Fabricante e distribuidora de embalagens, etiquetas e acessórios personalizados para marcas em todo o Brasil.',
      brandName: 'RM Embalagens',
      navHome: 'Início',
      navProducts: 'Produtos',
      navAbout: 'Sobre',
      navContact: 'Contato',
      headerCta: 'Solicitar orçamento',
      footerProducts: 'Produtos',
      footerInstitutional: 'Institucional',
      footerContact: 'Atendimento',
      footerAbout: 'Sobre a empresa',
      footerContactLink: 'Contato',
      footerInstagram: 'Instagram',
      footerCopyright: '© {year} RM Embalagens — Fabricante e distribuidora nacional',
      ctaWhatsapp: 'Falar no WhatsApp',
      ctaInstagram: 'Ver no Instagram',
      productOrder: 'Encomendar este produto',
      productBack: 'Voltar ao catálogo',
      relatedPrefix: 'Outras categorias em',
      galleryEmpty: 'Novas fotos desta categoria em breve.',
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroImage: hero.id,
      heroEyebrow: 'Fabricante e distribuidora de embalagens',
      heroTitle: 'Embalagens e etiquetas que constroem a identidade da sua marca',
      heroAccent: 'identidade',
      heroLead:
        'Produzimos sacolas, etiquetas, tags e acabamentos personalizados para marcas que valorizam apresentação, consistência e qualidade em cada detalhe.',
      heroPrimaryLabel: 'Ver catálogo completo',
      heroSecondaryLabel: 'Solicitar orçamento',
      stats: [
        { value: '16', label: 'linhas de produto' },
        { value: '100%', label: 'personalização de arte' },
        { value: 'BR', label: 'envio para todo o país' },
      ],
      proofLabel: 'Prova fotográfica — 01',
      proofImages,
      differentiatorsEyebrow: 'Por que a RM Embalagens',
      differentiatorsTitle: 'Estrutura e cuidado em cada etapa do processo',
      differentiators: [
        {
          icon: 'fa-boxes-alt',
          title: 'Produção própria',
          description:
            'Acompanhamos cada etapa da fabricação, com controle de qualidade e prazos previsíveis.',
        },
        {
          icon: 'fa-swatchbook',
          title: 'Personalização completa',
          description:
            'Cores, materiais e artes exclusivas — cada pedido é desenvolvido para a identidade da marca.',
        },
        {
          icon: 'fa-truck',
          title: 'Envio para todo o Brasil',
          description:
            'Atendemos confecções, e-commerces e negócios locais em todas as regiões do país.',
        },
        {
          icon: 'fa-comments-alt',
          title: 'Atendimento direto',
          description:
            'Suporte próximo do orçamento à entrega, sem intermediários, via WhatsApp e Instagram.',
        },
      ],
      catalogEyebrow: 'Catálogo',
      catalogTitle: 'Uma linha completa de embalagens e etiquetas',
      catalogLead:
        'Da sacola ao acabamento final, produzimos os itens que acompanham a experiência de compra da sua marca.',
      catalogButtonLabel: 'Explorar catálogo completo',
      aboutEyebrow: 'Quem somos',
      aboutTitle: 'Uma fabricante próxima de cada cliente',
      aboutText:
        'A RM Embalagens fabrica, vende e distribui embalagens, etiquetas, envelopes, lacres e demais itens de identidade visual. Trabalhamos com confecções, e-commerces e negócios de todos os portes, unindo produção própria a um acompanhamento próximo em cada pedido.',
      aboutImage: aboutImage.id,
      aboutLinkLabel: 'Conheça nossa história',
      ctaEyebrow: 'Vamos conversar',
      ctaTitle: 'Pronto para elevar a apresentação da sua marca?',
      ctaText:
        'Envie sua ideia, quantidade e prazo — retornamos com um orçamento personalizado para o seu projeto.',
      ctaWhatsapp: 'Falar no WhatsApp',
      ctaInstagram: 'Ver no Instagram',
    },
  })

  await payload.updateGlobal({
    slug: 'about',
    data: {
      seoTitle: 'Sobre | RM Embalagens',
      seoDescription:
        'Conheça a RM Embalagens: fabricante e distribuidora de embalagens, etiquetas e acessórios personalizados.',
      eyebrow: 'Sobre a empresa',
      title: 'Uma fabricante dedicada à identidade de cada marca',
      lead: 'A RM Embalagens fabrica, vende e distribui embalagens, etiquetas, envelopes, lacres e demais itens com a cara da sua marca — unindo produção própria a um acompanhamento próximo em cada pedido.',
      image: aboutImage.id,
      whoTitle: 'Quem somos',
      whoText:
        'Somos uma fabricante, vendedora e distribuidora de embalagens, etiquetas, envelopes, lacres e outros produtos personalizados com a identidade da sua marca.',
      businessTitle: 'Nosso negócio',
      businessText:
        'Oferecemos todo tipo de material gráfico e visual para publicidade e apresentação de produtos, atendendo confecções, e-commerces e negócios de todos os portes em todo o território nacional.',
      clientsTitle: 'Nossos clientes',
      clientsText:
        'Trabalhamos com marcas de moda, beleza e varejo que buscam consistência visual em cada etapa da experiência de compra.',
      instagramCta: 'Confira exemplos no nosso Instagram.',
      valuesEyebrow: 'Como trabalhamos',
      valuesTitle: 'Princípios que guiam cada entrega',
      values: [
        {
          title: 'Qualidade em cada lote',
          description:
            'Materiais selecionados e processos de produção acompanhados de perto, do primeiro ao último item.',
        },
        {
          title: 'Personalização real',
          description:
            'Cada arte é desenvolvida para a marca do cliente — sem soluções genéricas ou modelos limitados.',
        },
        {
          title: 'Relacionamento próximo',
          description:
            'Atendimento direto, sem intermediários, para que cada pedido seja acompanhado de perto.',
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      seoTitle: 'Contato | RM Embalagens',
      seoDescription:
        'Fale com a RM Embalagens pelo WhatsApp ou Instagram e solicite um orçamento personalizado.',
      eyebrow: 'Contato',
      title: 'Fale com a nossa equipe',
      lead: 'Estamos à disposição para entender o seu projeto e apresentar a melhor solução em embalagens e etiquetas para a sua marca.',
      stepsEyebrow: 'Como funciona',
      stepsTitle: 'Do orçamento à entrega em três passos',
      steps: [
        {
          title: 'Conte sua ideia',
          description:
            'Envie o produto desejado, quantidade estimada e referências de arte, se houver.',
        },
        {
          title: 'Receba o orçamento',
          description: 'Retornamos com valores, prazos de produção e opções de personalização.',
        },
        {
          title: 'Acompanhe a produção',
          description:
            'Após a confirmação, acompanhamos o pedido até a entrega em todo o Brasil.',
        },
      ],
      ctaLabel: 'Iniciar conversa no WhatsApp',
      whatsappTitle: 'WhatsApp',
      instagramTitle: 'Instagram',
      addressTitle: 'Localização',
    },
  })

  console.log('\nSeed concluído.')
  console.log(`Admin: ${adminEmail}`)
  console.log(`Senha: ${adminPassword}`)
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
