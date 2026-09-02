export const COPY = {
  brandName: 'RM Embalagens',
  navHome: 'Início',
  navProducts: 'Produtos',
  navAbout: 'Sobre',
  navContact: 'Contato',
  headerCta: 'Solicitar orçamento',
  footerProducts: 'Produtos',
  footerInstitutional: 'Institucional',
  footerContact: 'Atendimento',
  footerAbout: 'Sobre a empresa',
  footerContactLink: 'Contato',
  footerInstagram: 'Instagram',
  footerCopyright: '© {year} RM Embalagens — Fabricante e distribuidora nacional',
  ctaWhatsapp: 'Falar no WhatsApp',
  ctaInstagram: 'Ver no Instagram',
  productOrder: 'Encomendar este produto',
  productBack: 'Voltar ao catálogo',
  relatedPrefix: 'Outras categorias em',
  galleryEmpty: 'Novas fotos desta categoria em breve.',
  instagramCta: 'Confira exemplos no nosso Instagram.',
  contactWhatsapp: 'WhatsApp',
  contactInstagram: 'Instagram',
  contactAddress: 'Localização',
  whatsappTitle: 'WhatsApp',
  instagramTitle: 'Instagram',
  addressTitle: 'Localização',
}

export function copy(doc, key) {
  const value = doc?.[key]
  if (typeof value === 'string' && value.trim()) return value.trim()
  return COPY[key]
}

export function copyright(site, year = new Date().getFullYear()) {
  return copy(site, 'footerCopyright').replace('{year}', String(year))
}
