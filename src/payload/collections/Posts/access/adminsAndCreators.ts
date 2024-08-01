import { Access } from 'payload'
import { checkRole } from '../../../access/checkRole'

const adminsAndCreators: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'author', 'contributor'], user)) {
      return true
    }
  }

  return false
}

export default adminsAndCreators
