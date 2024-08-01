import type { CollectionBeforeChangeHook } from 'payload'

export const populateCreatedBy: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create') {
    if (req.data && !req.data.createdBy && req.user) {
      return {
        ...data,
        createdBy: req.user.id,
      }
    }
  }

  return data
}
