import type { CollectionConfig } from 'payload'

import admin from 'src/payload/access/admin'
import { checkRole } from 'src/payload/access/checkRole'
import adminsAndUser from './access/adminsAndUser'
import adminsOrAnon from './access/adminsOrAnon'
import { protectRoles } from './access/protectRoles'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin', 'author', 'contributor', 'editor'], user),
    create: adminsOrAnon,
    delete: admin,
    read: adminsAndUser,
    update: adminsAndUser,
    unlock: admin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'Contributor',
          value: 'contributor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
}

export default Users
