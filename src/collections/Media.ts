import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Descrição da foto',
      required: true,
      defaultValue: 'Produto RM Embalagens',
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    displayPreview: true,
  },
}
