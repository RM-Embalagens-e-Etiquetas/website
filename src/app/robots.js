import { getServerURL } from '@/lib/server-url'

/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  const base = getServerURL()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
