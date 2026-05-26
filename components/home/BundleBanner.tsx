import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Bundle } from '@/types'

interface BundleBannerProps {
  bundles: Bundle[]
}

export default function BundleBanner({ bundles }: BundleBannerProps) {
  if (!bundles.length) return null

  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimateIn className="mb-10">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-body mb-2">Ahorra más</p>
          <h2 className="font-heading text-4xl text-text-1 mb-2">Arma tu experiencia</h2>
          <p className="text-text-2 text-sm font-body">
            Lleva 6 botellas y ahorra 10% automáticamente. Sin código, sin complicaciones.
          </p>
        </AnimateIn>

        {/* Bundle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.map((bundle, i) => {
            const savings = Math.round(bundle.savings_pct)
            return (
              <AnimateIn key={bundle.id} delay={i * 80} direction="up">
              <div
                className="bg-surface-2 border border-border hover:border-accent/50 transition-colors flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={bundle.image_url}
                    alt={bundle.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Savings badge */}
                  <span className="absolute top-3 right-3 bg-accent text-primary text-xs font-body font-semibold px-2 py-1 uppercase tracking-wide">
                    Ahorras {savings}%
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-heading text-xl text-text-1">{bundle.name}</h3>
                  <p className="text-text-2 text-sm font-body flex-1">{bundle.description}</p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-2xl text-accent">
                      RD${bundle.bundle_price.toLocaleString('es-DO')}
                    </span>
                    <span className="text-text-3 text-sm font-body line-through">
                      RD${bundle.original_price.toLocaleString('es-DO')}
                    </span>
                  </div>

                  <Link
                    href={`/products/${bundle.slug}`}
                    className="inline-block text-center bg-surface border border-accent/50 text-accent hover:bg-accent hover:text-primary text-sm font-body font-medium uppercase tracking-wider px-6 py-2.5 transition-colors mt-1"
                  >
                    Ver bundle
                  </Link>
                </div>
              </div>
            </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
