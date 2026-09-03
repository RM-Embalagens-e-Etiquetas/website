import fs from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'

function mimeFromName(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

export function isBlobUrl(url: string | null | undefined) {
  return Boolean(url && url.includes('blob.vercel-storage.com'))
}

export function resolveSourcePath(root: string, filename: string | null | undefined): string | null {
  if (!filename) return null

  const productsDir = path.join(root, 'public/products')

  if (filename === 'hero.jpg' || filename.startsWith('hero-')) {
    const hero = path.join(root, 'public/hero.jpg')
    return fs.existsSync(hero) ? hero : null
  }

  if (filename === 'sobre-producao.jpg' || filename.startsWith('sobre-producao-')) {
    const about = path.join(root, 'src/assets/img/inicial/sacolas/IMG-20220726-WA0040.jpg')
    return fs.existsSync(about) ? about : null
  }

  const match = filename.match(/^(.+)-(\d+)(\.(jpe?g|png|webp))$/i)
  if (!match) return null

  const slug = match[1]
  const num = match[2]
  const ext = match[3]
  const dir = path.join(productsDir, slug)
  if (!fs.existsSync(dir)) return null

  const candidates = [
    `${num.padStart(2, '0')}${ext}`,
    `${num}${ext}`,
    `${String(parseInt(num, 10))}${ext}`,
    `${String(parseInt(num, 10)).padStart(2, '0')}${ext}`,
  ]

  for (const candidate of candidates) {
    const abs = path.join(dir, candidate)
    if (fs.existsSync(abs)) return abs
  }

  return null
}

async function replaceMedia(
  payload: Payload,
  doc: { id: number | string; alt?: string | null; filename?: string | null },
  absPath: string
) {
  const filename = doc.filename!
  const buffer = fs.readFileSync(absPath)
  const updated = await payload.update({
    collection: 'media',
    id: doc.id,
    data: { alt: doc.alt || filename },
    file: {
      data: buffer,
      mimetype: mimeFromName(filename),
      name: filename,
      size: buffer.length,
    },
  })
  return { filename, url: updated.url }
}

export type ReuploadResult = {
  done: boolean
  processed: Array<{ filename: string; url: string | null | undefined }>
  missing: string[]
  remaining: number
  total: number
}

export async function reuploadPendingMedia(
  payload: Payload,
  options: { root?: string; limit?: number } = {}
): Promise<ReuploadResult> {
  const root = options.root || process.cwd()
  const limit = options.limit ?? 5

  const all = await payload.find({ collection: 'media', limit: 500, depth: 0 })
  const pending = all.docs.filter((doc) => !isBlobUrl(doc.url))
  const uploadable = pending.filter((doc) => resolveSourcePath(root, doc.filename))
  const batch = uploadable.slice(0, limit)

  const processed: ReuploadResult['processed'] = []
  const missing = pending
    .filter((doc) => !resolveSourcePath(root, doc.filename))
    .map((doc) => doc.filename || String(doc.id))

  for (const doc of batch) {
    const src = resolveSourcePath(root, doc.filename)!
    processed.push(await replaceMedia(payload, doc, src))
  }

  const remaining = uploadable.length - batch.length

  return {
    done: remaining === 0,
    processed,
    missing,
    remaining,
    total: all.docs.length,
  }
}
