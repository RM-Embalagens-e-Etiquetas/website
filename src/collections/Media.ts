import type { CollectionConfig } from 'payload'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const dirname = path.dirname(fileURLToPath(import.meta.url))
const usePostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)

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
    displayPreview: true,
    // Disco local só em dev (SQLite). Em produção o plugin Vercel Blob assume o storage.
    ...(usePostgres ? {} : { staticDir: path.resolve(dirname, '../../media') }),
  },
}
