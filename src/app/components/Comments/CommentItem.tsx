'use client'
import { deleteComment, updateComment } from '@/actions/comments'
import { getInitials } from '@/utilities/getInitials'
import { formatDistance } from 'date-fns'
import { MoreHorizontalIcon } from 'lucide-react'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { Comment as CommentDoc, User } from 'src/payload-types'
import { openConfirmModal } from '../ModalsManager/modals-manager'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export interface CommentProps {
  comment: CommentDoc
  currentUser: User
}
export default function CommentItem(props: CommentProps) {
  const { comment, currentUser } = props

  //only admins and editors can delete comments
  //only admins and editors can mark comments as drafts
  const canDelete = useMemo(
    () =>
      currentUser
        ? currentUser.roles.includes('admin') || currentUser.roles.includes('editor')
        : false,
    [currentUser],
  )
  const canMarkAsDraft = useMemo(
    () =>
      currentUser
        ? currentUser.roles.includes('admin') || currentUser.roles.includes('editor')
        : false,
    [currentUser],
  )

  const handleDelete = async () => {
    //delete comment
    if (!canDelete) {
      return
    }
    const promise = deleteComment({ id: comment.id }).then((res) => {
      if (res.success) {
        //show success message
        toast.success('Success!', { description: res.message })
      } else {
        //show error message
        toast.error('Error!', { description: res.message })
      }
    })

    toast.promise(promise, { loading: 'Deleting comment...' })
  }

  const handleUpdateComment = async (data: {
    _status?: 'draft' | 'published'
    comment?: string
  }) => {
    //mark comment as draft
    if (!canMarkAsDraft) {
      return
    }
    const promise = updateComment({ id: comment.id, data }).then((res) => {
      if (res.success) {
        //show success message
        toast.success('Success!', { description: res.message })
      } else {
        //show error message
        toast.error('Error!', { description: res.message })
      }
    })

    toast.promise(promise, { loading: 'Updating comment...' })
  }
  return (
    <li className="flex items-start gap-4">
      <Avatar className="w-10 h-10 border relative ">
        <AvatarFallback>{getInitials(comment.populatedUser.name)}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{comment.populatedUser.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistance(comment.createdAt, new Date(), { addSuffix: true })}
          </div>
          {(canDelete || canMarkAsDraft) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {comment._status === 'draft' ? (
                  <DropdownMenuItem
                    onClick={() => {
                      openConfirmModal({
                        title: 'Publish Comment',
                        message:
                          'Are you sure you want to publish this comment? It will be visible to the public.',
                        onConfirm: () => handleUpdateComment({ _status: 'published' }),
                      })
                    }}
                  >
                    Publish
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => {
                      openConfirmModal({
                        title: 'Mark as Draft',
                        message:
                          'Are you sure you want to mark this comment as draft? It will not be visible to the public.',
                        onConfirm: () => handleUpdateComment({ _status: 'draft' }),
                      })
                    }}
                  >
                    Mark as Draft
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    openConfirmModal({
                      title: 'Delete Comment',
                      message:
                        'Are you sure you want to delete this comment? This action cannot be undone.',
                      onConfirm: handleDelete,
                    })
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="space-x-2">
          {comment.comment} {comment._status === 'draft' && <span>[draft]</span>}
        </div>
      </div>
    </li>
  )
}
