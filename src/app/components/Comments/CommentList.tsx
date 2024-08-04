import { getMeUser } from '@/utilities/getMeUser'
import { PaginatedDocs } from 'payload'
import { Comment } from 'src/payload-types'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

export type CommentListProps = {
  docId: string | number
  commentDocs: PaginatedDocs<Comment>
}
export default async function CommentList(props: CommentListProps) {
  const { commentDocs, docId } = props
  const comments = commentDocs.docs
  const { user } = await getMeUser()
  return (
    <div className="flex flex-col gap-6 container lg:max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold ">Comments:</h2>
      <ul className="grid gap-4 border-none">
        {comments.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} currentUser={user} />
        })}
      </ul>
      <CommentForm docId={Number(docId)} />
    </div>
  )
}
