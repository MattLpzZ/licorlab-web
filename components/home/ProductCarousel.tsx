'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'
import type { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'

interface ProductCarouselProps {
  title: string
  products: Product[]
  viewAllHref: string
}

export default function ProductCarousel({ title, products, viewAllHref }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', dragFree: true })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!products.length) return null

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-3xl text-text-1">{title}</h2>
          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="text-accent hover:text-accent-light text-sm font-body transition-colors"
            >
              Ver todos →
            </Link>
            <div className="flex gap-1">
              <button
                onClick={scrollPrev}
                aria-label="Anterior"
                className="bg-surface-2 border border-border text-text-2 hover:text-text-1 hover:border-accent/50 p-1.5 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Siguiente"
                className="bg-surface-2 border border-border text-text-2 hover:text-text-1 hover:border-accent/50 p-1.5 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {products.map((product) => (
              <div key={product.id} className="w-56 md:w-64 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
