import type { CollectionConfig } from 'payload'
import { setSlugFromTitle } from '../utilities/slug'
import { easyAdmin } from '../admin/easy'

export const ProductGroups: CollectionConfig = {
  slug: 'product-groups',
  labels: {
    singular: 'Linha',
    plural: 'Linhas do catálogo',
  },
  lockDocuments: false,
  admin: {
    ...easyAdmin,
    useAsTitle: 'title',
    defaultColumns: ['title'],
    group: 'Catálogo',
    description: 'Nome e texto desta linha na página Produtos. As fotos ficam em cada produto.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [setSlugFromTitle],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nome da linha',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Texto que aparece no site',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Posição na lista',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'O menor número aparece primeiro.',
      },
    },
  ],
}
