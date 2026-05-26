'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useToastStore } from '@/store/toastStore'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const { add: addToast } = useToastStore()
  const [added, setAdded] = useState(false)

  const isWishlisted = has(product.id)

  function handleAdd() {
    if (!product.in_stock || added) return
    addItem(product)
    setAdded(true)
    addToast(`${product.name} agregado al carrito`)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    toggle(product)
    addToast(
      isWishlisted ? 'Eliminado de favoritos' : 'Guardado en favoritos',
      isWishlisted ? 'info' : 'success'
    )
  }

  const hasSale = !!product.compare_at_price && product.compare_at_price > product.price
  const discount = hasSale
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0

  return (
    <article
      className={cn(
        'bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full',
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block bg-surface-2 shrink-0">
        <div className="h-56 flex items-center justify-center p-6">
          <Image
            src={product.image_url}
            alt={product.name}
            width={180}
            height={220}
            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!product.in_stock && (
            <span className="bg-text-2 text-white text-[10px] font-ui font-bold uppercase rounded-full px-2.5 py-1">
              Agotado
            </span>
          )}
          {product.in_stock && hasSale && (
            <span className="bg-red-600 text-white text-[10px] font-ui font-bold uppercase rounded-full px-2.5 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Premium badge */}
        {product.in_stock && product.is_premium && (
          <span className="absolute top-3 right-10 bg-text-1 text-white text-[10px] font-ui font-bold uppercase rounded-full px-2.5 py-1">
            Premium
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          className={cn(
            'absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all',
            isWishlisted
              ? 'text-red-500 bg-white shadow-sm'
              : 'text-text-3 bg-white/0 group-hover:bg-white/90 group-hover:shadow-sm'
          )}
        >
          <Heart
            size={16}
            className={cn('transition-all', isWishlisted && 'fill-red-500')}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <p className="text-text-3 text-[11px] font-ui uppercase tracking-wider">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-text-1 font-ui font-semibold text-[14px] leading-snug line-clamp-2 hover:text-accent transition-colors mt-0.5">
            {product.name}
          </h3>
        </Link>
        {(product.volume_ml || product.alcohol_pct) && (
          <p className="text-text-3 text-xs font-ui">
            {[
              product.volume_ml ? `${product.volume_ml}ml` : null,
              product.alcohol_pct ? `${product.alcohol_pct}%` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-accent font-ui font-bold text-2xl leading-none">
              RD${product.price.toLocaleString('es-DO')}
            </span>
            {hasSale && (
              <span className="text-text-3 text-sm font-ui line-through">
                RD${product.compare_at_price!.toLocaleString('es-DO')}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.in_stock || added}
            className={cn(
              'w-full py-3 text-sm font-ui font-semibold rounded-lg transition-all duration-200 active:scale-[0.98]',
              !product.in_stock
                ? 'bg-surface-2 text-text-3 cursor-not-allowed'
                : added
                ? 'bg-green-600 text-white'
                : 'bg-text-1 text-white hover:bg-[#333333]'
            )}
          >
            {!product.in_stock ? 'Agotado' : added ? '✓ Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  )
}
