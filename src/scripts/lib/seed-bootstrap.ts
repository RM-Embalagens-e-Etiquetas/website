import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Payload } from 'payload'

import {
  DEFAULT_CTA_TEXT,
  DEFAULT_DIFFERENTIATORS,
  DEFAULT_HOME_ABOUT_TEXT,
  DEFAULT_HOME_SECTIONS,
  DEFAULT_HOME_STATS,
} from '../../lib/copy'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = process.cwd()
const productsDir = path.join(root, 'public/products')

function siteBase() {
  return (process.env.NEXT_PUBLIC_SERVER_URL || 'https://rm-embalagens.vercel.app').replace(/\/$/, '')
}

async function loadSeedBuffer(localPath: string, publicPath: string) {
  if (fs.existsSync(localPath)) {
    return fs.readFileSync(localPath)
  }

  const res = await fetch(`${siteBase()}${publicPath}`)
  if (!res.ok) {
    throw new Error(`Arquivo não encontrado: ${localPath} nem ${publicPath} (${res.status})`)
  }
  return Buffer.from(await res.arrayBuffer())
}

export const CATALOG_GROUPS = [
  {
    slug: 'sacolas',
    title: 'Sacolas',
    description: 'Sacolas plásticas, em TNT e em algodão, produzidas e personalizadas com a identidade da sua marca.',
  },
  {
    slug: 'etiquetas',
    title: 'Etiquetas',
    description: 'Etiquetas adesivas, emborrachadas, bordadas e em DTF para roupas, acessórios e embalagens.',
  },
  {
    slug: 'tags-e-acessorios',
    title: 'Tags & Acessórios',
    description: 'Tags, chaveiros, lacres de segurança, acabamentos metálicos e demais itens complementares.',
  },
  {
    slug: 'embalagens',
    title: 'Embalagens',
    description: 'Caixas personalizadas e papel de seda para finalizar a experiência de compra com sofisticação.',
  },
]

export const CATALOG_CATEGORIES = [
  {
    slug: 'sacolas-alca-vazada',
    title: 'Sacolas Alça Vazada',
    group: 'sacolas',
    description: 'Sacolas plásticas com alça vazada, ideais para lojas de moda e varejo. Resistentes e impressas com a arte da sua marca.',
  },
  {
    slug: 'sacolas-alca-fita',
    title: 'Sacolas Alça Fita',
    group: 'sacolas',
    description: 'Sacolas plásticas com alça em fita, acabamento reforçado e ótimo custo-benefício para o dia a dia da loja.',
  },
  {
    slug: 'sacolas-alca-cadeado',
    title: 'Sacolas Alça Cadeado',
    group: 'sacolas',
    description: 'Modelo com alça em formato de cadeado, leve e prático, muito utilizado em confecções e franquias.',
  },
  {
    slug: 'sacolas-tnt',
    title: 'Sacolas em TNT',
    group: 'sacolas',
    description: 'Sacolas em TNT nas cores e tamanhos que sua marca precisar, com impressão de alta durabilidade.',
  },
  {
    slug: 'sacolas-algodao',
    title: 'Sacolas de Algodão',
    group: 'sacolas',
    description: 'Sacolas de algodão cru, sustentáveis e versáteis, com acabamento premium para marcas que valorizam a experiência.',
  },
  {
    slug: 'etiquetas-adesivas',
    title: 'Etiquetas Adesivas',
    group: 'etiquetas',
    description: 'Etiquetas adesivas personalizadas para embalagens, cartões e materiais de identificação da sua marca.',
  },
  {
    slug: 'etiquetas-emborrachadas',
    title: 'Etiquetas Emborrachadas',
    group: 'etiquetas',
    description: 'Etiquetas em silicone emborrachado, com relevo e alta definição de cor — acabamento de moda premium.',
  },
  {
    slug: 'etiquetas-dtf',
    title: 'Etiquetas em DTF',
    group: 'etiquetas',
    description: 'Etiquetas em DTF (transfer digital), com cores vibrantes e ótima aderência em tecidos diversos.',
  },
  {
    slug: 'etiquetas-bordadas',
    title: 'Etiquetas Bordadas',
    group: 'etiquetas',
    description: 'Etiquetas bordadas com acabamento sofisticado, ideais para marcas de moda que buscam requinte nos detalhes.',
  },
  {
    slug: 'tags',
    title: 'Tags Personalizadas',
    group: 'tags-e-acessorios',
    description: 'Tags em papel e material especial, com recortes exclusivos para valorizar a apresentação do seu produto.',
  },
  {
    slug: 'tags-brinco',
    title: 'Tags para Brincos',
    group: 'tags-e-acessorios',
    description: 'Cartelas e tags específicas para exposição e venda de brincos e pequenos acessórios.',
  },
  {
    slug: 'chaveiros',
    title: 'Chaveiros Personalizados',
    group: 'tags-e-acessorios',
    description: 'Chaveiros bordados e emborrachados, ótimos como brinde ou item complementar da sua marca.',
  },
  {
    slug: 'lacres-seguranca',
    title: 'Lacres de Segurança',
    group: 'tags-e-acessorios',
    description: 'Lacres de segurança nas cores da sua marca, para reforçar a proteção e a confiança na entrega.',
  },
  {
    slug: 'acabamentos-metalicos',
    title: 'Acabamentos Metálicos',
    group: 'tags-e-acessorios',
    description: 'Rebites, botões e acabamentos metálicos personalizados, com gravação exclusiva da sua marca.',
  },
  {
    slug: 'papel-seda',
    title: 'Papel de Seda',
    group: 'embalagens',
    description: 'Papel de seda personalizado para embrulhar produtos com delicadeza e reforçar a identidade visual.',
  },
  {
    slug: 'caixas',
    title: 'Caixas Personalizadas',
    group: 'embalagens',
    description: 'Caixas de papelão em diversos tamanhos, personalizadas para envio e apresentação dos seus produtos.',
  },
]

const COMPANY_DEFAULTS = {
  phone: '(21) 96428-2763',
  whatsapp: '5521964282763',
  instagramUrl: 'https://www.instagram.com/rmembalagens/',
  instagramHandle: '@rmembalagens',
  address: 'Campo Grande — Rio de Janeiro, RJ',
  footerBlurb:
    'Fabricante e distribuidora de embalagens, etiquetas e acessórios personalizados para marcas em todo o Brasil.',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58809.48443130842!2d-43.61131257623399!3d-22.891496795245867!2m3!1f0!2f0!3f2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be17999363715%3A0x46c3f27867ad9332!2sCampo%20Grande%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1662176077455!5m2!1spt-BR!2sbr',
}

const PROOF_SLUGS = ['sacolas-algodao', 'etiquetas-bordadas', 'chaveiros', 'lacres-seguranca']

export type SeedMode = 'safe' | 'force' | 'media'

export type SeedOptions = {
  mode?: SeedMode
  ensureAdmin?: boolean
  /** Dev local: só 1 foto por produto para acelerar prep/E2E */
  skipHeavyMedia?: boolean
}

function mimeFromName(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

function isBlobUrl(url: string | null | undefined) {
  return Boolean(url && url.includes('blob.vercel-storage.com'))
}

async function findBySlug(payload: Payload, collection: string, slug: string) {
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  return result.docs[0] || null
}

async function globalIsPopulated(payload: Payload, slug: string) {
  const doc = await payload.findGlobal({ slug, depth: 0 })
  if (slug === 'company') return Boolean(doc?.phone)
  if (slug === 'home-config') return Boolean(doc?.sections?.length)
  return Boolean(doc)
}

export async function uploadFile(
  payload: Payload,
  absPath: string,
  alt: string,
  filename: string,
  force = false,
  publicPath?: string,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })

  const staticPath =
    publicPath ||
    (absPath.includes('/public/')
      ? absPath.slice(absPath.indexOf('/public/') + '/public'.length)
      : null)

  if (!staticPath) {
    throw new Error(`Caminho público não definido para ${filename}`)
  }

  const buffer = await loadSeedBuffer(absPath, staticPath)
  const file = {
    data: buffer,
    mimetype: mimeFromName(filename),
    name: filename,
    size: buffer.length,
  }

  const doc = existing.docs[0]
  if (doc) {
    if (!force && isBlobUrl(doc.url)) return doc
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

async function listProductImages(slug: string, limit?: number) {
  const dir = path.join(productsDir, slug)
  if (fs.existsSync(dir)) {
    const files = fs
      .readdirSync(dir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort()
      .map((file) => path.join(dir, file))
    return limit ? files.slice(0, limit) : files
  }

  const discovered: string[] = []
  const max = limit || 25
  for (let i = 1; i <= max; i += 1) {
    const publicPath = `/products/${slug}/${String(i).padStart(2, '0')}.jpg`
    const res = await fetch(`${siteBase()}${publicPath}`, { method: 'HEAD' })
    if (!res.ok) break
    discovered.push(path.join(root, 'public', publicPath.slice(1)))
  }
  return discovered
}

async function syncCategoryGallery(
  payload: Payload,
  category: (typeof CATALOG_CATEGORIES)[0],
  force: boolean,
  imageLimit?: number,
) {
  const files = await listProductImages(category.slug, imageLimit)
  const galleryIds: Array<number | string> = []

  for (const [fileIndex, filePath] of files.entries()) {
    const ext = path.extname(filePath)
    const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
    const publicPath = `/products/${category.slug}/${String(fileIndex + 1).padStart(2, '0')}${ext}`
    const media = await uploadFile(
      payload,
      filePath,
      `${category.title} — foto ${fileIndex + 1}`,
      filename,
      force,
      publicPath,
    )
    galleryIds.push(media.id)
  }

  return galleryIds
}

export async function seedBootstrap(payload: Payload, options: SeedOptions = {}) {
  const mode = options.mode || 'safe'
  const force = mode === 'force'
  const mediaOnly = mode === 'media'
  const imageLimit = options.skipHeavyMedia ? 1 : undefined

  const summary = {
    mode,
    groups: 0,
    categories: 0,
    globals: 0,
    media: 0,
    skipped: [] as string[],
  }

  if (options.ensureAdmin !== false) {
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
        data: { email: adminEmail, password: adminPassword },
      })
      console.log(`Admin criado: ${adminEmail}`)
    }
  }

  const hero = await uploadFile(
    payload,
    path.join(root, 'public/hero.jpg'),
    'Hero RM Embalagens',
    'hero.jpg',
    force,
    '/hero.jpg',
  )
  summary.media++

  const aboutImage = await uploadFile(
    payload,
    path.join(root, 'public/sobre-producao.jpg'),
    'Produção RM Embalagens',
    'sobre-producao.jpg',
    force,
    '/sobre-producao.jpg',
  )
  summary.media++

  if (!mediaOnly) {
    const groupIds: Record<string, number | string> = {}

    for (const [index, group] of CATALOG_GROUPS.entries()) {
      const existing = await findBySlug(payload, 'product-groups', group.slug)
      if (existing && !force) {
        groupIds[group.slug] = existing.id
        summary.skipped.push(`grupo:${group.slug}`)
        continue
      }

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
      summary.groups++
      console.log(`Grupo: ${group.title}`)
    }

    const firstImageBySlug: Record<string, number | string> = {}

    for (const [index, category] of CATALOG_CATEGORIES.entries()) {
      const existing = await findBySlug(payload, 'product-categories', category.slug)

      if (!existing) {
        const galleryIds = await syncCategoryGallery(payload, category, false, imageLimit)
        if (galleryIds[0]) firstImageBySlug[category.slug] = galleryIds[0]
        summary.media += galleryIds.length

        await payload.create({
          collection: 'product-categories',
          data: {
            title: category.title,
            slug: category.slug,
            description: category.description,
            group: groupIds[category.group],
            gallery: galleryIds,
            order: index,
          },
        })
        summary.categories++
        console.log(`Categoria criada: ${category.title}`)
        continue
      }

      if (force) {
        const galleryIds = await syncCategoryGallery(payload, category, true, imageLimit)
        if (galleryIds[0]) firstImageBySlug[category.slug] = galleryIds[0]
        summary.media += galleryIds.length

        await payload.update({
          collection: 'product-categories',
          id: existing.id,
          data: {
            title: category.title,
            slug: category.slug,
            description: category.description,
            group: groupIds[category.group],
            gallery: galleryIds,
            order: index,
          },
        })
        summary.categories++
        console.log(`Categoria atualizada: ${category.title}`)
      } else {
        summary.skipped.push(`categoria:${category.slug}`)
        const files = await listProductImages(category.slug)
        for (const [fileIndex, filePath] of files.entries()) {
          const ext = path.extname(filePath)
          const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
          const publicPath = `/products/${category.slug}/${String(fileIndex + 1).padStart(2, '0')}${ext}`
          await uploadFile(
            payload,
            filePath,
            `${category.title} — foto ${fileIndex + 1}`,
            filename,
            false,
            publicPath,
          )
          summary.media++
        }
      }
    }

    const proofImages = PROOF_SLUGS.map((slug) => firstImageBySlug[slug]).filter(Boolean)

    const globalsToSync = [
      { slug: 'company', data: COMPANY_DEFAULTS },
      {
        slug: 'home-config',
        data: {
          sections: DEFAULT_HOME_SECTIONS,
          heroImage: hero.id,
          stats: DEFAULT_HOME_STATS,
          proofImages,
          proofLabel: 'Prova fotográfica — 01',
          differentiators: DEFAULT_DIFFERENTIATORS,
          aboutImage: aboutImage.id,
          aboutText: DEFAULT_HOME_ABOUT_TEXT,
          ctaText: DEFAULT_CTA_TEXT,
        },
      },
    ]

    for (const global of globalsToSync) {
      const exists = await globalIsPopulated(payload, global.slug)
      if (exists && !force) {
        summary.skipped.push(`global:${global.slug}`)
        continue
      }
      await payload.updateGlobal({ slug: global.slug, data: global.data })
      summary.globals++
      console.log(`Global: ${global.slug}`)
    }
  } else {
    for (const category of CATALOG_CATEGORIES) {
      const files = await listProductImages(category.slug)
      for (const [fileIndex, filePath] of files.entries()) {
        const ext = path.extname(filePath)
        const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
        const publicPath = `/products/${category.slug}/${String(fileIndex + 1).padStart(2, '0')}${ext}`
        await uploadFile(
          payload,
          filePath,
          `${category.title} — foto ${fileIndex + 1}`,
          filename,
          false,
          publicPath,
        )
        summary.media++
      }
    }
  }

  return summary
}

export function assertProductionEnv() {
  const usePostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)
  if (usePostgres && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'POSTGRES_URL definido sem BLOB_READ_WRITE_TOKEN. Na Vercel: Storage → Blob (Public) → conectar ao projeto (Production + Preview) → Redeploy. Depois rode npm run seed de novo.',
    )
  }
}
