import { Jost } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-jost',
})

export const metadata = {
  title: {
    default: 'RM Embalagens — Embalagens e Etiquetas Personalizadas',
    template: '%s',
  },
  description:
    'Fabricante e distribuidora de sacolas, etiquetas, tags e acabamentos personalizados para marcas em todo o Brasil.',
  keywords:
    'embalagens personalizadas, sacolas personalizadas, etiquetas, sacolas tnt, tags, chaveiros personalizados, rm embalagens, campo grande rj',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={jost.variable}>
      <head>
        <link rel="stylesheet" href="/fontawesome/css/all.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
