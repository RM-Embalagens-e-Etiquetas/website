import type { Payload } from 'payload'

function addId(set: Set<string | number>, value: unknown) {
  if (value == null) return
  if (typeof value === 'object' && value !== null && 'id' in value) {
    set.add((value as { id: string | number }).id)
    return
  }
  if (typeof value === 'string' || typeof value === 'number') set.add(value)
}

function addMany(set: Set<string | number>, values: unknown) {
  if (!Array.isArray(values)) return
  for (const item of values) addId(set, item)
}

export async function collectReferencedMediaIds(payload: Payload) {
  const ids = new Set<string | number>()

  const [categories, company, homeConfig] = await Promise.all([
    payload.find({ collection: 'product-categories', depth: 2, limit: 200 }),
    payload.findGlobal({ slug: 'company', depth: 1 }),
    payload.findGlobal({ slug: 'home-config', depth: 2 }),
  ])

  for (const category of categories.docs) {
    addMany(ids, category.gallery)
  }

  addId(ids, company?.logo)

  addId(ids, homeConfig?.heroImage)
  addMany(ids, homeConfig?.proofImages)
  addId(ids, homeConfig?.aboutImage)

  return ids
}
