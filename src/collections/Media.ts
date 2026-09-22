import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { blobPublicBaseUrl, isBlobMediaUrl, isValidBlobToken, publicBlobUrl } from '../lib/storage-env'
import { rejectBrokenProductionUpload } from '../lib/validate-media-upload'

const blobHost = (() => {
  const base = blobPublicBaseUrl()
  if (!base) return null
  try {
    return new URL(base).hostname
  } catch {
    return null
  }
})()

/** Grava a URL pública do Blob no documento novo. Leituras antigas continuam com a URL já salva. */
export const assignBlobUrlOnUpload: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!data || !req.file) return data
  if (!isValidBlobToken(process.env.BLOB_READ_WRITE_TOKEN)) return data
  const filename =
    (typeof data.filename === 'string' && data.filename) ||
    (typeof req.file.name === 'string' ? req.file.name : '')
  if (!filename) return data
  const prefix = typeof data.prefix === 'string' ? data.prefix : undefined
  const next = publicBlobUrl(filename, prefix)
  if (next) data.url = next
  return data
}

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Foto',
    plural: 'Fotos',
  },
  lockDocuments: false,
  admin: {
    hidden: true,
    hideAPIURL: true,
    description: 'As fotos são adicionadas dentro de cada produto ou página.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [assignBlobUrlOnUpload],
    beforeValidate: [
      ({ data }) => {
        if (data && !String(data.alt || '').trim()) {
          data.alt = 'Produto RM Embalagens'
        }
        return data
      },
    ],
    afterChange: [rejectBrokenProductionUpload],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Descrição da foto',
      admin: {
        description: 'Opcional. Se ficar vazio, o site usa um texto padrão.',
      },
    },
  ],
  upload: {
    displayPreview: true,
    adminThumbnail: ({ doc }) => {
      const url = doc && typeof doc.url === 'string' ? doc.url : ''
      return isBlobMediaUrl(url) ? url : null
    },
    skipSafeFetch: blobHost ? [{ hostname: blobHost }] : false,
    // Disco local em dev. Em produção o plugin Vercel Blob desliga o storage local.
    staticDir: path.resolve(dirname, '../../media'),
  },
}
