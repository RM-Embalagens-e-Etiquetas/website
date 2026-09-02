import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'
import { COPY } from '../lib/copy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const rowLabel = '/admin/RowLabel'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contato',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Páginas',
    description: 'Textos da página Contato. Telefone e Instagram ficam em Logo, menu e WhatsApp.',
    livePreview: {
      url: () => `${serverURL}/contato`,
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
          label: 'Textos',
          fields: [
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
              name: 'ctaLabel',
              type: 'text',
              label: 'Texto do botão do WhatsApp',
              defaultValue: 'Iniciar conversa no WhatsApp',
            },
            {
              name: 'whatsappTitle',
              type: 'text',
              label: 'Nome do WhatsApp na lista',
              admin: { description: `Se vazio: ${COPY.contactWhatsapp}` },
            },
            {
              name: 'instagramTitle',
              type: 'text',
              label: 'Nome do Instagram na lista',
              admin: { description: `Se vazio: ${COPY.contactInstagram}` },
            },
            {
              name: 'addressTitle',
              type: 'text',
              label: 'Nome do endereço na lista',
              admin: { description: `Se vazio: ${COPY.contactAddress}` },
            },
          ],
        },
        {
          label: 'Passos',
          admin: { description: 'Os 3 passos de como pedir um orçamento.' },
          fields: [
            {
              name: 'stepsTitle',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'stepsEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'steps',
              type: 'array',
              label: 'Passos',
              labels: { singular: 'Passo', plural: 'Passos' },
              minRows: 1,
              maxRows: 5,
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
          admin: { description: 'O que aparece na aba do navegador. Pode deixar como está.' },
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
