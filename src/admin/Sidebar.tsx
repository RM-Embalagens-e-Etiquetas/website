import configPromise from '@payload-config'
import { getPayload } from 'payload'
import SidebarNav from './SidebarNav'

function groupId(value) {
  if (value && typeof value === 'object') return String(value.id)
  return String(value ?? '')
}

export default async function Sidebar() {
  const payload = await getPayload({ config: configPromise })
  const [groups, categories] = await Promise.all([
    payload.find({
      collection: 'product-groups',
      depth: 0,
      limit: 20,
      sort: 'order',
    }),
    payload.find({
      collection: 'product-categories',
      depth: 0,
      limit: 50,
      sort: 'order',
    }),
  ])

  return (
    <SidebarNav
      groups={groups.docs.map((group) => ({
        id: group.id,
        title: group.title,
        slug: group.slug,
        products: categories.docs
          .filter((category) => groupId(category.group) === String(group.id))
          .map((category) => ({
            id: category.id,
            title: category.title,
          })),
      }))}
    />
  )
}
