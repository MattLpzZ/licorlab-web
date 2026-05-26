import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types'

interface TrendingCategoriesProps {
  categories: Category[]
}

export default function TrendingCategories({ categories }: TrendingCategoriesProps) {
  if (!categories.length) return null

  return (
    <section className="py-20 px-4 bg-surface-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-heading text-4xl text-text-1 mb-2">Categorías Destacadas</h2>
          <p className="text-text-2 text-sm font-body">Explora nuestra selección por tipo de licor.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/catalog?category=${category.slug}`}>
              <div className="relative h-48 overflow-hidden border border-border hover:border-accent transition-colors group cursor-pointer">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/50 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">
                  <span className="font-heading text-xl text-text-1">{category.name}</span>
                  {category.product_count !== undefined && (
                    <span className="text-text-2 text-sm font-body">
                      {category.product_count} productos
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
