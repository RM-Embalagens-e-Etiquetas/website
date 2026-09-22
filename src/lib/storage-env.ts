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

/** Base pública do Blob (`https://<store>.public.blob.vercel-storage.com`). */
export function blobPublicBaseUrl() {
  const override = process.env.STORAGE_VERCEL_BLOB_BASE_URL
  if (override) return override.replace(/\/$/, '')
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const storeId = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) return null
  return `https://${storeId}.public.blob.vercel-storage.com`
}

/** Mesmo endereço que o upload direto grava no Blob. */
export function publicBlobUrl(filename: string, prefix?: string | null) {
  const base = blobPublicBaseUrl()
  if (!base || !filename) return null
  const safePrefix = prefix?.replace(/^\/+|\/+$/g, '')
  const encoded = encodeURIComponent(filename)
  return safePrefix ? `${base}/${safePrefix}/${encoded}` : `${base}/${encoded}`
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
