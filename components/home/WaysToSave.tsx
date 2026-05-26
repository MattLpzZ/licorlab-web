import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'

const TILES = [
  {
    title: 'Lleva 6,\nAhorra 10%',
    subtitle: 'Cualquier combinación de botellas',
    badge: 'BUNDLES',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&h=600&q=80',
    href: '/catalog?category=bundles',
  },
  {
    title: 'Ofertas\nde la Semana',
    subtitle: 'Los mejores precios actualizados cada lunes',
    badge: 'OFERTAS',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&h=600&q=80',
    href: '/catalog?sort=price_asc',
  },
  {
    title: 'Fine\n& Lux',
    subtitle: 'Ediciones limitadas y botellas de colección',
    badge: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&h=600&q=80',
    href: '/catalog?min_price=2000',
  },
]

export default function WaysToSave() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="max-w-site mx-auto">
        <AnimateIn className="mb-8">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-body mb-2">Aprovechar</p>
          <h2 className="font-heading text-4xl md:text-5xl text-text-1">Formas de ahorrar</h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TILES.map((tile, i) => (
            <AnimateIn key={tile.href} delay={i * 80}>
              <Link href={tile.href} className="block group">
                <div className="relative h-[480px] overflow-hidden cursor-pointer">
                  {/* Background image */}
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/5 group-hover:from-black/75 transition-colors duration-300" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-body font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 px-2 py-1">
                      {tile.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-3xl text-white whitespace-pre-line leading-tight mb-1">
                      {tile.title}
                    </h3>
                    <p className="font-body text-white/70 text-sm mb-3">{tile.subtitle}</p>
                    <span className="flex items-center gap-1.5 text-accent text-xs font-body uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      Explorar <ArrowRight size={12} />
                    </span>
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
