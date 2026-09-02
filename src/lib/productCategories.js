export const PRODUCT_GROUPS = [
  {
    slug: 'sacolas',
    title: 'Sacolas',
    description:
      'Sacolas plásticas, em TNT e em algodão, produzidas e personalizadas com a identidade da sua marca.',
  },
  {
    slug: 'etiquetas',
    title: 'Etiquetas',
    description:
      'Etiquetas adesivas, emborrachadas, bordadas e em DTF para roupas, acessórios e embalagens.',
  },
  {
    slug: 'tags-e-acessorios',
    title: 'Tags & Acessórios',
    description:
      'Tags, chaveiros, lacres de segurança, acabamentos metálicos e demais itens complementares.',
  },
  {
    slug: 'embalagens',
    title: 'Embalagens',
    description:
      'Caixas personalizadas e papel de seda para finalizar a experiência de compra com sofisticação.',
  },
]

export const PRODUCT_CATEGORIES = [
  {
    slug: 'sacolas-alca-vazada',
    title: 'Sacolas Alça Vazada',
    group: 'sacolas',
    description:
      'Sacolas plásticas com alça vazada, ideais para lojas de moda e varejo. Resistentes e impressas com a arte da sua marca.',
  },
  {
    slug: 'sacolas-alca-fita',
    title: 'Sacolas Alça Fita',
    group: 'sacolas',
    description:
      'Sacolas plásticas com alça em fita, acabamento reforçado e ótimo custo-benefício para o dia a dia da loja.',
  },
  {
    slug: 'sacolas-alca-cadeado',
    title: 'Sacolas Alça Cadeado',
    group: 'sacolas',
    description:
      'Modelo com alça em formato de cadeado, leve e prático, muito utilizado em confecções e franquias.',
  },
  {
    slug: 'sacolas-tnt',
    title: 'Sacolas em TNT',
    group: 'sacolas',
    description:
      'Sacolas em TNT nas cores e tamanhos que sua marca precisar, com impressão de alta durabilidade.',
  },
  {
    slug: 'sacolas-algodao',
    title: 'Sacolas de Algodão',
    group: 'sacolas',
    description:
      'Sacolas de algodão cru, sustentáveis e versáteis, com acabamento premium para marcas que valorizam a experiência.',
  },
  {
    slug: 'etiquetas-adesivas',
    title: 'Etiquetas Adesivas',
    group: 'etiquetas',
    description:
      'Etiquetas adesivas personalizadas para embalagens, cartões e materiais de identificação da sua marca.',
  },
  {
    slug: 'etiquetas-emborrachadas',
    title: 'Etiquetas Emborrachadas',
    group: 'etiquetas',
    description:
      'Etiquetas em silicone emborrachado, com relevo e alta definição de cor — acabamento de moda premium.',
  },
  {
    slug: 'etiquetas-dtf',
    title: 'Etiquetas em DTF',
    group: 'etiquetas',
    description:
      'Etiquetas em DTF (transfer digital), com cores vibrantes e ótima aderência em tecidos diversos.',
  },
  {
    slug: 'etiquetas-bordadas',
    title: 'Etiquetas Bordadas',
    group: 'etiquetas',
    description:
      'Etiquetas bordadas com acabamento sofisticado, ideais para marcas de moda que buscam requinte nos detalhes.',
  },
  {
    slug: 'tags',
    title: 'Tags Personalizadas',
    group: 'tags-e-acessorios',
    description:
      'Tags em papel e material especial, com recortes exclusivos para valorizar a apresentação do seu produto.',
  },
  {
    slug: 'tags-brinco',
    title: 'Tags para Brincos',
    group: 'tags-e-acessorios',
    description:
      'Cartelas e tags específicas para exposição e venda de brincos e pequenos acessórios.',
  },
  {
    slug: 'chaveiros',
    title: 'Chaveiros Personalizados',
    group: 'tags-e-acessorios',
    description:
      'Chaveiros bordados e emborrachados, ótimos como brinde ou item complementar da sua marca.',
  },
  {
    slug: 'lacres-seguranca',
    title: 'Lacres de Segurança',
    group: 'tags-e-acessorios',
    description:
      'Lacres de segurança nas cores da sua marca, para reforçar a proteção e a confiança na entrega.',
  },
  {
    slug: 'acabamentos-metalicos',
    title: 'Acabamentos Metálicos',
    group: 'tags-e-acessorios',
    description:
      'Rebites, botões e acabamentos metálicos personalizados, com gravação exclusiva da sua marca.',
  },
  {
    slug: 'papel-seda',
    title: 'Papel de Seda',
    group: 'embalagens',
    description:
      'Papel de seda personalizado para embrulhar produtos com delicadeza e reforçar a identidade visual.',
  },
  {
    slug: 'caixas',
    title: 'Caixas Personalizadas',
    group: 'embalagens',
    description:
      'Caixas de papelão em diversos tamanhos, personalizadas para envio e apresentação dos seus produtos.',
  },
]

export function getCategoryBySlug(slug) {
  return PRODUCT_CATEGORIES.find((category) => category.slug === slug)
}

export function getCategoriesByGroup(groupSlug) {
  return PRODUCT_CATEGORIES.filter((category) => category.group === groupSlug)
}
