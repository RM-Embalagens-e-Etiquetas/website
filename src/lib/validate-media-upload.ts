import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePublicSite } from './revalidate-site'

/** Atualiza o site depois que a foto entra. Não apaga o arquivo. */
export const revalidateMediaChange: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  if (operation !== 'create' && operation !== 'update') return doc
  if (!req.context?.skipRevalidate) await revalidatePublicSite()
  return doc
}
