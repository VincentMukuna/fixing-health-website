import { cn } from '@/utilities/cn'
import { cva } from 'class-variance-authority'
import React, { forwardRef, Ref } from 'react'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

const gutterVariants = cva('max-w-screen-lg mx-auto', {
  defaultVariants: {
    left: true,
    right: true,
  },
  variants: {
    left: {
      true: 'pl-4',
      false: '',
    },
    right: {
      true: 'pr-4',
      false: '',
    },
  },
})

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return (
    <div ref={ref} className={cn(gutterVariants({ left, right, className }))}>
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'
