import type { CollectionConfig } from 'payload'
import { easyAdmin } from '../admin/easy'
import { setSlugFromTitle } from '../utilities/slug'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Produto',
    plural: 'Produtos',
  },
  lockDocuments: false,
  admin: {
    ...easyAdmin,
    useAsTitle: 'title',
    defaultColumns: ['title', 'group'],
    group: 'Catálogo',
    description: 'Os produtos ficam dentro das linhas do catálogo. Clique na foto para editar.',
    components: {
      Description: '/admin/DocGuide',
      beforeListTable: ['/admin/CategoryGallery'],
    },
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/produtos/${data?.slug || ''}`,
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [setSlugFromTitle],
  },
  fields: [
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      displayPreview: true,
      label: 'Fotos',
      admin: {
        description: 'Arraste as fotos para cá. A primeira vira a capa. Arraste para reordenar.',
        isSortable: true,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Nome do produto',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Texto que aparece no site',
      required: true,
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'product-groups',
      label: 'Linha do catálogo',
      required: true,
      admin: {
        appearance: 'select',
        allowCreate: false,
        allowEdit: false,
        description: 'Sacolas, Etiquetas, Tags ou Embalagens.',
      },
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
