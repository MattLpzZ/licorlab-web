'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'
import type { Product } from '@/types'

interface HeroCarouselProps {
  products: Product[]
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!products.length) return null

  return (
    <section className="relative overflow-hidden" aria-label="Productos destacados">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative h-[60vh] min-h-[420px] flex items-center flex-shrink-0 w-full"
            >
              {/* Background image */}
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover opacity-30"
                priority
                sizes="100vw"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="max-w-xl">
                  <span className="text-accent text-sm uppercase tracking-widest font-body">
                    {product.category}
                  </span>
                  <h2 className="font-heading text-5xl md:text-7xl text-text-1 mt-2 mb-4 leading-tight">
                    {product.name}
                  </h2>
                  <p className="font-heading text-3xl text-accent mb-6">
                    RD${product.price.toLocaleString('es-DO')}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-block bg-accent text-primary font-body text-sm font-medium uppercase tracking-wider px-8 py-3 hover:bg-accent-light transition-colors"
                  >
                    Ver producto
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-surface-2/80 border border-border text-text-2 hover:text-text-1 hover:border-accent/50 p-2 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Siguiente slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-surface-2/80 border border-border text-text-2 hover:text-text-1 hover:border-accent/50 p-2 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="h-1.5 w-6 bg-text-3 hover:bg-accent transition-colors rounded-none"
          />
        ))}
      </div>
    </section>
  )
}
