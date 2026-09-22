import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { rejectBrokenProductionUpload } from '../lib/validate-media-upload'

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
    // Disco local em dev. Em produção o plugin Vercel Blob desliga o storage local.
    staticDir: path.resolve(dirname, '../../media'),
  },
}
