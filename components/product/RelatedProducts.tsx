import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-heading text-3xl text-text-1 mb-8">
          También te puede interesar
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
