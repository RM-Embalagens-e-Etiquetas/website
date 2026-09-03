import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Payload } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.resolve(dirname, '../../content')
const root = path.resolve(dirname, '../../..')
const productsDir = path.join(root, 'public/products')

export type SyncMode = 'safe' | 'force' | 'media'

export type SyncOptions = {
  mode?: SyncMode
  ensureAdmin?: boolean
}

type Group = { slug: string; title: string; description: string }
type Category = { slug: string; title: string; group: string; description: string }

function loadJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8')) as T
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
  if (slug === 'site') return Boolean(doc?.defaultTitle)
  if (slug === 'home') return Boolean(doc?.heroTitle)
  if (slug === 'about') return Boolean(doc?.title)
  if (slug === 'contact') return Boolean(doc?.title)
  return Boolean(doc)
}

export async function uploadFile(
  payload: Payload,
  absPath: string,
  alt: string,
  filename: string,
  force = false
) {
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

function listProductImages(slug: string) {
  const dir = path.join(productsDir, slug)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => path.join(dir, file))
}

async function syncCategoryGallery(
  payload: Payload,
  category: Category,
  force: boolean
) {
  const files = listProductImages(category.slug)
  const galleryIds: Array<number | string> = []

  for (const [fileIndex, filePath] of files.entries()) {
    const ext = path.extname(filePath)
    const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
    const media = await uploadFile(
      payload,
      filePath,
      `${category.title} — foto ${fileIndex + 1}`,
      filename,
      force
    )
    galleryIds.push(media.id)
  }

  return galleryIds
}

export async function syncCms(payload: Payload, options: SyncOptions = {}) {
  const mode = options.mode || 'safe'
  const force = mode === 'force'
  const mediaOnly = mode === 'media'

  const groups = loadJson<Group[]>('groups.json')
  const categories = loadJson<Category[]>('categories.json')
  const mediaManifest = loadJson<{
    hero: { path: string; filename: string; alt: string }
    about: { path: string; filename: string; alt: string }
    proofSlugs: string[]
  }>('media.json')

  const site = loadJson<Record<string, unknown>>('globals/site.json')
  const home = loadJson<Record<string, unknown>>('globals/home.json')
  const about = loadJson<Record<string, unknown>>('globals/about.json')
  const contact = loadJson<Record<string, unknown>>('globals/contact.json')

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
    path.join(root, mediaManifest.hero.path),
    mediaManifest.hero.alt,
    mediaManifest.hero.filename,
    force
  )
  summary.media++

  const aboutImage = await uploadFile(
    payload,
    path.join(root, mediaManifest.about.path),
    mediaManifest.about.alt,
    mediaManifest.about.filename,
    force
  )
  summary.media++

  if (!mediaOnly) {
    const groupIds: Record<string, number | string> = {}

    for (const [index, group] of groups.entries()) {
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

    for (const [index, category] of categories.entries()) {
      const existing = await findBySlug(payload, 'product-categories', category.slug)

      if (!existing) {
        const galleryIds = await syncCategoryGallery(payload, category, false)
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
        const galleryIds = await syncCategoryGallery(payload, category, true)
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
        const files = listProductImages(category.slug)
        for (const [fileIndex, filePath] of files.entries()) {
          const ext = path.extname(filePath)
          const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
          await uploadFile(
            payload,
            filePath,
            `${category.title} — foto ${fileIndex + 1}`,
            filename,
            false
          )
          summary.media++
        }
      }
    }

    const proofImages = mediaManifest.proofSlugs
      .map((slug) => firstImageBySlug[slug])
      .filter(Boolean)

    const globalsToSync: Array<{ slug: string; data: Record<string, unknown> }> = [
      { slug: 'site', data: site },
      {
        slug: 'home',
        data: {
          ...home,
          heroImage: hero.id,
          aboutImage: aboutImage.id,
          proofImages,
        },
      },
      { slug: 'about', data: { ...about, image: aboutImage.id } },
      { slug: 'contact', data: contact },
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
    for (const category of categories) {
      const files = listProductImages(category.slug)
      for (const [fileIndex, filePath] of files.entries()) {
        const ext = path.extname(filePath)
        const filename = `${category.slug}-${String(fileIndex + 1).padStart(2, '0')}${ext}`
        await uploadFile(
          payload,
          filePath,
          `${category.title} — foto ${fileIndex + 1}`,
          filename,
          false
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
      'POSTGRES_URL definido sem BLOB_READ_WRITE_TOKEN. Configure o Vercel Blob antes de sincronizar.',
    )
  }
}
