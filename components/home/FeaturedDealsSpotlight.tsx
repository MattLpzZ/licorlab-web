import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Product } from '@/types'

interface FeaturedDealsSpotlightProps {
  products: Product[]
}

export default function FeaturedDealsSpotlight({ products }: FeaturedDealsSpotlightProps) {
  if (!products.length) return null
  const display = products.slice(0, 4)

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-10">
          <div>
            <p className="text-text-3 text-[11px] uppercase tracking-[0.25em] font-body mb-1">Esta semana</p>
            <h2 className="font-heading text-4xl md:text-5xl text-text-1">Ofertas Destacadas</h2>
          </div>
          <Link
            href="/catalog?sort=price_asc"
            className="text-text-2 hover:text-text-1 text-sm font-body transition-colors hidden md:block border-b border-text-3 pb-0.5 hover:border-text-1"
          >
            Ver todas →
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {display.map((product, i) => {
            const hasSale = !!product.compare_at_price && product.compare_at_price > product.price
            const discount = hasSale
              ? Math.round((1 - product.price / product.compare_at_price!) * 100)
              : 0

            return (
              <AnimateIn key={product.id} delay={i * 70} direction="up">
                <Link href={`/products/${product.slug}`} className="block group">
                  <article className="bg-white border border-border hover:border-text-3 transition-colors overflow-hidden">
                    {/* Image */}
                    <div className="relative bg-surface-2 overflow-hidden">
                      <div className="h-44 md:h-52 flex items-center justify-center p-4">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={160}
                          height={200}
                          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      {hasSale && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-text-3 text-[11px] uppercase tracking-wider mb-0.5">
                        {product.category}
                      </p>
                      <h3 className="text-text-1 font-semibold text-sm leading-snug line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-text-1 font-bold text-xl leading-none">
                          RD${product.price.toLocaleString('es-DO')}
                        </span>
                        {hasSale && (
                          <span className="text-text-3 text-xs line-through">
                            RD${product.compare_at_price!.toLocaleString('es-DO')}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
