import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'
import { COPY } from '../lib/copy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const rowLabel = '/admin/RowLabel'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Sobre a empresa',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Páginas',
    description: 'História, foto e valores da página Sobre.',
    livePreview: {
      url: () => `${serverURL}/sobre`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'História e foto',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Foto',
            },
            {
              name: 'eyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'lead',
              type: 'textarea',
              label: 'Texto de abertura',
              required: true,
            },
            {
              name: 'whoTitle',
              type: 'text',
              label: 'Título — quem somos',
            },
            {
              name: 'whoText',
              type: 'textarea',
              label: 'Texto — quem somos',
            },
            {
              name: 'businessTitle',
              type: 'text',
              label: 'Título — nosso negócio',
            },
            {
              name: 'businessText',
              type: 'textarea',
              label: 'Texto — nosso negócio',
            },
            {
              name: 'clientsTitle',
              type: 'text',
              label: 'Título — nossos clientes',
            },
            {
              name: 'clientsText',
              type: 'textarea',
              label: 'Texto — nossos clientes',
            },
            {
              name: 'instagramCta',
              type: 'text',
              label: 'Link para o Instagram',
              admin: { description: `Aparece no fim do texto dos clientes. Se vazio: ${COPY.instagramCta}` },
            },
          ],
        },
        {
          label: 'Valores',
          fields: [
            {
              name: 'valuesEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'valuesTitle',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'values',
              type: 'array',
              label: 'Valores',
              labels: { singular: 'Valor', plural: 'Valores' },
              admin: {
                components: { RowLabel: rowLabel },
              },
              fields: [
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'description', type: 'textarea', label: 'Texto', required: true },
              ],
            },
          ],
        },
        {
          label: 'Google',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'Título da aba',
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'Descrição no Google',
            },
          ],
        },
      ],
    },
  ],
}
