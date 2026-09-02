import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const rowLabel = '/admin/RowLabel'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Início',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Páginas',
    description: 'O que aparece quando alguém abre o site.',
    livePreview: {
      url: () => serverURL,
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
          label: 'Banner',
          admin: { description: 'Foto grande e textos do topo.' },
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Foto de fundo',
              admin: { description: 'A foto grande do topo do site.' },
            },
            {
              name: 'heroEyebrow',
              type: 'text',
              label: 'Frase pequena acima do título',
              required: true,
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Título grande',
              required: true,
            },
            {
              name: 'heroAccent',
              type: 'text',
              label: 'Palavra pintada no título',
              admin: {
                description: 'Ex.: identidade',
              },
            },
            {
              name: 'heroLead',
              type: 'textarea',
              label: 'Texto embaixo do título',
              required: true,
            },
            {
              name: 'heroPrimaryLabel',
              type: 'text',
              label: 'Botão branco',
              defaultValue: 'Ver catálogo completo',
            },
            {
              name: 'heroSecondaryLabel',
              type: 'text',
              label: 'Botão transparente',
              defaultValue: 'Solicitar orçamento',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Números embaixo do banner',
              labels: { singular: 'Número', plural: 'Números' },
              admin: {
                description: 'Aparecem logo abaixo da foto grande.',
                components: { RowLabel: rowLabel },
              },
              fields: [
                { name: 'value', type: 'text', label: 'Número', required: true },
                { name: 'label', type: 'text', label: 'O que significa', required: true },
              ],
            },
          ],
        },
        {
          label: 'Faixa de fotos',
          admin: { description: 'A fileira de fotos logo abaixo do banner.' },
          fields: [
            {
              name: 'proofImages',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              displayPreview: true,
              label: 'Fotos da faixa',
              admin: {
                description: 'Arraste as fotos. Elas passam na faixa da home.',
                isSortable: true,
              },
            },
            {
              name: 'proofLabel',
              type: 'text',
              label: 'Legenda da faixa',
              defaultValue: 'Prova fotográfica — 01',
            },
          ],
        },
        {
          label: 'Diferenciais',
          admin: { description: 'Os cartões com os diferenciais da empresa.' },
          fields: [
            {
              name: 'differentiatorsTitle',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'differentiatorsEyebrow',
              type: 'text',
              label: 'Frase pequena acima',
            },
            {
              name: 'differentiators',
              type: 'array',
              label: 'Cartões',
              labels: { singular: 'Cartão', plural: 'Cartões' },
              admin: {
                components: { RowLabel: rowLabel },
              },
              fields: [
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'description', type: 'textarea', label: 'Texto', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Ícone',
                  options: [
                    { label: 'Caixas', value: 'fa-boxes-alt' },
                    { label: 'Cores', value: 'fa-swatchbook' },
                    { label: 'Caminhão', value: 'fa-truck' },
                    { label: 'Conversa', value: 'fa-comments-alt' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Catálogo',
          admin: { description: 'Bloco que apresenta as linhas de produtos na home.' },
          fields: [
            {
              name: 'catalogTitle',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'catalogEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'catalogLead',
              type: 'textarea',
              label: 'Texto',
            },
            {
              name: 'catalogButtonLabel',
              type: 'text',
              label: 'Texto do botão',
              defaultValue: 'Explorar catálogo completo',
            },
          ],
        },
        {
          label: 'Sobre',
          admin: { description: 'O bloco da empresa na home. A página Sobre é outra.' },
          fields: [
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Foto',
            },
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'aboutEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'aboutText',
              type: 'textarea',
              label: 'Texto',
              required: true,
            },
            {
              name: 'aboutLinkLabel',
              type: 'text',
              label: 'Texto do link',
              defaultValue: 'Conheça nossa história',
            },
          ],
        },
        {
          label: 'Final da página',
          admin: { description: 'Chamada para WhatsApp no rodapé da home.' },
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'ctaEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'ctaText',
              type: 'textarea',
              label: 'Texto',
            },
            {
              name: 'ctaWhatsapp',
              type: 'text',
              label: 'Botão do WhatsApp',
              admin: { description: 'Se vazio, usa o texto de Marca e contato.' },
            },
            {
              name: 'ctaInstagram',
              type: 'text',
              label: 'Botão do Instagram',
              admin: { description: 'Se vazio, usa o texto de Marca e contato.' },
            },
          ],
        },
      ],
    },
  ],
}
