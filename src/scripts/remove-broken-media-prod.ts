#!/usr/bin/env tsx
/**
 * Remove fotos cujo arquivo no Blob não abre (quadrado preto no site).
 *   npx tsx src/scripts/remove-broken-media-prod.ts
 *   npx tsx src/scripts/remove-broken-media-prod.ts --apply
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const vercelEnv = path.resolve(process.cwd(), '.env.vercel')
if (!fs.existsSync(vercelEnv)) {
  console.error('Arquivo .env.vercel ausente. Rode: npx vercel env pull .env.vercel')
  process.exit(1)
}

process.env.RM_USE_POSTGRES_LOCAL = '1'
delete process.env.DATABASE_URI
dotenv.config({ path: vercelEnv, override: true })

const apply = process.argv.includes('--apply')

async function run() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const { removeUnreachableMedia } = await import('@/lib/remove-broken-media')

  const payload = await getPayload({ config })
  const result = await removeUnreachableMedia(payload, apply)
  console.log(JSON.stringify(result, null, 2))
  if (!apply) console.log('Para apagar: npx tsx src/scripts/remove-broken-media-prod.ts --apply')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
