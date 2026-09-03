import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { pt } from '@payloadcms/translations/languages/pt'
import dotenv from 'dotenv'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { ProductCategories } from './collections/ProductCategories'
import { ProductGroups } from './collections/ProductGroups'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Home } from './globals/Home'
import { Site } from './globals/Site'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config()

const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
const usePostgres = Boolean(postgresUrl)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

const db = usePostgres
  ? vercelPostgresAdapter({
      pool: {
        connectionString: postgresUrl,
      },
      prodMigrations: migrations,
      push: false,
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URI || 'file:./payload.sqlite',
      },
    })

const plugins =
  usePostgres && blobToken
    ? [
        vercelBlobStorage({
          collections: {
            media: true,
          },
          token: blobToken,
        }),
      ]
    : []

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — RM Embalagens',
    },
    autoLogin:
      process.env.NODE_ENV !== 'production'
        ? {
            email: process.env.SEED_ADMIN_EMAIL,
            password: process.env.SEED_ADMIN_PASSWORD,
            prefillOnly: false,
          }
        : false,
    components: {
      views: {
        dashboard: {
          Component: '/admin/Dashboard',
        },
      },
      graphics: {
        Logo: '/admin/Logo',
        Icon: '/admin/NavIcon',
      },
      header: ['/admin/HowToBar'],
      beforeNavLinks: ['/admin/Sidebar'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 375, height: 667 },
        { label: 'Computador', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
    translations: {
      pt: {
        general: {
          dashboard: 'Painel',
          menu: 'Menu',
        },
      },
    },
  },
  collections: [Users, Media, ProductGroups, ProductCategories],
  globals: [Site, Home, About, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  plugins,
  sharp,
})
