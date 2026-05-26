import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const PRICE_BLOCKS = [
  { label: 'Bajo RD$800', price: 'RD$800', href: '/catalog?max_price=800' },
  { label: 'Bajo RD$2,000', price: 'RD$2,000', href: '/catalog?max_price=2000' },
  { label: 'Bajo RD$4,000', price: 'RD$4,000', href: '/catalog?max_price=4000' },
  { label: 'Fine & Lux', price: 'RD$4,000+', href: '/catalog?min_price=4000' },
]

export default function ShopByPrice() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-heading text-4xl text-text-1 mb-2">Compra por precio</h2>
          <p className="text-text-2 text-sm font-body">Encuentra tu botella perfecta en cualquier presupuesto.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRICE_BLOCKS.map(({ label, price, href }) => (
            <Link key={href} href={href}>
              <div className="bg-surface-2 border border-border p-10 text-center hover:bg-surface hover:border-accent/50 cursor-pointer group transition-colors">
                <p className="font-heading text-3xl text-accent mb-2">{price}</p>
                <p className="text-text-2 text-sm font-body uppercase tracking-wide mb-4">{label}</p>
                <span className="inline-flex items-center justify-center gap-1 text-accent text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver selección <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
