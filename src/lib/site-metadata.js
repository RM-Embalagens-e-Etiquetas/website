import { SEO } from '@/lib/copy'
import { getServerURL } from '@/lib/server-url'

export function siteUrl() {
  return getServerURL()
}

/** Metadados compartilhados do site público (Open Graph, Twitter, canonical base). */
export function baseSiteMetadata() {
  const url = siteUrl()
  return {
    metadataBase: new URL(url),
    title: {
      default: SEO.defaultTitle,
      template: '%s',
    },
    description: SEO.defaultDescription,
    keywords: SEO.keywords,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'RM Embalagens',
      url,
      title: SEO.defaultTitle,
      description: SEO.defaultDescription,
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'RM Embalagens',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SEO.defaultTitle,
      description: SEO.defaultDescription,
      images: ['/logo.png'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/logo.png',
    },
  }
}

/** Metadados por rota (title/description já prontos em copy.js). */
export function pageMetadata({ title, description, path = '/', image }) {
  const canonical = new URL(path, siteUrl()).toString()
  const imagePath = image || '/logo.png'
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: imagePath, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [imagePath],
    },
  }
}
