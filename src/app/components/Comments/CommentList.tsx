import { getInitials } from '@/utilities/getnitials'
import { formatDistance } from 'date-fns'
import { PaginatedDocs } from 'payload'
import { Comment } from 'src/payload-types'
import { Avatar, AvatarFallback } from '../ui/avatar'
import CommentForm from './CommentForm'

export type CommentListProps = {
  docId: string | number
  commentDocs: PaginatedDocs<Comment>
}
export default function CommentList(props: CommentListProps) {
  const { commentDocs, docId } = props
  const comments = commentDocs.docs
  return (
    <div className="flex flex-col gap-6 container lg:max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold ">Comments:</h2>
      <ul className="grid gap-4 border-none">
        {comments.map((comment) => {
          return (
            <li key={comment.id} className="space-y-2">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>{getInitials(comment.populatedUser.name)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{comment.populatedUser.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistance(comment.createdAt, new Date(), { addSuffix: true })}
                    </div>
                  </div>
                  <div className="space-x-2">
                    {comment.comment} {comment._status === 'draft' && <span>[draft]</span>}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <CommentForm docId={docId} />
    </div>
  )
}
