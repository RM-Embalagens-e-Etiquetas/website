#!/usr/bin/env tsx
/**
 * Remove da galeria de categorias mídias com URL quebrada (fantasma /api/media/file).
 *   npm run fix:broken-gallery:prod
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const vercelEnv = path.resolve(process.cwd(), '.env.vercel')
if (!fs.existsSync(vercelEnv)) {
  console.error('Arquivo .env.vercel ausente.')
  process.exit(1)
}

process.env.RM_USE_POSTGRES_LOCAL = '1'
delete process.env.DATABASE_URI
dotenv.config({ path: vercelEnv, override: true })

async function run() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const { isBrokenMediaUrl } = await import('@/lib/storage-env')

  const payload = await getPayload({ config })
  const categories = await payload.find({ collection: 'product-categories', depth: 0, limit: 200 })

  let patched = 0
  for (const category of categories.docs) {
    const gallery = category.gallery
    if (!Array.isArray(gallery) || gallery.length === 0) continue

    const ids = gallery.map((item) => (typeof item === 'object' && item ? item.id : item))
    const media = await payload.find({
      collection: 'media',
      where: { id: { in: ids } },
      depth: 0,
      limit: ids.length,
    })
    const brokenIds = new Set(
      media.docs.filter((doc) => isBrokenMediaUrl(typeof doc.url === 'string' ? doc.url : '')).map((d) => d.id),
    )
    if (brokenIds.size === 0) continue

    const nextGallery = gallery.filter((item) => {
      const id = typeof item === 'object' && item ? item.id : item
      return !brokenIds.has(id)
    })

    await payload.update({
      collection: 'product-categories',
      id: category.id,
      data: { gallery: nextGallery },
      overrideAccess: true,
    })
    console.log(`[fix] ${category.slug}: removed ${brokenIds.size} broken ref(s)`)
    patched++
  }

  console.log('[fix] categories patched:', patched)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
