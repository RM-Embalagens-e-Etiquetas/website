/** O arquivo público do Blob responde com bytes de imagem. */
export async function blobUrlIsReachable(url: string) {
  if (!url.includes('blob.vercel-storage.com')) return false
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=0-15' },
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok && response.status !== 206) return false
    const type = response.headers.get('content-type') || ''
    return type.startsWith('image/')
  } catch {
    return false
  }
}
