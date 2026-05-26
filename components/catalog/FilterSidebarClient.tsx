'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import FilterSidebar from './FilterSidebar'

export default function FilterSidebarClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category') ?? ''
  const maxPrice = Number(searchParams.get('max_price')) || 0

  function buildUrl(overrides: Record<string, string | number>) {
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, val] of Object.entries(overrides)) {
      if (val === '' || val === 0) {
        params.delete(key)
      } else {
        params.set(key, String(val))
      }
    }

    // Reset to page 1 on filter change
    params.delete('page')

    const qs = params.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  function handleCategoryChange(cat: string) {
    router.push(buildUrl({ category: cat }))
  }

  function handleMaxPriceChange(max: number) {
    router.push(buildUrl({ max_price: max }))
  }

  return (
    <FilterSidebar
      selectedCategory={selectedCategory}
      maxPrice={maxPrice}
      onCategoryChange={handleCategoryChange}
      onMaxPriceChange={handleMaxPriceChange}
    />
  )
}
