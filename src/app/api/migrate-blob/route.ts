import { getPayload } from 'payload'

import config from '@payload-config'
import { countPendingMedia, migrateMediaBatch } from '@/lib/migrate-blob'

export const maxDuration = 60

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function POST(request: Request) {
  const secret = process.env.PAYLOAD_SECRET
  const auth = request.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) return unauthorized()

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'BLOB_READ_WRITE_TOKEN missing on this deployment' }, { status: 503 })
  }

  const url = new URL(request.url)
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 8), 1), 20)

  const payload = await getPayload({ config })
  const result = await migrateMediaBatch(payload, limit)

  return Response.json({ ok: true, ...result })
}

export async function GET(request: Request) {
  const secret = process.env.PAYLOAD_SECRET
  const auth = request.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) return unauthorized()

  const payload = await getPayload({ config })
  const pending = await countPendingMedia(payload)

  return Response.json({
    pending,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  })
}
