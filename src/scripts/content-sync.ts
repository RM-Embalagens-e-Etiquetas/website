import dotenv from 'dotenv'
import { getPayload } from 'payload'

import config from '../../payload.config'
import { assertProductionEnv, syncCms, type SyncMode } from './lib/cms-sync'

dotenv.config()

function parseMode(): SyncMode {
  const args = process.argv.slice(2)
  if (args.includes('--force')) return 'force'
  if (args.includes('--media')) return 'media'
  return 'safe'
}

async function main() {
  const mode = parseMode()
  assertProductionEnv()

  const payload = await getPayload({ config })
  const summary = await syncCms(payload, { mode })

  console.log('\nSincronização concluída.')
  console.log(`Modo: ${summary.mode}`)
  console.log(
    `Grupos: ${summary.groups} | Categorias: ${summary.categories} | Globals: ${summary.globals} | Mídia: ${summary.media}`,
  )
  if (summary.skipped.length) {
    console.log(`Preservados (edições no admin): ${summary.skipped.join(', ')}`)
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
