import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

interface HeroBannerProps {
  products: Product[]
}

export default function HeroBanner({ products }: HeroBannerProps) {
  const showcase = products.slice(0, 3)
  const featured = products[0]

  return (
    <section className="bg-[#0D0D0D] overflow-hidden relative" aria-label="Portada">
      {featured && (
        <div className="absolute inset-0">
          <Image
            src={featured.image_url}
            alt=""
            fill
            className="object-cover opacity-[0.05] scale-110"
            priority
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      <div className="relative z-10 max-w-site mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left: brand statement */}
          <div>
            <p className="text-accent text-[11px] uppercase tracking-[0.35em] font-body mb-5">
              Santo Domingo · Entrega en 30 min
            </p>
            <h1 className="font-heading text-[clamp(3.5rem,8vw,6.5rem)] text-white leading-[0.88] mb-6">
              TODO LO<br />QUE<br />NECESITAS<br />PARA<br />
              <span className="text-accent">CELEBRAR.</span>
            </h1>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-8 max-w-sm">
              Rones, vinos, tequilas, vodkas y más. La mayor selección de licores
              importados y nacionales de RD.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-block bg-accent text-text-1 font-body text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-accent-light transition-colors"
              >
                Ver catálogo
              </Link>
              <Link
                href="/catalog?category=bundles"
                className="inline-block border border-white/20 text-white/80 font-body text-xs uppercase tracking-[0.15em] px-8 py-4 hover:border-white/50 hover:text-white transition-colors"
              >
                Bundles · Ahorra 10%
              </Link>
            </div>
          </div>

          {/* Right: bottle showcase */}
          {showcase.length > 0 && (
            <div className="flex items-end justify-center gap-4 h-64 md:h-80">
              {showcase.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  aria-label={product.name}
                  className={`relative flex-shrink-0 group transition-transform duration-500 hover:-translate-y-4 ${
                    i === 1 ? 'h-full w-24 md:w-28' : 'h-[76%] w-20 md:w-24'
                  }`}
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_8px_40px_rgba(201,150,63,0.15)] group-hover:drop-shadow-[0_16px_60px_rgba(201,150,63,0.4)] transition-all duration-500"
                    sizes="112px"
                    unoptimized
                    priority
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade into white page */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent" />
    </section>
  )
}
