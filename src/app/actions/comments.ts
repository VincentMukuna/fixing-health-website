'use server'

import { getMeUser } from '@/utilities/getMeUser'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { revalidatePath } from 'next/cache'

export async function createComment(data: { comment: string; docId: number }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { user } = await getMeUser()
  try {
    const comment = await payload.create({
      collection: 'comments',
      data: {
        comment: data.comment,
        _status: 'draft',
        user: user.id,
        doc: data.docId,
      },
    })
    const slug = typeof comment.doc === 'object' ? comment.doc?.slug : comment.doc
    revalidatePath(`/posts/${slug}`)
    return {
      success: true,
      message: 'Comment submitted for moderation',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function deleteComment({ id }) {
  const payload = await getPayloadHMR({ config: configPromise })
  try {
    const comment = await payload.delete({
      collection: 'comments',
      id: id,
    })
    const slug = typeof comment.doc === 'object' ? comment.doc.slug : comment.doc
    revalidatePath(`/posts/${slug}`)
    return {
      success: true,
      message: 'Comment deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function updateComment({
  id,
  data,
}: {
  id: string | number
  data: { comment?: string; _status?: 'draft' | 'published' }
}) {
  const payload = await getPayloadHMR({ config: configPromise })
  try {
    const comment = await payload.update({
      collection: 'comments',
      id,
      data,
    })
    const slug = typeof comment.doc === 'object' ? comment.doc.slug : comment.doc
    revalidatePath(`/posts/${slug}`)
    return {
      success: true,
      message: 'Comment updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
