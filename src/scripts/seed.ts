import dotenv from 'dotenv'
import { getPayload } from 'payload'

import config from '../payload.config'
import { assertProductionEnv, seedBootstrap } from './lib/seed-bootstrap'

dotenv.config()

async function seed() {
  assertProductionEnv()

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
