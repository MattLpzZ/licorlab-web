'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/cn'

const CATS = [
  { label: 'Todas', value: '' },
  { label: 'Rones', value: 'rones' },
  { label: 'Vinos', value: 'vinos' },
  { label: 'Whisky', value: 'whisky' },
  { label: 'Cervezas', value: 'cervezas' },
  { label: 'Espumantes', value: 'espumantes' },
  { label: 'Licores', value: 'licores' },
  { label: 'Sin Alcohol', value: 'bebidas-sin-alcohol' },
  { label: 'Cocteles', value: 'cocteles-listos' },
]

export default function MobileCategoryBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? ''

  function go(cat: string) {
    const p = new URLSearchParams(searchParams.toString())
    if (cat) p.set('category', cat)
    else p.delete('category')
    p.delete('page')
    router.push(`/catalog${p.size ? `?${p}` : ''}`)
  }

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
      {CATS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => go(value)}
          className={cn(
            'shrink-0 text-xs font-ui px-4 py-2 rounded-full border transition-colors',
            active === value
              ? 'bg-accent text-white border-accent'
              : 'border-border text-text-2 bg-white hover:border-accent/50'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
