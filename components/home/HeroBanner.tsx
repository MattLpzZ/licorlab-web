import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

interface HeroBannerProps {
  products: Product[]
}

export default function HeroBanner({ products }: HeroBannerProps) {
  const showcase = products.slice(0, 3)

  return (
    <section className="bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: promo text */}
          <div>
            <span className="inline-block text-[10px] font-body uppercase tracking-[0.3em] text-accent border border-accent/30 px-3 py-1 mb-5">
              Oferta activa · Sin código
            </span>
            <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl text-text-1 leading-[0.88] mb-5 select-none">
              LLEVA
              <br />
              6,
              <br />
              AHORRA
              <br />
              <span className="accent-shimmer">10%</span>
            </h1>
            <p className="font-body text-text-2 text-sm leading-relaxed mb-7 max-w-sm">
              Mezcla y combina — cualquier combinación de 6 botellas. El descuento se aplica automáticamente en el carrito.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/catalog?category=bundles"
                className="inline-block bg-accent text-primary font-body text-xs font-medium uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-accent-light transition-colors btn-pulse"
              >
                Armar mi pack
              </Link>
              <Link
                href="/catalog"
                className="font-body text-xs uppercase tracking-[0.15em] text-text-3 hover:text-text-2 transition-colors"
              >
                Ver catálogo →
              </Link>
            </div>
          </div>

          {/* Right: bottle showcase */}
          {showcase.length > 0 && (
            <div className="flex items-end justify-center gap-3 h-56 md:h-72">
              {showcase.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`relative flex-shrink-0 group transition-transform duration-500 hover:-translate-y-3 ${
                    i === 1 ? 'h-full w-24 md:w-28' : 'h-[78%] w-20 md:w-24'
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_8px_40px_rgba(201,150,63,0.12)] group-hover:drop-shadow-[0_12px_48px_rgba(201,150,63,0.25)] transition-all duration-500"
                    sizes="112px"
                    unoptimized
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
