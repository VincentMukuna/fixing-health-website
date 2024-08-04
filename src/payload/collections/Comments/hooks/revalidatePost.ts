import { revalidatePath } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'
import { Comment } from 'src/payload-types'

// Revalidate the post that is associated with this comment
export const revalidatePost: CollectionAfterChangeHook<Comment> = async ({
  doc: commentDoc,
  req: { payload },
}) => {
  if (commentDoc._status === 'published' && commentDoc.doc) {
    // lookup the full parent doc to get the slug
    if (typeof commentDoc.doc === 'string') {
      const parentDoc = await payload.findByID({
        id: commentDoc.doc,
        collection: 'posts',
        depth: 0,
      })

      if (parentDoc) {
        const path = `/posts/${parentDoc.slug}`
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      } else {
        payload.logger.error(
          `Parent doc for comment '${commentDoc.id}' was not found, could not revalidate`,
        )
      }
    }
  }

  return commentDoc
}
