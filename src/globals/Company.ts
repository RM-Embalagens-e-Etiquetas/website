import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const Company: GlobalConfig = {
  slug: 'company',
  label: 'Dados da empresa',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Empresa',
    description: 'Logo, telefone, WhatsApp, Instagram, endereço e texto do rodapé.',
    livePreview: {
      url: () => `${serverURL}/contato`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      displayPreview: true,
      label: 'Logo',
      admin: { description: 'Aparece no topo e no rodapé. Se vazio, usa o logo padrão do site.' },
    },
    {
      name: 'brandName',
      type: 'text',
      label: 'Nome da empresa',
      admin: { description: 'Opcional. Se vazio, usa o nome definido no site.' },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefone exibido no site',
      required: true,
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'Número do WhatsApp',
      required: true,
      admin: { description: 'Só números, com DDI. Ex.: 5521964282763' },
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Link do Instagram',
      required: true,
    },
    {
      name: 'instagramHandle',
      type: 'text',
      label: 'Nome do Instagram',
      admin: { description: 'Ex.: @rmembalagens' },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Cidade / endereço',
      required: true,
    },
    {
      name: 'footerBlurb',
      type: 'textarea',
      label: 'Texto ao lado do logo no rodapé',
      required: true,
    },
    {
      name: 'mapEmbedUrl',
      type: 'textarea',
      label: 'Mapa (link do Google Maps)',
      admin: { description: 'Opcional. Aparece na página de contato.' },
    },
  ],
}
