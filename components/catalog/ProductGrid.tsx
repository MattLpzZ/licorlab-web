import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-text-2 text-base text-center">
          No encontramos productos con esos filtros.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  )
}
