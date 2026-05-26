'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore'

interface Props {
  excludeId?: string
}

export default function RecentlyViewed({ excludeId }: Props) {
  const { items } = useRecentlyViewedStore()
  const visible = items.filter((p) => p.id !== excludeId).slice(0, 6)

  if (visible.length === 0) return null

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-heading font-bold text-xl text-text-1 mb-6">Vistos recientemente</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {visible.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="shrink-0 w-36 group"
          >
            <div className="bg-surface-2 rounded-xl p-4 flex items-center justify-center h-40 mb-2 group-hover:bg-surface transition-colors">
              <Image
                src={product.image_url}
                alt={product.name}
                width={100}
                height={130}
                className="max-h-full w-auto object-contain"
                unoptimized
              />
            </div>
            <p className="text-text-3 text-[10px] font-ui uppercase tracking-wider truncate">
              {product.brand}
            </p>
            <p className="text-text-1 text-xs font-ui font-medium leading-snug line-clamp-2 mt-0.5 group-hover:text-accent transition-colors">
              {product.name}
            </p>
            <p className="text-accent text-sm font-ui font-bold mt-1">
              RD${product.price.toLocaleString('es-DO')}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
