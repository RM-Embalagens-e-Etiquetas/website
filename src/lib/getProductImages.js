import fs from 'node:fs'
import path from 'node:path'

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'products')

export function getProductImages(slug) {
  const dir = path.join(PRODUCTS_DIR, slug)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file, index) => ({
      src: `/products/${slug}/${file}`,
      alt: `Foto ${index + 1}`,
    }))
}

export function getCategoryCover(slug) {
  const images = getProductImages(slug)
  return images[0]?.src ?? null
}
