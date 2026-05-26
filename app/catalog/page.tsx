import { Suspense } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import FilterSidebarClient from '@/components/catalog/FilterSidebarClient'
import SortBarClient from '@/components/catalog/SortBarClient'
import ProductGrid from '@/components/catalog/ProductGrid'
import { getProducts } from '@/lib/api/products'
import type { CategorySlug } from '@/types'

interface SearchParams {
  category?: string
  max_price?: string
  min_price?: string
  sort?: string
  search?: string
  page?: string
}

export const metadata = {
  title: 'Catálogo — LicorLab',
  description: 'Explora nuestra selección de licores premium.',
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const category = params.category as CategorySlug | undefined
  const max_price = params.max_price ? Number(params.max_price) : undefined
  const min_price = params.min_price ? Number(params.min_price) : undefined
  const sort = params.sort as 'price_asc' | 'price_desc' | 'name' | 'newest' | undefined
  const search = params.search
  const page = params.page ? Number(params.page) : 1

  const { products, total } = await getProducts({
    category,
    max_price,
    min_price,
    sort,
    search,
    page,
    per_page: 24,
  })

  const totalPages = Math.ceil(total / 24)

  function buildPageUrl(newPage: number) {
    const p = new URLSearchParams()
    if (category) p.set('category', category)
    if (max_price) p.set('max_price', String(max_price))
    if (min_price) p.set('min_price', String(min_price))
    if (sort) p.set('sort', sort)
    if (search) p.set('search', search)
    if (newPage > 1) p.set('page', String(newPage))
    const qs = p.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search header */}
        {search && (
          <p className="text-text-2 text-sm mb-6">
            Resultados para: <span className="text-text-1 font-medium">"{search}"</span>
          </p>
        )}

        <div className="flex gap-8">
          {/* Sidebar — needs Suspense because it uses useSearchParams inside */}
          <Suspense fallback={<div className="w-64 flex-shrink-0" />}>
            <FilterSidebarClient />
          </Suspense>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={null}>
              <SortBarClient total={total} />
            </Suspense>

            <ProductGrid products={products} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                {page > 1 ? (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="px-5 py-2 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-sm"
                  >
                    Anterior
                  </Link>
                ) : (
                  <span className="px-5 py-2 border border-border text-text-3 text-sm rounded-sm cursor-not-allowed">
                    Anterior
                  </span>
                )}

                <span className="text-text-2 text-sm">
                  {page} / {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="px-5 py-2 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-sm"
                  >
                    Siguiente
                  </Link>
                ) : (
                  <span className="px-5 py-2 border border-border text-text-3 text-sm rounded-sm cursor-not-allowed">
                    Siguiente
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
