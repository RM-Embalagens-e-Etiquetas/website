import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import ProofStrip from '@/components/home/ProofStrip'
import Differentiators from '@/components/home/Differentiators'
import CatalogPreview from '@/components/home/CatalogPreview'
import AboutTeaser from '@/components/home/AboutTeaser'
import ContactCta from '@/components/ContactCta'
import { DEFAULT_HOME_SECTIONS } from '@/lib/copy'
import {
  categoryCover,
  getCompany,
  getHomeConfig,
  getProductCategories,
  getProductGroups,
  mediaUrl,
  resolveFeaturedGroups,
  resolveHomeSections,
  resolveMarqueeTitles,
  whatsappUrl,
} from '@/lib/cms'

function buildPreviewGroups(groups, categories) {
  return groups.map((group) => {
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
}

const SECTION_RENDERERS = {
  marquee: ({ homeConfig, categories }) => (
    <Marquee titles={resolveMarqueeTitles(homeConfig, categories)} />
  ),
  proof: ({ homeConfig }) => (
    <ProofStrip
      label={homeConfig.proofLabel}
      images={(homeConfig.proofImages || []).map(mediaUrl).filter(Boolean)}
    />
  ),
  differentiators: ({ homeConfig }) => <Differentiators config={homeConfig} />,
  catalog: ({ previewGroups }) => <CatalogPreview groups={previewGroups} />,
  'about-teaser': ({ homeConfig }) => <AboutTeaser config={homeConfig} />,
  'contact-cta': ({ homeConfig, company, waUrl }) => (
    <ContactCta config={homeConfig} company={company} whatsappUrl={waUrl} />
  ),
}

export default async function HomePage() {
  const [homeConfig, company, groups, categories] = await Promise.all([
    getHomeConfig(),
    getCompany(),
    getProductGroups(),
    getProductCategories(),
  ])

  const waUrl = whatsappUrl(company.whatsapp)
  const sections = resolveHomeSections(homeConfig) || DEFAULT_HOME_SECTIONS
  const featuredGroups = resolveFeaturedGroups(homeConfig, groups)
  const previewGroups = buildPreviewGroups(featuredGroups, categories)

  const context = { homeConfig, company, categories, previewGroups, waUrl }

  return (
    <>
      <Hero config={homeConfig} whatsappUrl={waUrl} />
      {sections.map((item) => {
        const render = SECTION_RENDERERS[item.section]
        if (!render) return null
        return <div key={item.section}>{render(context)}</div>
      })}
    </>
  )
}
