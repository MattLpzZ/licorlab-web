'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!product.in_stock || added) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const hasSale = !!product.compare_at_price && product.compare_at_price > product.price

  return (
    <div
      className={cn(
        'bg-surface border border-border hover:border-accent/50 transition-colors flex flex-col rounded-sm overflow-hidden',
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block bg-surface-2 shrink-0">
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={420}
          className="w-full object-contain p-4"
          style={{ aspectRatio: '300/420' }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.in_stock && (
            <span className="bg-red-800/90 text-red-100 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              Agotado
            </span>
          )}
          {product.in_stock && product.is_premium && (
            <span className="bg-surface/80 border border-accent-light/40 text-accent-light text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              Premium
            </span>
          )}
          {product.in_stock && hasSale && (
            <span className="bg-accent text-primary text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              Oferta
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <p className="text-text-2 text-xs uppercase tracking-wider mb-1">{product.brand}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading text-text-1 text-lg leading-snug hover:text-accent transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Volume + ABV */}
          {(product.volume_ml || product.alcohol_pct) && (
            <p className="text-text-3 text-xs mt-1">
              {[
                product.volume_ml ? `${product.volume_ml}ml` : null,
                product.alcohol_pct ? `${product.alcohol_pct}%` : null,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-accent font-semibold text-lg">
            RD${product.price.toLocaleString('es-DO')}
          </span>
          {hasSale && (
            <span className="text-text-3 text-sm line-through">
              RD${product.compare_at_price!.toLocaleString('es-DO')}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={!product.in_stock || added}
          className={cn(
            'w-full py-2 text-sm font-semibold transition-colors rounded-sm',
            !product.in_stock
              ? 'bg-surface-2 text-text-3 cursor-not-allowed border border-border'
              : added
              ? 'bg-surface-2 text-accent border border-accent/40 cursor-default'
              : 'bg-accent hover:bg-accent-light text-primary'
          )}
        >
          {!product.in_stock ? 'Agotado' : added ? '✓ Agregado' : 'Agregar'}
        </button>
      </div>
    </div>
  )
}
