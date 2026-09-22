import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'
import { APIError } from 'payload'

import { blobUrlIsReachable } from './blob-reachable'
import { revalidatePublicSite } from './revalidate-site'
import { isBlobMediaUrl, isValidProductionMediaUrl, isVercelProductionRuntime } from './storage-env'

export const rejectBrokenProductionUpload: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create' && operation !== 'update') return doc
  if (!isVercelProductionRuntime()) return doc

  const url = typeof doc.url === 'string' ? doc.url : ''
  if (!isValidProductionMediaUrl(url)) {
    await discardBrokenUpload(req, doc.id)
    throw brokenUploadError()
  }

  const incoming = req.file as { clientUploadContext?: unknown } | undefined
  if (operation === 'create' && incoming?.clientUploadContext && isBlobMediaUrl(url)) {
    const stored = await blobUrlIsReachable(url)
    if (!stored) {
      await discardBrokenUpload(req, doc.id)
      throw brokenUploadError()
    }
  }

  if (!req.context?.skipRevalidate) await revalidatePublicSite()
  return doc
}

async function discardBrokenUpload(req: PayloadRequest, id: number | string) {
  try {
    await req.payload.delete({
      collection: 'media',
      id,
      overrideAccess: true,
    })
  } catch {
    // best effort — still block the broken record from being used
  }
}

function brokenUploadError() {
  return new APIError(
    'Esta foto não foi salva no armazenamento. Remova-a da galeria, envie o arquivo de novo e salve. ' +
      'Se repetir, tente outra imagem ou avise o suporte.',
    400,
  )
}
