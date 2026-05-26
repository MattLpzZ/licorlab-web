import productsData from '@/lib/mock/products.json'
import type { Product } from '@/types'

const all = productsData as Product[]

export interface SearchSuggestion {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  image_url: string
  category: string
}

export function searchSync(q: string, limit = 5): SearchSuggestion[] {
  if (q.length < 2) return []
  const lower = q.toLowerCase()
  return all
    .filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    )
    .slice(0, limit)
    .map(({ id, slug, name, brand, price, image_url, category }) => ({
      id,
      slug,
      name,
      brand,
      price,
      image_url,
      category,
    }))
}
