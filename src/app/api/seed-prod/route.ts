import { getPayload } from 'payload'

import config from '@payload-config'
import { seedBootstrap } from '@/scripts/lib/seed-bootstrap'

export const maxDuration = 300

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

/** Um único POST repopula catálogo e envia fotos pro Vercel Blob (roda na Vercel com secrets reais). */
export async function POST(request: Request) {
  const secret = process.env.PAYLOAD_SECRET
  const auth = request.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) return unauthorized()

  if (!process.env.BLOB_READ_WRITE_TOKEN?.startsWith('vercel_blob_rw_')) {
    return Response.json({ error: 'BLOB_READ_WRITE_TOKEN inválido neste deploy' }, { status: 503 })
  }

  const payload = await getPayload({ config })
  const summary = await seedBootstrap(payload, { mode: 'force' })

  return Response.json({ ok: true, summary })
}
