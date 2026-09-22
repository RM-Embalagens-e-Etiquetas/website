const liveSite = 'https://rmembalagenseetiquetas.vercel.app'

/** URL pública do site — Payload admin, live preview e links do CMS. */
export function getServerURL() {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim().replace(/\/$/, '')
  // O domínio antigo do projeto não tem deploy. A prévia do painel precisa do site que abre.
  if (process.env.VERCEL === '1' && (!explicit || explicit === 'https://rm-embalagens.vercel.app')) {
    return liveSite
  }
  if (explicit) return explicit

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (productionHost) {
    return productionHost.startsWith('http') ? productionHost : `https://${productionHost}`
  }

  const vercelHost = process.env.VERCEL_URL?.trim()
  if (vercelHost) {
    return vercelHost.startsWith('http') ? vercelHost : `https://${vercelHost}`
  }

  return 'http://localhost:3000'
}

/**
 * Origens aceitas no cookie do admin.
 * O Payload só confia no serverURL. O painel também abre em
 * rmembalagenseetiquetas.vercel.app; sem essa origem o POST perde o login
 * e o botão Salvar do upload não é renderizado.
 */
export function getCsrfOrigins() {
  const origins = new Set<string>()

  const add = (value?: string | null) => {
    const raw = value?.trim().replace(/\/$/, '')
    if (!raw) return
    try {
      const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
      origins.add(url.origin)
    } catch {
      // host inválido não entra na lista
    }
  }

  add(getServerURL())
  add('https://rm-embalagens.vercel.app')
  add('https://rmembalagenseetiquetas.vercel.app')
  add(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  add(process.env.VERCEL_URL)
  if (process.env.NODE_ENV !== 'production') add('http://localhost:3000')

  return [...origins]
}
