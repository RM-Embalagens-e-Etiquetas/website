import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const rowLabel = '/admin/RowLabel'

const SECTION_OPTIONS = [
  { label: 'Faixa com nomes dos produtos', value: 'marquee' },
  { label: 'Faixa de fotos', value: 'proof' },
  { label: 'Diferenciais', value: 'differentiators' },
  { label: 'Prévia do catálogo', value: 'catalog' },
  { label: 'Resumo sobre a empresa', value: 'about-teaser' },
  { label: 'Chamada WhatsApp', value: 'contact-cta' },
]

export const HomeConfig: GlobalConfig = {
  slug: 'home-config',
  label: 'Configuração da home',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Negócio',
    description: 'Quais seções aparecem, destaques, fotos e conteúdo de negócio da página inicial.',
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
          label: 'Seções',
          admin: { description: 'Escolha quais blocos aparecem na home e em qual ordem.' },
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Seções da página inicial',
              labels: { singular: 'Seção', plural: 'Seções' },
              admin: {
                components: { RowLabel: rowLabel },
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'section',
                  type: 'select',
                  label: 'Bloco',
                  required: true,
                  options: SECTION_OPTIONS,
                },
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Mostrar',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'featuredGroups',
              type: 'relationship',
              relationTo: 'product-groups',
              hasMany: true,
              label: 'Linhas em destaque no catálogo',
              admin: {
                description: 'Opcional. Se vazio, mostra todas as linhas na ordem padrão.',
              },
            },
            {
              name: 'marqueeCategories',
              type: 'relationship',
              relationTo: 'product-categories',
              hasMany: true,
              label: 'Produtos na faixa animada',
              admin: {
                description: 'Opcional. Se vazio, usa todos os produtos do catálogo.',
              },
            },
          ],
        },
        {
          label: 'Banner',
          admin: { description: 'Foto de fundo e números de destaque.' },
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Foto de fundo',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Números em destaque',
              labels: { singular: 'Número', plural: 'Números' },
              admin: { components: { RowLabel: rowLabel } },
              fields: [
                { name: 'value', type: 'text', label: 'Número', required: true },
                { name: 'label', type: 'text', label: 'Descrição', required: true },
              ],
            },
          ],
        },
        {
          label: 'Faixa de fotos',
          fields: [
            {
              name: 'proofImages',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              displayPreview: true,
              label: 'Fotos',
              admin: { isSortable: true },
            },
            {
              name: 'proofLabel',
              type: 'text',
              label: 'Legenda',
              defaultValue: 'Prova fotográfica — 01',
            },
          ],
        },
        {
          label: 'Diferenciais',
          admin: { description: 'Cartões com os diferenciais da empresa.' },
          fields: [
            {
              name: 'differentiators',
              type: 'array',
              label: 'Cartões',
              labels: { singular: 'Cartão', plural: 'Cartões' },
              admin: { components: { RowLabel: rowLabel } },
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
          label: 'Sobre (resumo)',
          admin: { description: 'Bloco resumido na home. A página Sobre completa é definida no site.' },
          fields: [
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Foto',
            },
            {
              name: 'aboutText',
              type: 'textarea',
              label: 'Texto sobre a empresa',
            },
          ],
        },
        {
          label: 'Chamada final',
          admin: { description: 'Mensagem promocional antes do rodapé.' },
          fields: [
            {
              name: 'ctaText',
              type: 'textarea',
              label: 'Mensagem',
              admin: { description: 'Texto de convite para contato. Título e botões vêm do site.' },
            },
            {
              name: 'notice',
              type: 'group',
              label: 'Aviso temporário',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Mostrar aviso',
                  defaultValue: false,
                },
                { name: 'text', type: 'text', label: 'Texto do aviso' },
                { name: 'link', type: 'text', label: 'Link (opcional)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
