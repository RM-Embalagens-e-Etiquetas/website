#!/usr/bin/env tsx
/**
 * Auditoria e limpeza de media órfãos em produção.
 *
 *   PAYLOAD_SECRET=... npm run cleanup:media:remote          # só auditoria (GET)
 *   RM_ALLOW_BULK_MEDIA=1 PAYLOAD_SECRET=... npm run cleanup:media:remote -- --apply
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const base =
  process.env.CLEANUP_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://rm-embalagens.vercel.app'
const url = `${base.replace(/\/$/, '')}/api/cleanup-media`

for (const file of ['.env.local', '.env']) {
  const abs = path.resolve(process.cwd(), file)
  if (fs.existsSync(abs)) dotenv.config({ path: abs, override: true })
}

const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.includes('[SENSITIVE]')) {
  console.error('Defina PAYLOAD_SECRET (Vercel → Settings → Environment Variables).')
  process.exit(1)
}

const apply = process.argv.includes('--apply')

async function run() {
  const headers = { authorization: `Bearer ${secret}` }

  const auditRes = await fetch(url, { headers })
  const auditJson = await auditRes.json()
  console.log('[cleanup-media] audit:', auditJson)

  if (!apply) {
    console.log('Simulação apenas. Para apagar órfãos: RM_ALLOW_BULK_MEDIA=1 ... -- --apply')
    return
  }

  const postRes = await fetch(url, {
    method: 'POST',
    headers,
  })
  const postJson = await postRes.json()
  if (!postRes.ok) {
    console.error(postJson)
    process.exit(1)
  }
  console.log('[cleanup-media] done:', postJson)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
