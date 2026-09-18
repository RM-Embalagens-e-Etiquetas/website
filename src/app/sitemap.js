import { getProductCategories } from '@/lib/cms'
import { getServerURL } from '@/lib/server-url'

/** @returns {Promise<import('next').MetadataRoute.Sitemap>} */
export default async function sitemap() {
  const base = getServerURL()
  const now = new Date()
  const staticPaths = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/produtos', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contato', priority: 0.8, changeFrequency: 'monthly' },
  ]

  let categories = []
  try {
    categories = await getProductCategories()
  } catch {
    categories = []
  }

  return [
    ...staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: path ? `${base}${path}` : base,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...categories.map((category) => ({
      url: `${base}/produtos/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    })),
  ]
}
