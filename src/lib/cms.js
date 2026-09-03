import { getPayload } from 'payload'
import config from '@payload-config'
import { mediaUrl as resolveMediaUrl } from '@/lib/media-url'

let cached = null

export async function getCms() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

export function mediaUrl(doc) {
  return resolveMediaUrl(doc)
}

export function logoUrl(site) {
  return mediaUrl(site?.logo) || '/logo.png'
}

export function whatsappUrl(digits) {
  const clean = String(digits || '').replace(/\D/g, '')
  return `https://wa.me/${clean || '5521964282763'}`
}

export async function getSite() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'site', depth: 1 })
}

export async function getHome() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'home', depth: 2 })
}

export async function getAbout() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'about', depth: 1 })
}

export async function getContact() {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'contact', depth: 1 })
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
  const first = category?.gallery?.[0]
  return mediaUrl(first)
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
