import type { Payload } from 'payload'

import { blobUrlIsReachable } from './blob-reachable'

function mediaId(value: unknown) {
  if (value && typeof value === 'object' && 'id' in value) return (value as { id: number | string }).id
  if (typeof value === 'number' || typeof value === 'string') return value
  return null
}

export async function removeUnreachableMedia(payload: Payload, apply: boolean) {
  const media = await payload.find({ collection: 'media', depth: 0, limit: 500 })
  const broken = new Set<string>()
  const kept = new Set<string>()

  for (const doc of media.docs) {
    const url = typeof doc.url === 'string' ? doc.url : ''
    const ok = await blobUrlIsReachable(url)
    const id = String(doc.id)
    if (ok) kept.add(id)
    else broken.add(id)
  }

  const categories = await payload.find({ collection: 'product-categories', depth: 0, limit: 200 })
  const galleryUpdates: Array<{ id: number | string; slug: string; removed: number; left: number }> = []

  for (const category of categories.docs) {
    const gallery = Array.isArray(category.gallery) ? category.gallery : []
    const next = gallery
      .map((item) => mediaId(item))
      .filter((id): id is number | string => id != null && !broken.has(String(id)))
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id))
    const removed = gallery.length - next.length
    if (removed === 0) continue
    galleryUpdates.push({
      id: category.id,
      slug: String(category.slug),
      removed,
      left: next.length,
    })
    if (apply) {
      await payload.update({
        collection: 'product-categories',
        id: category.id,
        data: { gallery: next },
        overrideAccess: true,
        context: { skipRevalidate: true },
      })
    }
  }

  const company = await payload.findGlobal({ slug: 'company', depth: 0 })
  const home = await payload.findGlobal({ slug: 'home-config', depth: 0 })
  const logoId = mediaId(company.logo)
  const heroId = mediaId(home.heroImage)
  const aboutId = mediaId(home.aboutImage)
  const proof = Array.isArray(home.proofImages) ? home.proofImages : []
  const nextProof = proof
    .map((item) => mediaId(item))
    .filter((id): id is number | string => id != null && !broken.has(String(id)))
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id))

  const companyPatch: Record<string, null> = {}
  if (logoId != null && broken.has(String(logoId))) companyPatch.logo = null
  const homePatch: Record<string, unknown> = {}
  if (heroId != null && broken.has(String(heroId))) homePatch.heroImage = null
  if (aboutId != null && broken.has(String(aboutId))) homePatch.aboutImage = null
  if (nextProof.length !== proof.length) homePatch.proofImages = nextProof

  if (apply && Object.keys(companyPatch).length > 0) {
    await payload.updateGlobal({
      slug: 'company',
      data: companyPatch,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
  }
  if (apply && Object.keys(homePatch).length > 0) {
    await payload.updateGlobal({
      slug: 'home-config',
      data: homePatch,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
  }

  let deleted = 0
  if (apply) {
    for (const id of broken) {
      await payload.delete({
        collection: 'media',
        id,
        overrideAccess: true,
        context: { skipRevalidate: true },
      })
      deleted += 1
    }
  }

  return {
    total: media.totalDocs,
    reachable: kept.size,
    broken: broken.size,
    deleted,
    galleryUpdates,
    companyCleared: Object.keys(companyPatch),
    homeCleared: Object.keys(homePatch),
  }
}
