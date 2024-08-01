import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminsAndCreator: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  }
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    createdBy: {
      equals: user.id,
    },
  }
}
