import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Payload } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '../..')
const productsDir = path.join(root, 'public/products')

function isBlobUrl(url: string | null | undefined) {
  return Boolean(url && url.includes('blob.vercel-storage.com'))
}

function mimeFromName(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

function resolveSourcePath(filename: string) {
  if (filename === 'hero.jpg') return path.join(root, 'public/hero.jpg')
  if (filename === 'sobre-producao.jpg') {
    return path.join(root, 'src/assets/img/inicial/sacolas/IMG-20220726-WA0040.jpg')
  }

  const match = filename.match(/^(.+)-(\d+)\.(jpe?g|png|webp)$/i)
  if (!match) return null

  const slug = match[1]
  const index = parseInt(match[2], 10)
  const dir = path.join(productsDir, slug)
  if (!fs.existsSync(dir)) return null

  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()

  if (files.length === 0) return null

  const fileIndex = Math.min(Math.max(index - 1, 0), files.length - 1)
  return path.join(dir, files[fileIndex])
}

async function uploadToBlob(
  payload: Payload,
  absPath: string,
  alt: string,
  filename: string,
  mediaId: number | string,
) {
  const buffer = fs.readFileSync(absPath)
  return payload.update({
    collection: 'media',
    id: mediaId,
    data: { alt },
    file: {
      data: buffer,
      mimetype: mimeFromName(filename),
      name: filename,
      size: buffer.length,
    },
  })
}

export async function countPendingMedia(payload: Payload) {
  const all = await payload.find({
    collection: 'media',
    limit: 500,
    sort: 'id',
    depth: 0,
  })
  return all.docs.filter((doc) => !isBlobUrl(doc.url)).length
}

export async function migrateMediaBatch(payload: Payload, limit = 8) {
  const all = await payload.find({
    collection: 'media',
    limit: 500,
    sort: 'id',
    depth: 0,
  })

  const pendingDocs = all.docs.filter((doc) => !isBlobUrl(doc.url)).slice(0, limit)

  const migrated: string[] = []
  const skipped: string[] = []
  const errors: Array<{ filename: string; error: string }> = []

  for (const doc of pendingDocs) {
    const filename = doc.filename
    if (!filename) {
      skipped.push(String(doc.id))
      continue
    }

    const source = resolveSourcePath(filename)
    if (!source || !fs.existsSync(source)) {
      skipped.push(filename)
      continue
    }

    try {
      await uploadToBlob(payload, source, doc.alt || filename, filename, doc.id)
      migrated.push(filename)
    } catch (error) {
      errors.push({
        filename,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const remaining = await countPendingMedia(payload)

  return {
    migrated,
    skipped,
    errors,
    remaining,
    done: remaining === 0,
  }
}
