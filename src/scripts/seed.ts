import './lib/load-prod-env'

import { getPayload } from 'payload'

import config from '../payload.config'
import { assertProductionEnv, seedBootstrap } from './lib/seed-bootstrap'

async function seed() {
  assertProductionEnv()

  const usingPostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)
  const usingBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  console.log(
    usingPostgres && usingBlob
      ? '[seed] Produção: Postgres + Vercel Blob'
      : '[seed] Local: SQLite + pasta media/',
  )

  const payload = await getPayload({ config })
  await seedBootstrap(payload, { mode: 'force' })

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@rmembalagens.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123'

  console.log('\nSeed concluído (modo force — repopula catálogo e globals de negócio).')
  console.log(`Admin: ${adminEmail}`)
  console.log(`Senha: ${adminPassword}`)
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
