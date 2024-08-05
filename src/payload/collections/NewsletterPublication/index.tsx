import { CollectionConfig } from 'payload'
import { checkRole } from 'src/payload/access/checkRole'

const NewsletterPublication: CollectionConfig = {
  slug: 'newsletters',
  access: {
    // Admins and editors can create publications
    create: ({ req: { user }, data }) => {
      return Boolean(checkRole(['admin', 'editor']))
    },

    // Admins and editors can edit publications
    update: ({ req: { user }, data }) => {
      return Boolean(checkRole(['admin', 'editor']))
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      label: 'Body',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'not_sent',
      hasMany: false,
      options: [
        {
          label: 'Sent',
          value: 'sent',
        },
        {
          label: 'Not Sent',
          value: 'not_sent',
        },
      ],
    },
  ],
}
