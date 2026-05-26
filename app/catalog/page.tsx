'use client'

import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
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
import type { CategorySlug, Product } from '@/types'

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const category = searchParams.get('category') as CategorySlug | undefined || undefined
  const max_price = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined
  const min_price = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined
  const in_stock = searchParams.get('in_stock') === '1' ? true : undefined
  const sort = searchParams.get('sort') as 'price_asc' | 'price_desc' | 'name' | 'newest' | undefined || undefined
  const search = searchParams.get('search') || undefined
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getProducts({ category, max_price, min_price, in_stock, sort, search, page, per_page: 24 })
      .then(({ products, total }) => {
        setProducts(products)
        setTotal(total)
      })
  }, [category, max_price, min_price, in_stock, sort, search, page])

  const cfg = getCategoryConfig(category)
  const totalPages = Math.ceil(total / 24)

  function buildPageUrl(newPage: number) {
    const p = new URLSearchParams(searchParams.toString())
    if (newPage > 1) p.set('page', String(newPage)); else p.delete('page')
    const qs = p.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />

      {/* Category hero banner */}
      <div className="max-w-site mx-auto px-4 pt-6 pb-0">
        <div className="relative h-[180px] md:h-[220px] rounded-2xl overflow-hidden">
          <Image src={cfg.image} alt="" fill className="object-cover" unoptimized priority />
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
                <p className="text-white/60 text-xs font-ui mt-2 hidden md:block">{cfg.sub}</p>
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
        {search && (
          <p className="text-text-2 text-sm mb-4">
            Resultados para: <span className="text-text-1 font-medium">&quot;{search}&quot;</span>
          </p>
        )}

        <div className="md:hidden mb-4">
          <MobileCategoryBar />
        </div>
        <div className="md:hidden mb-4">
          <SortBarClient total={total} />
        </div>

        <div className="flex gap-8">
          <div className="hidden md:block">
            <FilterSidebarClient />
          </div>

          <div className="flex-1 min-w-0">
            <div className="hidden md:block">
              <SortBarClient total={total} />
            </div>

            <ProductGrid products={products} />

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                {page > 1 ? (
                  <Link href={buildPageUrl(page - 1)} className="px-5 py-2.5 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-lg">
                    Anterior
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 border border-border text-text-3 text-sm rounded-lg cursor-not-allowed">Anterior</span>
                )}
                <span className="text-text-2 text-sm">{page} / {totalPages}</span>
                {page < totalPages ? (
                  <Link href={buildPageUrl(page + 1)} className="px-5 py-2.5 border border-border text-text-2 text-sm hover:border-accent/50 hover:text-text-1 transition-colors rounded-lg">
                    Siguiente
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 border border-border text-text-3 text-sm rounded-lg cursor-not-allowed">Siguiente</span>
                )}
              </div>
            )}

            {!search && (
              <div className="mt-12">
                <div className="relative h-[150px] md:h-[190px] rounded-2xl overflow-hidden">
                  {PROMO_BANNER.video ? (
                    <video src={PROMO_BANNER.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Image src={PROMO_BANNER.image} alt="" fill className="object-cover" unoptimized />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r ${PROMO_BANNER.gradient}`} />
                  <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
                    <div>
                      <p className="text-white/70 text-[10px] uppercase tracking-[0.28em] font-ui mb-1">{PROMO_BANNER.eyebrow}</p>
                      <h3 className={`font-heading font-extrabold text-2xl md:text-3xl leading-tight whitespace-pre-line ${PROMO_BANNER.textStyle}`}>
                        {PROMO_BANNER.headline}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm font-ui mt-1.5">{PROMO_BANNER.sub}</p>
                    </div>
                    <Link href={PROMO_BANNER.href} className={`shrink-0 font-ui font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 md:py-3 rounded-xl transition-colors hidden sm:block ${PROMO_BANNER.ctaStyle}`}>
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

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-text-2 font-ui">Cargando catálogo...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
