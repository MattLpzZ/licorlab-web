import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Category } from '@/types'

interface TrendingCategoriesProps {
  categories: Category[]
}

export default function TrendingCategories({ categories }: TrendingCategoriesProps) {
  if (!categories.length) return null

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent text-xs uppercase tracking-[0.2em] font-body mb-2">Explorar</p>
            <h2 className="font-heading text-4xl md:text-5xl text-text-1">Categorías</h2>
          </div>
          <Link
            href="/catalog"
            className="text-text-2 hover:text-accent text-sm font-body transition-colors hidden md:block"
          >
            Ver todas →
          </Link>
        </AnimateIn>

        {/* Circle row — scrollable */}
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <AnimateIn key={cat.slug} delay={i * 60} direction="up">
              <Link
                href={`/catalog?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 flex-shrink-0 group"
              >
                {/* Circle */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="112px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Label */}
                <span className="font-body text-xs md:text-sm text-text-2 group-hover:text-accent transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
