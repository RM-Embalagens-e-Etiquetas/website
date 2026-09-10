/** URL pública de um documento da collection media (Blob ou estático). */
export function mediaUrl(doc) {
  if (!doc || typeof doc !== 'object') return null
  const url = doc.url
  if (typeof url !== 'string' || url.length === 0) return null
  // Registros quebrados (upload sem Blob na Vercel) — não renderizar quadrado preto
  if (url.includes('/api/media/file/')) return null
  return url
}
