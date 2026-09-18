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
    'Esta foto não foi salva no armazenamento. Remova-a da galeria, envie o arquivo de novo e salve. ' +
      'Se repetir, tente outra imagem ou avise o suporte.',
    400,
  )
}
