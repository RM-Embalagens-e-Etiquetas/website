import { Jost } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCompany, getProductGroups, logoUrl, whatsappUrl } from '@/lib/cms'
import { baseSiteMetadata } from '@/lib/site-metadata'
import '../globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-jost',
})

export const revalidate = 3600

export async function generateMetadata() {
  return baseSiteMetadata()
}

export default async function FrontendLayout({ children }) {
  const [company, groups] = await Promise.all([getCompany(), getProductGroups()])
  const waUrl = whatsappUrl(company.whatsapp)
  const logoSrc = logoUrl(company)

  return (
    <html lang="pt-BR" className={jost.variable}>
      <head>
        <link rel="stylesheet" href="/fontawesome/css/all.css" />
      </head>
      <body>
        <Header company={company} logoSrc={logoSrc} whatsappUrl={waUrl} />
        <main>{children}</main>
        <Footer company={company} logoSrc={logoSrc} groups={groups} whatsappUrl={waUrl} />
      </body>
    </html>
  )
}
