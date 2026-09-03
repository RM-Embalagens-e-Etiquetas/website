#!/usr/bin/env tsx
/**
 * Migra mídias pendentes para Vercel Blob via API em produção.
 * Uso: PAYLOAD_SECRET=... npm run migrate:blob:remote
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const base =
  process.env.MIGRATE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://rm-embalagens.vercel.app'
const url = `${base.replace(/\/$/, '')}/api/migrate-blob`

for (const file of ['.env.vercel', '.env.local', '.env']) {
  const abs = path.resolve(process.cwd(), file)
  if (fs.existsSync(abs)) dotenv.config({ path: abs, override: false })
}

const secret = process.env.PAYLOAD_SECRET
if (!secret) {
  console.error('Defina PAYLOAD_SECRET (ex.: copie de Vercel → Settings → Environment Variables).')
  process.exit(1)
}

async function run() {
  const status = await fetch(url, {
    headers: { authorization: `Bearer ${secret}` },
  })
  const statusJson = await status.json()
  console.log('[migrate-blob] pending:', statusJson.pending)

  let round = 0
  while (true) {
    round++
    const res = await fetch(`${url}?limit=8`, {
      method: 'POST',
      headers: { authorization: `Bearer ${secret}` },
    })
    const json = await res.json()
    if (!res.ok) {
      console.error(json)
      process.exit(1)
    }

    console.log(
      `[${round}] migrated=${json.migrated?.length || 0} skipped=${json.skipped?.length || 0} remaining=${json.remaining}`,
    )
    if (json.errors?.length) console.warn('errors:', json.errors)

    if (json.done || json.remaining === 0) {
      console.log('Migração concluída.')
      break
    }

    await new Promise((r) => setTimeout(r, 1500))
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
