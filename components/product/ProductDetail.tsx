'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore'
import { useToastStore } from '@/store/toastStore'
import type { Product } from '@/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const { add: trackView } = useRecentlyViewedStore()
  const { add: addToast } = useToastStore()

  const isWishlisted = has(product.id)

  // Track recently viewed on mount
  useEffect(() => {
    trackView(product)
  }, [product, trackView])

  const hasSale =
    !!product.compare_at_price && product.compare_at_price > product.price

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1))
  }

  function increment() {
    setQuantity((q) => q + 1)
  }

  function handleAddToCart() {
    if (!product.in_stock || added) return
    addItem(product, quantity)
    setAdded(true)
    addToast(`${product.name} agregado al carrito`)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleWishlist() {
    toggle(product)
    addToast(
      isWishlisted ? 'Eliminado de favoritos' : 'Guardado en favoritos',
      isWishlisted ? 'info' : 'success'
    )
  }

  const specs = [
    product.volume_ml ? `${product.volume_ml}ml` : null,
    product.alcohol_pct ? `${product.alcohol_pct}% Alc.` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section className="max-w-site mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className="relative bg-surface-2 rounded-sm overflow-hidden p-8">
            <Image
              src={product.image_url}
              alt={product.name}
              width={500}
              height={700}
              className="w-full object-contain"
              priority
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {!product.in_stock && (
                <span className="bg-red-800/90 text-red-100 text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-sm">
                  Agotado
                </span>
              )}
              {product.in_stock && product.is_premium && (
                <span className="bg-surface/80 border border-accent-light/40 text-accent-light text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-sm">
                  Premium
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col">
          {/* Category */}
          <p className="text-accent text-sm uppercase tracking-wide mb-2">
            {product.category}
          </p>

          {/* Name */}
          <h1 className="font-heading text-4xl md:text-5xl text-text-1 leading-tight mb-2">
            {product.name}
          </h1>

          {/* Brand */}
          <p className="text-text-2 text-sm mb-4">{product.brand}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-heading text-3xl text-accent font-semibold">
              RD${product.price.toLocaleString('es-DO')}
            </span>
            {hasSale && (
              <span className="text-text-3 text-lg line-through">
                RD${product.compare_at_price!.toLocaleString('es-DO')}
              </span>
            )}
          </div>

          {/* Volume / ABV */}
          {specs && <p className="text-text-3 text-sm mb-6">{specs}</p>}

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Description */}
          <p className="text-text-2 leading-relaxed mb-8">{product.description}</p>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-text-2 text-sm">Cantidad</span>
            <div className="flex items-center border border-border rounded-sm overflow-hidden">
              <button
                onClick={decrement}
                disabled={quantity <= 1}
                className="px-4 py-2 text-text-2 hover:text-text-1 hover:bg-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="px-5 py-2 text-text-1 text-sm border-x border-border min-w-[48px] text-center">
                {quantity}
              </span>
              <button
                onClick={increment}
                disabled={!product.in_stock}
                className="px-4 py-2 text-text-2 hover:text-text-1 hover:bg-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart + wishlist */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock || added}
              className="flex-1 bg-accent hover:bg-accent-light text-primary font-body font-medium py-4 px-8 transition-colors rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {!product.in_stock
                ? 'Agotado'
                : added
                ? '✓ Añadido al carrito'
                : 'Añadir al carrito'}
            </button>

            <button
              onClick={handleWishlist}
              aria-label={isWishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className={cn(
                'p-4 border rounded-sm transition-colors',
                isWishlisted
                  ? 'border-red-300 text-red-500 bg-red-50'
                  : 'border-border text-text-2 hover:border-text-2'
              )}
            >
              <Heart size={20} className={cn(isWishlisted && 'fill-red-500')} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
