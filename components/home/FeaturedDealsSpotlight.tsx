import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Product } from '@/types'

interface FeaturedDealsSpotlightProps {
  products: Product[]
}

export default function FeaturedDealsSpotlight({ products }: FeaturedDealsSpotlightProps) {
  if (!products.length) return null
  const [hero, ...rest] = products.slice(0, 7)
  const grid = rest.slice(0, 6)

  return (
    <section className="py-14 bg-white">
      <div className="max-w-site mx-auto px-4">
        {/* Header */}
        <AnimateIn className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent text-[11px] uppercase tracking-[0.25em] font-ui mb-1">Esta semana</p>
            <h2 className="font-heading text-4xl md:text-5xl text-text-1">Ofertas Destacadas</h2>
          </div>
          <Link
            href="/catalog?sort=price_asc"
            className="hidden md:block text-text-2 hover:text-text-1 text-sm font-ui transition-colors border-b border-text-3 hover:border-text-1 pb-0.5"
          >
            Ver todas →
          </Link>
        </AnimateIn>

        {/* Hero + grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Hero card — spans 2 cols on md+ */}
          <AnimateIn className="col-span-2 md:col-span-1 lg:col-span-2 row-span-2" delay={0} direction="up">
            <Link href={`/products/${hero.slug}`} className="block group h-full">
              <article className="relative bg-surface-2 overflow-hidden rounded-2xl h-full min-h-[320px] flex flex-col justify-end">
                <Image
                  src={hero.image_url}
                  alt={hero.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-accent text-white text-[10px] font-ui font-bold uppercase px-2.5 py-1 rounded-full">
                    Destacado
                  </span>
                  {hero.is_premium && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-ui font-bold uppercase px-2.5 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>

                {/* Info overlay */}
                <div className="relative z-10 p-5">
                  <p className="text-white/60 text-[11px] font-ui uppercase tracking-wider mb-1">{hero.brand}</p>
                  <h3 className="text-white font-heading font-bold text-xl leading-snug mb-2 line-clamp-2">
                    {hero.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-white font-heading font-extrabold text-3xl">
                      RD${hero.price.toLocaleString('es-DO')}
                    </span>
                    {hero.compare_at_price && (
                      <span className="text-white/50 text-sm line-through">
                        RD${hero.compare_at_price.toLocaleString('es-DO')}
                      </span>
                    )}
                  </div>
                  <span className="inline-block bg-accent text-white font-ui font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg group-hover:bg-accent-light transition-colors">
                    Ver producto →
                  </span>
                </div>
              </article>
            </Link>
          </AnimateIn>

          {/* Grid cards */}
          {grid.map((product, i) => {
            const hasSale = !!product.compare_at_price && product.compare_at_price > product.price
            const discount = hasSale
              ? Math.round((1 - product.price / product.compare_at_price!) * 100)
              : 0

            return (
              <AnimateIn key={product.id} delay={(i + 1) * 60} direction="up">
                <Link href={`/products/${product.slug}`} className="block group">
                  <article className="bg-white border border-border hover:border-accent/40 hover:shadow-md transition-all overflow-hidden rounded-xl">
                    {/* Image */}
                    <div className="relative bg-surface-2 overflow-hidden">
                      <div className="h-40 flex items-center justify-center p-3">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={140}
                          height={175}
                          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      {hasSale && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-ui font-bold uppercase px-2 py-0.5 rounded-full">
                          -{discount}%
                        </span>
                      )}
                      {product.is_premium && (
                        <span className="absolute top-2 right-2 bg-text-1 text-white text-[9px] font-ui font-bold uppercase px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-text-3 text-[10px] font-ui uppercase tracking-wider mb-0.5 truncate">
                        {product.brand}
                      </p>
                      <h3 className="text-text-1 font-ui font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-accent font-ui font-bold text-lg leading-none">
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

        {/* Mobile CTA */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/catalog?sort=price_asc"
            className="inline-block border border-border text-text-2 font-ui text-sm px-6 py-3 rounded-lg hover:border-accent/50 transition-colors"
          >
            Ver todas las ofertas →
          </Link>
        </div>
      </div>
    </section>
  )
}
