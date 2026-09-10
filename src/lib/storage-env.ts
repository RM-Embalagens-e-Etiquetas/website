/** Runtime real na Vercel (ignora VERCEL=1 vindo do .env puxado localmente). */
export function isVercelProductionRuntime() {
  return process.env.VERCEL === '1' && Boolean(process.env.VERCEL_REGION)
}

export function isValidBlobToken(token: string | undefined | null) {
  return Boolean(token && token.startsWith('vercel_blob_rw_') && !token.includes('[SENSITIVE]'))
}

export function isBlobMediaUrl(url: string | null | undefined) {
  return Boolean(url && url.includes('blob.vercel-storage.com'))
}

/** URLs locais do Payload que não persistem na Vercel. */
export function isBrokenMediaUrl(url: string | null | undefined) {
  if (!url) return true
  if (isBlobMediaUrl(url)) return false
  if (url.includes('/api/media/file/')) return true
  return false
}

export function isValidProductionMediaUrl(url: string | null | undefined) {
  if (!isVercelProductionRuntime()) return Boolean(url) && !isBrokenMediaUrl(url)
  return isBlobMediaUrl(url)
}

/** Seed/migrate em massa — desligado em prod por padrão (queima cota Blob). */
export function isBulkMediaAllowed() {
  return process.env.RM_ALLOW_BULK_MEDIA === '1'
}
