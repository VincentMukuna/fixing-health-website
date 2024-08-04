'use client'
import { createComment } from '@/actions/comments'
import { useAuth } from '@/providers/Auth/auth-provider'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, buttonVariants } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

const createCommentSchema = z.object({
  comment: z.string().min(1),
})

type CommentFormProps = {
  docId: string | number
}

export default function CommentForm({ docId }: CommentFormProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const { reset, ...form } = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof createCommentSchema>) => {
      if (!user) return
      const promise = createComment({ comment: data.comment, docId }).then((res) => {
        if (res.success) {
          reset()
          toast.success('Success!', { description: res.message })
        } else {
          toast.error('Error!', { description: res.message })
        }
      })
      toast.promise(promise, { loading: 'Submitting comment...' })
    },
    [user, docId, reset],
  )

  return (
    <Form {...form} reset={reset}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 py-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts and feedback with the community."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user ? (
            <Button type="submit" disabled={form.formState.isLoading} className="self-start">
              {form.formState.isLoading ? 'Processing' : 'Submit'}
            </Button>
          ) : (
            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className={cn(buttonVariants(), 'self-start')}
            >
              Login to comment
            </Link>
          )}
        </div>
      </form>
    </Form>
  )
}
