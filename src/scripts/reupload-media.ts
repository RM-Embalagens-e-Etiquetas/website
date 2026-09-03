/**
 * Envia fotos pendentes para o Vercel Blob (rodar no seu PC, não na Vercel).
 * Na Vercel, use: /api/reupload-media?secret=SEU_PAYLOAD_SECRET&ui=1
 */
import dotenv from 'dotenv'
import { getPayload } from 'payload'

import { reuploadPendingMedia } from '../lib/reupload-media'
import config from '../payload.config'

dotenv.config()

async function main() {
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    console.error('Defina POSTGRES_URL ou DATABASE_URL.')
    process.exit(1)
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error('Defina PAYLOAD_SECRET.')
    process.exit(1)
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN === '[SENSITIVE]') {
    console.error('Defina BLOB_READ_WRITE_TOKEN.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  while (true) {
    const result = await reuploadPendingMedia(payload, { limit: 5 })
    for (const item of result.processed) {
      console.log(`  ${item.filename} → ${item.url}`)
    }
    for (const name of result.missing) {
      console.warn(`  sem arquivo: ${name}`)
    }
    if (result.remaining === 0) break
    console.log(`… faltam ${result.remaining}`)
  }

  console.log('\nConcluído.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
