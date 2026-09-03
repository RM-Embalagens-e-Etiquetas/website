/** Map CMS seed filename → static file in public/ (works on Vercel without Blob). */
export function staticPathFromFilename(filename) {
  if (!filename) return null

  if (filename === 'hero.jpg' || filename.startsWith('hero-')) return '/hero.jpg'
  if (filename === 'sobre-producao.jpg' || filename.startsWith('sobre-producao-')) {
    return '/sobre-producao.jpg'
  }
  if (filename === 'logo.png' || filename.startsWith('logo-')) return '/logo.png'

  const match = String(filename).match(/^(.+)-(\d+)\.(jpe?g|png|webp)$/i)
  if (!match) return null

  const slug = match[1]
  const num = match[2].padStart(2, '0')
  const ext = match[3].toLowerCase()
  return `/products/${slug}/${num}.${ext}`
}

export function mediaUrl(doc) {
  if (!doc || typeof doc !== 'object') return null

  const url = doc.url
  if (typeof url === 'string' && /^https?:\/\//i.test(url)) return url

  // Na Vercel o disco é efêmero: /api/media/file/* 404 se o Blob ainda não tiver o arquivo.
  // Fotos do catálogo já estão em public/ — usa elas até o seed ir para o Blob.
  if (process.env.VERCEL_ENV) {
    return staticPathFromFilename(doc.filename) || url || null
  }

  return url || staticPathFromFilename(doc.filename) || null
}
