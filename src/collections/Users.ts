import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  lockDocuments: false,
  admin: {
    useAsTitle: 'email',
    group: 'Sistema',
    hidden: true,
    hideAPIURL: true,
  },
  auth: true,
  fields: [],
}
