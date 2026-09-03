import { Jost } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductGroups, getSite, logoUrl, whatsappUrl } from '@/lib/cms'
import '../globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-jost',
})

export const revalidate = 3600

export async function generateMetadata() {
  const site = await getSite()

  return {
    title: {
      default: site.defaultTitle || 'RM Embalagens — Embalagens e Etiquetas Personalizadas',
      template: '%s',
    },
    description:
      site.defaultDescription ||
      'Fabricante e distribuidora de sacolas, etiquetas, tags e acabamentos personalizados para marcas em todo o Brasil.',
    keywords: site.keywords || undefined,
    icons: {
      icon: '/logo.png',
    },
  }
}

export default async function FrontendLayout({ children }) {
  const [site, groups] = await Promise.all([getSite(), getProductGroups()])
  const waUrl = whatsappUrl(site.whatsapp)
  const logoSrc = logoUrl(site)

  return (
    <html lang="pt-BR" className={jost.variable}>
      <head>
        <link rel="stylesheet" href="/fontawesome/css/all.css" />
      </head>
      <body>
        <Header site={site} logoSrc={logoSrc} whatsappUrl={waUrl} />
        <main>{children}</main>
        <Footer site={site} logoSrc={logoSrc} groups={groups} whatsappUrl={waUrl} />
      </body>
    </html>
  )
}
