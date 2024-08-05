import { CollectionConfig } from 'payload'
import { anyone } from 'src/payload/access/anyone'

const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  access: {
    create: anyone,
  },
  fields: [
    {
      name: 'email',
      label: 'Subscriber Email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}

export default NewsletterSubscribers
