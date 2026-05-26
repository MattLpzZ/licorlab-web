import type { Product, ProductFilters, CategorySlug } from '@/types'
import productsData from '@/lib/mock/products.json'

const all = productsData as Product[]

export async function getProducts(
  filters: ProductFilters = {}
): Promise<{ products: Product[]; total: number }> {
  let results = [...all]

  if (filters.category) results = results.filter(p => p.category === filters.category)
  if (filters.max_price) results = results.filter(p => p.price <= filters.max_price!)
  if (filters.min_price) results = results.filter(p => p.price >= filters.min_price!)
  if (filters.in_stock !== undefined) results = results.filter(p => p.in_stock === filters.in_stock)
  if (filters.is_featured) results = results.filter(p => p.is_featured)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(
      p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    )
  }

  if (filters.sort === 'price_asc') results.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price_desc') results.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name))

  const total = results.length
  const page = filters.page ?? 1
  const perPage = filters.per_page ?? 24
  results = results.slice((page - 1) * perPage, page * perPage)

  return { products: results, total }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return all.find(p => p.slug === slug) ?? null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return all.filter(p => p.is_featured)
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  return all.filter(p => p.category === category)
}

export async function getProductsByPriceRange(max: number): Promise<Product[]> {
  return all.filter(p => p.price <= max && !p.is_bundle)
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return all
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
