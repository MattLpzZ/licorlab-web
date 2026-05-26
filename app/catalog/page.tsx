import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import FilterSidebarClient from '@/components/catalog/FilterSidebarClient'
import SortBarClient from '@/components/catalog/SortBarClient'
import ProductGrid from '@/components/catalog/ProductGrid'
import MobileCategoryBar from '@/components/catalog/MobileCategoryBar'
import { getProducts } from '@/lib/api/products'
import { getCategoryConfig } from '@/lib/categoryConfig'
import { PROMO_BANNER } from '@/lib/promoBanner'
import type { CategorySlug } from '@/types'

interface SearchParams {
  category?: string
  max_price?: string
  min_price?: string
  in_stock?: string
  sort?: string
  search?: string
  page?: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  const params = await searchParams
  const cfg = getCategoryConfig(params.category)
  return {
    title: `${cfg.name} — LicorLab`,
    description: `${cfg.sub}. Entrega express en Puerto Plata.`,
  }
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
  const in_stock = params.in_stock === '1' ? true : undefined
  const sort = params.sort as 'price_asc' | 'price_desc' | 'name' | 'newest' | undefined
  const search = params.search
  const page = params.page ? Number(params.page) : 1

  const cfg = getCategoryConfig(category)

  const { products, total } = await getProducts({
    category,
    max_price,
    min_price,
    in_stock,
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
    if (in_stock) p.set('in_stock', '1')
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

      {/* ── Category hero banner ── */}
      <div className="max-w-site mx-auto px-4 pt-6 pb-0">
        <div className="relative h-[180px] md:h-[220px] rounded-2xl overflow-hidden">
          <Image
            src={cfg.image}
            alt=""
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${cfg.gradient}`} />

          <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
            <div>
              <p className={`text-[10px] uppercase tracking-[0.28em] font-ui mb-2 ${cfg.accentClass}`}>
                {cfg.badge}
              </p>
              <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white leading-tight whitespace-pre-line">
                {cfg.headline}
              </h1>
              {!search && (
                <p className="text-white/60 text-xs font-ui mt-2 hidden md:block">
                  {cfg.sub}
                </p>
              )}
            </div>
            <Link
              href={cfg.ctaHref}
              className="shrink-0 bg-white/15 backdrop-blur-sm border border-white/25 text-white font-ui font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-white/25 transition-colors hidden sm:block"
            >
              {cfg.ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-site mx-auto px-4 py-6 md:py-8">
        {/* Search result label */}
        {search && (
          <p className="text-text-2 text-sm mb-4">
            Resultados para: <span className="text-text-1 font-medium">&quot;{search}&quot;</span>
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

            {/* ── Promo banner (festividad / oferta global) ── */}
            {!search && (
              <div className="mt-12">
                <div className="relative h-[150px] md:h-[190px] rounded-2xl overflow-hidden">
                  {PROMO_BANNER.video ? (
                    <video
                      src={PROMO_BANNER.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={PROMO_BANNER.image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r ${PROMO_BANNER.gradient}`} />
                  <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
                    <div>
                      <p className="text-white/70 text-[10px] uppercase tracking-[0.28em] font-ui mb-1">
                        {PROMO_BANNER.eyebrow}
                      </p>
                      <h3 className={`font-heading font-extrabold text-2xl md:text-3xl leading-tight whitespace-pre-line ${PROMO_BANNER.textStyle}`}>
                        {PROMO_BANNER.headline}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm font-ui mt-1.5">
                        {PROMO_BANNER.sub}
                      </p>
                    </div>
                    <Link
                      href={PROMO_BANNER.href}
                      className={`shrink-0 font-ui font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 md:py-3 rounded-xl transition-colors hidden sm:block ${PROMO_BANNER.ctaStyle}`}
                    >
                      {PROMO_BANNER.cta}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
