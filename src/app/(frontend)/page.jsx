import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import ProofStrip from '@/components/home/ProofStrip'
import Differentiators from '@/components/home/Differentiators'
import CatalogPreview from '@/components/home/CatalogPreview'
import AboutTeaser from '@/components/home/AboutTeaser'
import ContactCta from '@/components/ContactCta'
import {
  categoryCover,
  getHome,
  getProductCategories,
  getProductGroups,
  getSite,
  mediaUrl,
  whatsappUrl,
} from '@/lib/cms'

export default async function HomePage() {
  const [home, site, groups, categories] = await Promise.all([
    getHome(),
    getSite(),
    getProductGroups(),
    getProductCategories(),
  ])

  const waUrl = whatsappUrl(site.whatsapp)
  const marqueeTitles = categories.map((category) => category.title)
  const proofImages = (home.proofImages || []).map(mediaUrl).filter(Boolean)

  const previewGroups = groups.map((group) => {
    const groupCategories = categories.filter((category) => {
      const related = category.group
      const groupId = typeof related === 'object' ? related.id : related
      return groupId === group.id
    })
    return {
      ...group,
      count: groupCategories.length,
      cover: categoryCover(groupCategories[0]),
    }
  })

  return (
    <>
      <Hero home={home} whatsappUrl={waUrl} />
      <Marquee titles={marqueeTitles} />
      <ProofStrip label={home.proofLabel} images={proofImages} />
      <Differentiators home={home} />
      <CatalogPreview home={home} groups={previewGroups} />
      <AboutTeaser home={home} />
      <ContactCta home={home} site={site} whatsappUrl={waUrl} />
    </>
  )
}
