/** Rotas de criar/editar documento no admin (não lista nem dashboard). */
export function isAdminDocumentForm(pathname: string) {
  if (pathname.startsWith('/admin/globals/')) return true
  const match = pathname.match(/^\/admin\/collections\/[^/]+\/([^/]+)\/?$/)
  if (!match) return false
  const segment = match[1]
  return segment === 'create' || segment.length > 0
}
