'use client'

import { useSearchParams } from 'next/navigation'
import { Message } from '../Message/Message'

export const RenderParams: React.FC<{
  params?: string[]
  message?: string
  className?: string
}> = ({ params = ['error', 'warning', 'success', 'message'], message, className }) => {
  const searchParams = useSearchParams()

  const messages: { variant: 'error' | 'warning' | 'success' | 'message'; message: string }[] =
    params
      .map((param) => {
        const value = searchParams.get(param)
        if (value) {
          return { variant: param as 'error' | 'message' | 'success' | 'warning', message: value }
        }
      })
      .filter(Boolean)

  if (messages.length) {
    return (
      <div className={className}>
        {messages.map((msg) => (
          <Message
            key={msg.message}
            variant={msg.variant}
            message={(message || 'PARAM')?.replace('PARAM', msg.message || '')}
          />
        ))}
      </div>
    )
  }

  return null
}
