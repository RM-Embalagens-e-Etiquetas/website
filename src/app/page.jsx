import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import ProofStrip from '@/components/home/ProofStrip'
import Differentiators from '@/components/home/Differentiators'
import CatalogPreview from '@/components/home/CatalogPreview'
import AboutTeaser from '@/components/home/AboutTeaser'
import ContactCta from '@/components/ContactCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProofStrip />
      <Differentiators />
      <CatalogPreview />
      <AboutTeaser />
      <ContactCta />
    </>
  )
}
