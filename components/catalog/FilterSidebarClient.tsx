'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import FilterSidebar from './FilterSidebar'

export default function FilterSidebarClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category') ?? ''
  const maxPrice = Number(searchParams.get('max_price')) || 0
  const minPrice = Number(searchParams.get('min_price')) || 0
  const inStock = searchParams.get('in_stock') === '1'

  function buildUrl(overrides: Record<string, string | number>) {
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, val] of Object.entries(overrides)) {
      if (val === '' || val === 0) {
        params.delete(key)
      } else {
        params.set(key, String(val))
      }
    }

    params.delete('page')

    const qs = params.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  function handleCategoryChange(cat: string) {
    router.push(buildUrl({ category: cat }))
  }

  function handlePriceChange(min: number, max: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (min > 0) params.set('min_price', String(min)); else params.delete('min_price')
    if (max > 0) params.set('max_price', String(max)); else params.delete('max_price')
    params.delete('page')
    const qs = params.toString()
    router.push(`/catalog${qs ? `?${qs}` : ''}`)
  }

  function handleInStockChange(val: boolean) {
    const params = new URLSearchParams(searchParams.toString())
    if (val) params.set('in_stock', '1'); else params.delete('in_stock')
    params.delete('page')
    const qs = params.toString()
    router.push(`/catalog${qs ? `?${qs}` : ''}`)
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('min_price')
    params.delete('max_price')
    params.delete('in_stock')
    params.delete('page')
    const qs = params.toString()
    router.push(`/catalog${qs ? `?${qs}` : ''}`)
  }

  return (
    <FilterSidebar
      selectedCategory={selectedCategory}
      maxPrice={maxPrice}
      minPrice={minPrice}
      inStock={inStock}
      onCategoryChange={handleCategoryChange}
      onPriceChange={handlePriceChange}
      onInStockChange={handleInStockChange}
      onReset={handleReset}
    />
  )
}
