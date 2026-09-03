import { getPayload } from 'payload'
import config from '@payload-config'
import { mediaUrl } from './media-url'

export { mediaUrl, staticPathFromFilename } from './media-url'

let cached = null

export async function getCms() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

export function logoUrl(company) {
  return mediaUrl(company?.logo) || '/logo.png'
}

export function whatsappUrl(digits) {
  const clean = String(digits || '').replace(/\D/g, '')
  return `https://wa.me/${clean || '5521964282763'}`
}

export async function getCompany() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'company', depth: 1 })
}

export async function getHomeConfig() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'home-config', depth: 2 })
}

/** @deprecated use getCompany */
export async function getSite() {
  return getCompany()
}

export async function getProductGroups() {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'product-groups',
    depth: 0,
    limit: 50,
    sort: 'order',
  })
  return result.docs
}

export async function getProductCategories() {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'product-categories',
    depth: 2,
    limit: 100,
    sort: 'order',
  })
  return result.docs
}

export async function getCategoryBySlug(slug) {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'product-categories',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getCategoriesByGroupId(groupId) {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'product-categories',
    where: { group: { equals: groupId } },
    depth: 2,
    limit: 50,
    sort: 'order',
  })
  return result.docs
}

export function categoryCover(category) {
  const items = category?.gallery || []
  for (const item of items) {
    const src = mediaUrl(item)
    if (src) return src
  }
  return null
}

export function galleryImages(category) {
  const items = category?.gallery || []
  return items
    .map((item, index) => {
      const src = mediaUrl(item)
      if (!src) return null
      return {
        src,
        alt: item.alt || `${category.title} — foto ${index + 1}`,
      }
    })
    .filter(Boolean)
}

export function resolveHomeSections(homeConfig) {
  const sections = homeConfig?.sections
  if (Array.isArray(sections) && sections.length > 0) {
    return sections.filter((item) => item?.enabled !== false && item?.section)
  }
  return null
}

export function resolveFeaturedGroups(homeConfig, allGroups) {
  const featured = homeConfig?.featuredGroups
  if (!Array.isArray(featured) || featured.length === 0) return allGroups

  const order = featured.map((group) => (typeof group === 'object' ? group.id : group))
  return order
    .map((id) => allGroups.find((group) => group.id === id))
    .filter(Boolean)
}

export function resolveMarqueeTitles(homeConfig, categories) {
  const selected = homeConfig?.marqueeCategories
  if (Array.isArray(selected) && selected.length > 0) {
    return selected.map((category) => (typeof category === 'object' ? category.title : null)).filter(Boolean)
  }
  return categories.map((category) => category.title)
}
