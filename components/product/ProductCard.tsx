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
  const discount = hasSale
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0

  return (
    <article className={cn('bg-white group flex flex-col border border-border hover:border-text-3 transition-colors', className)}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block bg-surface-2 overflow-hidden shrink-0">
        <div className="relative h-52 md:h-60 flex items-center justify-center p-4">
          <Image
            src={product.image_url}
            alt={product.name}
            width={200}
            height={240}
            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.in_stock && (
            <span className="bg-text-2 text-white text-[10px] font-bold uppercase px-2 py-0.5">
              Agotado
            </span>
          )}
          {product.in_stock && hasSale && (
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5">
              -{discount}%
            </span>
          )}
          {product.in_stock && product.is_premium && !hasSale && (
            <span className="bg-text-1 text-white text-[10px] font-bold uppercase px-2 py-0.5">
              Premium
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <p className="text-text-3 text-[11px] uppercase tracking-wider mb-0.5">{product.brand}</p>
          <h3 className="text-text-1 font-semibold text-sm leading-snug hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          {(product.volume_ml || product.alcohol_pct) && (
            <p className="text-text-3 text-xs mt-0.5">
              {[
                product.volume_ml ? `${product.volume_ml}ml` : null,
                product.alcohol_pct ? `${product.alcohol_pct}%` : null,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-text-1 font-bold text-xl leading-none">
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
            'w-full py-2.5 text-sm font-bold transition-colors',
            !product.in_stock
              ? 'bg-surface-2 text-text-3 cursor-not-allowed'
              : added
              ? 'bg-accent text-text-1'
              : 'bg-text-1 text-white hover:bg-text-2 active:scale-[0.98]'
          )}
        >
          {!product.in_stock ? 'Agotado' : added ? '✓ Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}
