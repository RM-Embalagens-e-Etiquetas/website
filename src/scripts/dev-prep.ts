import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedBootstrap } from './lib/seed-bootstrap'

dotenv.config()

/** Bump quando mudar collections/globals — força recriação do SQLite local. */
export const DEV_SCHEMA_VERSION = '20260903-company-home-config'

const root = process.cwd()
const devDir = path.join(root, '.dev')
const versionFile = path.join(devDir, 'schema-version')
const dbPath = (() => {
  const raw = process.env.DATABASE_URI || 'file:./payload.sqlite'
  const filePath = raw.startsWith('file:') ? raw.slice('file:'.length) : raw
  return path.isAbsolute(filePath) ? filePath : path.join(root, filePath)
})()

function removeSqliteFiles() {
  for (const file of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`]) {
    if (fs.existsSync(file)) fs.unlinkSync(file)
  }
}

function readVersion() {
  if (!fs.existsSync(versionFile)) return ''
  return fs.readFileSync(versionFile, 'utf8').trim()
}

function writeVersion() {
  fs.mkdirSync(devDir, { recursive: true })
  fs.writeFileSync(versionFile, DEV_SCHEMA_VERSION)
}

export async function devPrep(options: { reset?: boolean } = {}) {
  if ((process.env.POSTGRES_URL || process.env.DATABASE_URL) && process.env.RM_USE_POSTGRES_LOCAL === '1') {
    console.warn('[dev-prep] RM_USE_POSTGRES_LOCAL=1 — usando Postgres remoto (não recomendado no dia a dia).')
  }

  const savedVersion = readVersion()
  const stale = savedVersion !== DEV_SCHEMA_VERSION

  if (options.reset || stale) {
    if (fs.existsSync(dbPath)) {
      console.log('[dev-prep] Recriando banco local (schema atualizado ou --reset).')
      removeSqliteFiles()
    }
  }

  writeVersion()

  const freshDb = !fs.existsSync(dbPath)
  const payload = await getPayload({ config })

  if (freshDb) {
    console.log('[dev-prep] Banco novo — populando catálogo e dados da empresa…')
    await seedBootstrap(payload, { mode: 'force', skipHeavyMedia: true })
    return { seeded: true, reset: true }
  }

  let companyPhone = ''
  try {
    const company = await payload.findGlobal({ slug: 'company', depth: 0 })
    companyPhone = company?.phone || ''
  } catch {
    console.log('[dev-prep] Banco inconsistente — recriando…')
    removeSqliteFiles()
    writeVersion()
    const payload2 = await getPayload({ config })
    await seedBootstrap(payload2, { mode: 'force' })
    return { seeded: true, reset: true }
  }

  if (!companyPhone) {
    console.log('[dev-prep] Dados da empresa vazios — seed (safe)…')
    await seedBootstrap(payload, { mode: 'safe' })
    return { seeded: true, reset: false }
  }

  console.log('[dev-prep] Banco local OK.')
  return { seeded: false, reset: false }
}

async function main() {
  const reset = process.argv.includes('--reset')
  await devPrep({ reset })
}

const isMain = process.argv[1]?.includes('dev-prep')
if (isMain) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
