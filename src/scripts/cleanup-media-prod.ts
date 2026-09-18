#!/usr/bin/env tsx
/**
 * Limpeza de mídia órfã no Postgres de produção (.env.vercel).
 *
 *   npm run cleanup:media:prod              # dry-run
 *   npm run cleanup:media:prod -- --apply   # apaga órfãos
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
  const { auditMedia, cleanupOrphanMedia } = await import('@/lib/cleanup-media')

  const payload = await getPayload({ config })
  const before = await auditMedia(payload)
  console.log('[cleanup-media-prod] before:', before)

  if (before.total < 100 && before.orphans === 0 && before.total < 50) {
    console.warn(
      '[cleanup-media-prod] Poucos registros — confira se POSTGRES_URL em .env.vercel é produção.',
    )
  }

  if (!apply) {
    const preview = await cleanupOrphanMedia(payload, { dryRun: true })
    console.log('[cleanup-media-prod] would delete:', preview.candidates)
    console.log('Para apagar: npm run cleanup:media:prod -- --apply')
    return
  }

  const result = await cleanupOrphanMedia(payload, { dryRun: false })
  const after = await auditMedia(payload)
  console.log('[cleanup-media-prod] deleted:', result.deleted)
  console.log('[cleanup-media-prod] after:', after)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
