/** Map CMS seed filename → static file in public/ (fallback quando Blob ainda não tem o arquivo). */
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
  const index = parseInt(match[2], 10)
  const ext = match[3].toLowerCase()
  // Registros órfãos no CMS (ex.: etiquetas-adesivas-26) — public/ só tem 01–17
  const num = index > 20 ? '01' : String(index).padStart(2, '0')
  return `/products/${slug}/${num}.${ext}`
}

export function mediaUrl(doc) {
  if (!doc || typeof doc !== 'object') return null

  const url = doc.url
  if (typeof url === 'string' && /^https?:\/\//i.test(url)) return url

  const staticPath = staticPathFromFilename(doc.filename)

  // Blob ainda não populado: servir de public/ na Vercel (disco efêmero no Payload)
  if (process.env.VERCEL_ENV) {
    return staticPath || url || null
  }

  return url || staticPath || null
}
