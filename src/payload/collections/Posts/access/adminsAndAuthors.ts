import { Access } from 'payload'
import { checkRole } from '../../../access/checkRole'

const adminsAndAuthors: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      authors: {
        contains: user.id,
      },
    }
  }

  return false
}

export default adminsAndAuthors
