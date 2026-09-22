'use client'

import { createClientUploadHandler, getFileKey } from '@payloadcms/plugin-cloud-storage/client'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'

function posixBasename(key: string) {
  const normalized = key.replace(/^\/+/, '')
  const slash = normalized.lastIndexOf('/')
  return slash === -1 ? normalized : normalized.slice(slash + 1)
}

/** Envia a foto ao Blob e devolve o endereço que o armazenamento realmente criou. */
export const BlobUploadHandler = createClientUploadHandler({
  handler: async ({
    apiRoute,
    collectionSlug,
    docPrefix,
    extra,
    file,
    prefix,
    serverHandlerPath,
    serverURL,
    updateFilename,
  }) => {
    const endpointRoute = formatAdminURL({
      apiRoute,
      path: serverHandlerPath,
      serverURL,
    })
    const useCompositePrefixes = Boolean(
      extra && typeof extra === 'object' && 'useCompositePrefixes' in extra && extra.useCompositePrefixes,
    )
    const { fileKey: pathname, sanitizedDocPrefix } = getFileKey({
      collectionPrefix: prefix,
      docPrefix,
      filename: file.name,
      useCompositePrefixes,
    })
    const result = await upload(pathname, file, {
      access: 'public',
      clientPayload: collectionSlug,
      contentType: file.type || 'application/octet-stream',
      handleUploadUrl: endpointRoute,
    })
    updateFilename(decodeURIComponent(posixBasename(result.pathname.replace(/^\/+/, ''))))
    return {
      prefix: sanitizedDocPrefix,
      url: result.url,
    }
  },
})

export default BlobUploadHandler
