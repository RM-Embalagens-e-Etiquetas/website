/** Map CMS media filename → static file in public/ (CDN, zero serverless). */
export function staticPathFromFilename(filename) {
  if (!filename) return null

  if (filename === 'hero.jpg' || filename.startsWith('hero-')) return '/hero.jpg'
  if (filename === 'sobre-producao.jpg' || filename.startsWith('sobre-producao-')) {
    return '/sobre-producao.jpg'
  }

  const match = filename.match(/^(.+)-(\d+)\.(jpe?g|png|webp)$/i)
  if (!match) return null

  const slug = match[1]
  const num = match[2].padStart(2, '0')
  const ext = match[3].toLowerCase()
  return `/products/${slug}/${num}.${ext}`
}

export function mediaUrl(doc) {
  if (!doc || typeof doc !== 'object') return null

  const staticPath = staticPathFromFilename(doc.filename)
  if (staticPath) return staticPath

  if (doc.url?.startsWith('http')) return doc.url

  return null
}
