/** URL pública de um documento da collection media (Blob ou Payload). */
export function mediaUrl(doc) {
  if (!doc || typeof doc !== 'object') return null
  const url = doc.url
  if (typeof url === 'string' && url.length > 0) return url
  return null
}
