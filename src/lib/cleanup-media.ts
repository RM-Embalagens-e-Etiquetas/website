import type { Payload } from 'payload'

import { collectReferencedMediaIds } from './media-refs'
import { isBlobMediaUrl, isBrokenMediaUrl } from './storage-env'

export type MediaAudit = {
  total: number
  referenced: number
  orphans: number
  broken: number
  blob: number
}

export async function auditMedia(payload: Payload): Promise<MediaAudit> {
  const referenced = await collectReferencedMediaIds(payload)
  const all = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    pagination: false,
  })

  let orphans = 0
  let broken = 0
  let blob = 0

  for (const doc of all.docs) {
    const url = typeof doc.url === 'string' ? doc.url : ''
    if (isBlobMediaUrl(url)) blob++
    if (isBrokenMediaUrl(url)) broken++
    if (!referenced.has(doc.id)) orphans++
  }

  return {
    total: all.docs.length,
    referenced: referenced.size,
    orphans,
    broken,
    blob,
  }
}

export async function cleanupOrphanMedia(payload: Payload, options: { dryRun?: boolean } = {}) {
  const referenced = await collectReferencedMediaIds(payload)
  const all = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    pagination: false,
  })

  const toDelete = all.docs.filter((doc) => !referenced.has(doc.id))
  const deleted: Array<string | number> = []

  if (!options.dryRun) {
    for (const doc of toDelete) {
      await payload.delete({ collection: 'media', id: doc.id, overrideAccess: true })
      deleted.push(doc.id)
    }
  }

  return {
    dryRun: Boolean(options.dryRun),
    candidates: toDelete.length,
    deleted: deleted.length,
    deletedIds: deleted,
  }
}
