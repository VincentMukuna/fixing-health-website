import { Access } from 'payload'
import { checkRole } from 'src/payload/access/checkRole'

const adminsOrAnon: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
    return false
  }

  return true
}

export default adminsOrAnon
