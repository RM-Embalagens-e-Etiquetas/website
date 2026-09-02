import type { GlobalConfig } from 'payload'
import { easyGlobal } from '../admin/easy'
import { COPY } from '../lib/copy'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Logo, menu e WhatsApp',
  lockDocuments: false,
  admin: {
    ...easyGlobal,
    group: 'Empresa',
    description: 'Logo, menu, WhatsApp, Instagram, endereço, rodapé e botões do site inteiro.',
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
          label: 'Marca e menu',
          admin: { description: 'Logo, nome da empresa e textos do menu no topo do site.' },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              displayPreview: true,
              label: 'Logo',
              admin: { description: 'Aparece no topo e no rodapé. Se vazio, usa o logo atual.' },
            },
            {
              name: 'brandName',
              type: 'text',
              label: 'Nome da empresa',
              admin: { description: `Se vazio: ${COPY.brandName}` },
            },
            {
              name: 'navHome',
              type: 'text',
              label: 'Menu — Início',
              admin: { description: `Se vazio: ${COPY.navHome}` },
            },
            {
              name: 'navProducts',
              type: 'text',
              label: 'Menu — Produtos',
              admin: { description: `Se vazio: ${COPY.navProducts}` },
            },
            {
              name: 'navAbout',
              type: 'text',
              label: 'Menu — Sobre',
              admin: { description: `Se vazio: ${COPY.navAbout}` },
            },
            {
              name: 'navContact',
              type: 'text',
              label: 'Menu — Contato',
              admin: { description: `Se vazio: ${COPY.navContact}` },
            },
            {
              name: 'headerCta',
              type: 'text',
              label: 'Botão do menu (WhatsApp)',
              admin: { description: `Se vazio: ${COPY.headerCta}` },
            },
          ],
        },
        {
          label: 'WhatsApp e redes',
          admin: { description: 'Telefone, WhatsApp, Instagram e endereço. Aparecem em várias páginas.' },
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefone que aparece no site',
              required: true,
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'Número do WhatsApp',
              required: true,
              admin: {
                description: 'Só números, com DDI. Ex.: 5521964282763',
              },
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
              admin: {
                description: 'Ex.: @rmembalagens',
              },
            },
            {
              name: 'address',
              type: 'text',
              label: 'Cidade / endereço',
              required: true,
            },
          ],
        },
        {
          label: 'Rodapé',
          admin: { description: 'Textos da faixa preta no final de todas as páginas.' },
          fields: [
            {
              name: 'footerBlurb',
              type: 'textarea',
              label: 'Texto ao lado do logo',
              required: true,
            },
            {
              name: 'footerProducts',
              type: 'text',
              label: 'Título da coluna de produtos',
              admin: { description: `Se vazio: ${COPY.footerProducts}` },
            },
            {
              name: 'footerInstitutional',
              type: 'text',
              label: 'Título da coluna institucional',
              admin: { description: `Se vazio: ${COPY.footerInstitutional}` },
            },
            {
              name: 'footerContact',
              type: 'text',
              label: 'Título da coluna de atendimento',
              admin: { description: `Se vazio: ${COPY.footerContact}` },
            },
            {
              name: 'footerAbout',
              type: 'text',
              label: 'Link Sobre',
              admin: { description: `Se vazio: ${COPY.footerAbout}` },
            },
            {
              name: 'footerContactLink',
              type: 'text',
              label: 'Link Contato',
              admin: { description: `Se vazio: ${COPY.footerContactLink}` },
            },
            {
              name: 'footerInstagram',
              type: 'text',
              label: 'Link Instagram',
              admin: { description: `Se vazio: ${COPY.footerInstagram}` },
            },
            {
              name: 'footerCopyright',
              type: 'text',
              label: 'Linha de copyright',
              admin: { description: 'Use {year} para o ano atual. Se vazio, usa o texto padrão.' },
            },
          ],
        },
        {
          label: 'Botões do site',
          admin: { description: 'Textos dos botões que se repetem no site.' },
          fields: [
            {
              name: 'ctaWhatsapp',
              type: 'text',
              label: 'Botão WhatsApp (faixa final)',
              admin: { description: `Se vazio: ${COPY.ctaWhatsapp}` },
            },
            {
              name: 'ctaInstagram',
              type: 'text',
              label: 'Botão Instagram (faixa final)',
              admin: { description: `Se vazio: ${COPY.ctaInstagram}` },
            },
            {
              name: 'productOrder',
              type: 'text',
              label: 'Botão de encomendar produto',
              admin: { description: `Se vazio: ${COPY.productOrder}` },
            },
            {
              name: 'productBack',
              type: 'text',
              label: 'Botão de voltar ao catálogo',
              admin: { description: `Se vazio: ${COPY.productBack}` },
            },
            {
              name: 'relatedPrefix',
              type: 'text',
              label: 'Título dos produtos relacionados',
              admin: { description: `Aparece como “${COPY.relatedPrefix} Sacolas”.` },
            },
            {
              name: 'galleryEmpty',
              type: 'text',
              label: 'Aviso quando não há foto',
              admin: { description: `Se vazio: ${COPY.galleryEmpty}` },
            },
          ],
        },
        {
          label: 'Página de produtos',
          admin: { description: 'Título e texto do topo da página Produtos.' },
          fields: [
            {
              name: 'catalogPageEyebrow',
              type: 'text',
              label: 'Frase pequena',
            },
            {
              name: 'catalogPageTitle',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'catalogPageLead',
              type: 'textarea',
              label: 'Texto',
            },
          ],
        },
        {
          label: 'Google',
          admin: { description: 'O que aparece na aba do navegador e no Google. Pode deixar como está.' },
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              label: 'Título da aba',
              required: true,
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: 'Descrição no Google',
              required: true,
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Palavras-chave',
            },
            {
              name: 'catalogSeoTitle',
              type: 'text',
              label: 'Título da aba em Produtos',
            },
            {
              name: 'catalogSeoDescription',
              type: 'textarea',
              label: 'Descrição da página de produtos',
            },
            {
              name: 'mapEmbedUrl',
              type: 'textarea',
              label: 'Mapa (link do Google Maps)',
            },
          ],
        },
      ],
    },
  ],
}
