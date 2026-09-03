import dotenv from 'dotenv'
import { getPayload } from 'payload'

import config from '../payload.config'

dotenv.config()

async function fixDevMigrationMarker() {
  const payload = await getPayload({ config })

  const devMigrations = await payload.find({
    collection: 'payload-migrations',
    where: { batch: { equals: -1 } },
    limit: 10,
    depth: 0,
  })

  if (!devMigrations.docs.length) {
    console.log('Nada para limpar — marcador dev (batch -1) não encontrado.')
    process.exit(0)
  }

  for (const doc of devMigrations.docs) {
    await payload.delete({
      collection: 'payload-migrations',
      id: doc.id,
    })
    console.log(`Removido: ${doc.name} (batch ${doc.batch})`)
  }

  console.log('Pronto. A Vercel não deve mais pedir confirmação interativa.')
  process.exit(0)
}

fixDevMigrationMarker().catch((error) => {
  console.error(error)
  process.exit(1)
})
