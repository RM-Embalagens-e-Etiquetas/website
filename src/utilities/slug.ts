import type { CollectionBeforeValidateHook } from 'payload'

export function slugify(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'e')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const setSlugFromTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (data && !data.slug && data.title) {
    data.slug = slugify(data.title)
  }
  return data
}
