/** URL pública do site — Payload admin, live preview e links do CMS. */
export function getServerURL() {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim().replace(/\/$/, '')
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
