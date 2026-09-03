export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (!process.env.VERCEL) return
  if (process.env.RM_AUTO_MIGRATE_BLOB !== '1') return
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.POSTGRES_URL) return

  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const { countPendingMedia, migrateMediaBatch } = await import('./lib/migrate-blob')

  const payload = await getPayload({ config })
  const pending = await countPendingMedia(payload)
  if (pending === 0) return

  console.log(`[migrate-blob] ${pending} media pending, starting background migration`)

  void (async () => {
    let round = 0
    while (round < 80) {
      round++
      const result = await migrateMediaBatch(payload, 10)
      console.log(
        `[migrate-blob] batch ${round}: migrated=${result.migrated.length} remaining=${result.remaining}`,
      )
      if (result.done || result.migrated.length === 0) break
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    console.log('[migrate-blob] background migration finished')
  })()
}
