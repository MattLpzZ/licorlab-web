import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import FilterSidebarClient from '@/components/catalog/FilterSidebarClient'
import SortBarClient from '@/components/catalog/SortBarClient'
import ProductGrid from '@/components/catalog/ProductGrid'
import MobileCategoryBar from '@/components/catalog/MobileCategoryBar'
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

      {/* Top banner */}
      <div className="max-w-site mx-auto px-4 pt-6 pb-0">
        <div className="relative h-[160px] md:h-[200px] rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1600&h=400&q=80"
            alt=""
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
            <div>
              <p className="text-accent text-[10px] uppercase tracking-[0.28em] font-ui mb-1.5">
                Puerto Plata · Selección completa
              </p>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white leading-tight">
                Todo lo que Buscas,<br className="hidden md:block" /> En Un Solo Lugar
              </h2>
            </div>
            <Link
              href="/catalog?sort=price_asc"
              className="shrink-0 bg-accent text-white font-ui font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              Mejores precios
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-site mx-auto px-4 py-6 md:py-8">
        {/* Search result label */}
        {search && (
          <p className="text-text-2 text-sm mb-4">
            Resultados para: <span className="text-text-1 font-medium">"{search}"</span>
          </p>
        )}

        {/* Mobile: horizontal category pills */}
        <div className="md:hidden mb-4">
          <Suspense fallback={null}>
            <MobileCategoryBar />
          </Suspense>
        </div>

        {/* Mobile: sort bar */}
        <div className="md:hidden mb-4">
          <Suspense fallback={null}>
            <SortBarClient total={total} />
          </Suspense>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <div className="hidden md:block">
            <Suspense fallback={<div className="w-64 flex-shrink-0" />}>
              <FilterSidebarClient />
            </Suspense>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Desktop sort bar */}
            <div className="hidden md:block">
              <Suspense fallback={null}>
                <SortBarClient total={total} />
              </Suspense>
            </div>

            <ProductGrid products={products} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                {page > 1 ? (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="px-5 py-2.5 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-lg"
                  >
                    Anterior
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 border border-border text-text-3 text-sm rounded-lg cursor-not-allowed">
                    Anterior
                  </span>
                )}
                <span className="text-text-2 text-sm">{page} / {totalPages}</span>
                {page < totalPages ? (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="px-5 py-2.5 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-lg"
                  >
                    Siguiente
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 border border-border text-text-3 text-sm rounded-lg cursor-not-allowed">
                    Siguiente
                  </span>
                )}
              </div>
            )}

            {/* Bottom banner */}
            <div className="mt-12">
              <div className="relative h-[140px] md:h-[180px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1600&h=360&q=80"
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e71f46]/95 via-[#e71f46]/80 to-[#e71f46]/50" />
                <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-[0.28em] font-ui mb-1">
                      Sin código requerido
                    </p>
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-white leading-tight">
                      Lleva 6, Ahorra 10%
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm font-ui mt-1">
                      Cualquier combinación de botellas.
                    </p>
                  </div>
                  <Link
                    href="/catalog?category=bundles"
                    className="shrink-0 bg-white text-accent font-ui font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-surface transition-colors"
                  >
                    Armar mi pack
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
