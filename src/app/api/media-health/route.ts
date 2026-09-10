import { getPayload } from 'payload'

import config from '@payload-config'
import { auditMedia } from '@/lib/cleanup-media'
import { isValidBlobToken, isVercelProductionRuntime } from '@/lib/storage-env'

/** Status público para o admin (sem segredos). */
export async function GET() {
  const blobConfigured = isValidBlobToken(process.env.BLOB_READ_WRITE_TOKEN)

  let audit = null
  try {
    const payload = await getPayload({ config })
    audit = await auditMedia(payload)
  } catch {
    audit = null
  }

  return Response.json({
    production: isVercelProductionRuntime(),
    blobConfigured,
    audit,
  })
}
