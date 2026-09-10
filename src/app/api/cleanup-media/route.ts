import { getPayload } from 'payload'

import config from '@payload-config'
import { auditMedia, cleanupOrphanMedia } from '@/lib/cleanup-media'
import { isBulkMediaAllowed } from '@/lib/storage-env'

export const maxDuration = 120

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function bulkDisabled() {
  return Response.json(
    {
      error:
        'Limpeza em massa desativada neste deploy. Defina RM_ALLOW_BULK_MEDIA=1 temporariamente se necessário.',
    },
    { status: 403 },
  )
}

function checkAuth(request: Request) {
  const secret = process.env.PAYLOAD_SECRET
  const auth = request.headers.get('authorization')
  return Boolean(secret && auth === `Bearer ${secret}`)
}

/** GET — auditoria (total, órfãos, quebrados). POST — remove órfãos (?dryRun=1 simula). */
export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const payload = await getPayload({ config })
  const audit = await auditMedia(payload)

  return Response.json({ ok: true, audit })
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  if (!isBulkMediaAllowed()) return bulkDisabled()

  const url = new URL(request.url)
  const dryRun = url.searchParams.get('dryRun') === '1'

  const payload = await getPayload({ config })
  const auditBefore = await auditMedia(payload)
  const result = await cleanupOrphanMedia(payload, { dryRun })
  const auditAfter = dryRun ? auditBefore : await auditMedia(payload)

  return Response.json({ ok: true, auditBefore, result, auditAfter })
}
