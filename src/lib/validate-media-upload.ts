import type { CollectionAfterChangeHook } from 'payload'
import { APIError } from 'payload'

import { isValidProductionMediaUrl, isVercelProductionRuntime } from './storage-env'

export const rejectBrokenProductionUpload: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create' && operation !== 'update') return doc
  if (!isVercelProductionRuntime()) return doc

  const url = typeof doc.url === 'string' ? doc.url : ''
  if (isValidProductionMediaUrl(url)) return doc

  try {
    await req.payload.delete({
      collection: 'media',
      id: doc.id,
      overrideAccess: true,
    })
  } catch {
    // best effort — still block the broken record from being used
  }

  throw new APIError(
    'Não foi possível enviar a foto para o armazenamento (limite ou falha temporária). ' +
      'Tente de novo em alguns minutos. Se persistir, avise o suporte técnico.',
    400,
  )
}
