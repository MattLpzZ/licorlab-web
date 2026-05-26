'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('animate-visible'), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn('animate-hidden', `animate-dir-${direction}`, className)}
    >
      {children}
    </div>
  )
}
