import Image from 'next/image'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Product } from '@/types'

interface FeaturedDealsSpotlightProps {
  products: Product[]
}

export default function FeaturedDealsSpotlight({ products }: FeaturedDealsSpotlightProps) {
  if (!products.length) return null
  const display = products.slice(0, 4)

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-xs uppercase tracking-[0.2em] font-body mb-2 flex items-center gap-2">
              <Tag size={11} />
              Esta semana
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-text-1">Ofertas Destacadas</h2>
          </div>
          <Link
            href="/catalog?sort=price_asc"
            className="text-text-2 hover:text-accent text-sm font-body transition-colors hidden md:block"
          >
            Ver todas →
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {display.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 70} direction="up">
              <Link href={`/products/${product.slug}`} className="block group">
                <div className="bg-surface-2 border border-border group-hover:border-accent/40 transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-2/80 to-transparent" />
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <p className="font-body text-[10px] text-text-3 uppercase tracking-[0.18em] mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-heading text-lg text-text-1 leading-tight mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    {/* Prominent price */}
                    <p className="font-heading text-2xl md:text-3xl text-accent leading-none">
                      RD${product.price.toLocaleString('es-DO')}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
