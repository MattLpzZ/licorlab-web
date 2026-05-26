import Link from 'next/link'
import { Package, Tag, Star, ArrowRight } from 'lucide-react'

const TILES = [
  {
    icon: Package,
    title: 'Lleva 6, Ahorra 10%',
    description: 'Arma tu pack de 6 botellas de cualquier categoría y obtén un 10% de descuento automático.',
    href: '/catalog?category=bundles',
  },
  {
    icon: Tag,
    title: 'Ofertas de la Semana',
    description: 'Los mejores precios seleccionados cada semana. Licores premium al precio que mereces.',
    href: '/catalog?sort=price_asc',
  },
  {
    icon: Star,
    title: 'Fine & Lux',
    description: 'Colecciones de edición limitada y botellas de coleccionista para el paladar más exigente.',
    href: '/catalog?min_price=2000',
  },
]

export default function WaysToSave() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl text-text-1 mb-2">Formas de ahorrar</h2>
        <p className="text-text-2 text-sm font-body mb-10">Más por menos, siempre.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TILES.map(({ icon: Icon, title, description, href }) => (
            <Link key={title} href={href}>
              <div className="bg-surface-2 border border-border hover:border-accent/50 p-8 flex flex-col gap-4 cursor-pointer group transition-colors h-full">
                <Icon size={28} className="text-accent shrink-0" />
                <h3 className="font-heading text-2xl text-text-1">{title}</h3>
                <p className="text-text-2 text-sm font-body flex-1">{description}</p>
                <span className="flex items-center gap-1 text-accent text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
