'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { Product } from '@/types'

interface HeroCarouselProps {
  products: Product[]
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5500 })])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  if (!products.length) return null

  return (
    <section className="relative overflow-hidden bg-primary" aria-label="Productos destacados">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative min-h-[520px] md:h-[72vh] flex-shrink-0 w-full"
            >
              {/* Subtle full-bleed bg */}
              <Image
                src={product.image_url}
                alt=""
                fill
                className="object-cover opacity-[0.08]"
                priority
                sizes="100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/20" />

              {/* Magazine split */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center py-20 md:py-0">
                  {/* Left: text */}
                  <div>
                    <span className="inline-block text-accent text-[10px] uppercase tracking-[0.3em] font-body border border-accent/30 px-3 py-1 mb-6">
                      {product.category}
                    </span>
                    <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-text-1 leading-[1.05] mb-5">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="font-body text-text-2 text-sm leading-relaxed mb-6 max-w-sm line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <p className="font-heading text-4xl md:text-5xl text-accent mb-8 leading-none">
                      RD${product.price.toLocaleString('es-DO')}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-block bg-accent text-primary font-body text-xs font-medium uppercase tracking-[0.2em] px-10 py-4 hover:bg-accent-light transition-colors btn-pulse"
                    >
                      Ver producto
                    </Link>
                  </div>

                  {/* Right: product image — prominent, magazine-style */}
                  <div className="hidden md:flex items-center justify-end pr-8">
                    <div className="relative w-72 h-80 lg:w-88 lg:h-96">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-[0_20px_80px_rgba(201,150,63,0.2)]"
                        sizes="360px"
                        unoptimized
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
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

      {/* Active-track dots */}
      <div className="absolute bottom-6 left-12 z-20 flex items-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-px transition-all duration-300 ${
              i === selectedIndex ? 'w-10 bg-accent' : 'w-4 bg-text-3 hover:bg-text-2'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
