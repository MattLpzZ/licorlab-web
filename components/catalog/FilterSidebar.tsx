'use client'

import { cn } from '@/lib/cn'

interface FilterSidebarProps {
  selectedCategory?: string
  maxPrice?: number
  onCategoryChange: (cat: string) => void
  onMaxPriceChange: (max: number) => void
}

const CATEGORIES = [
  { label: 'Todas', value: '' },
  { label: 'Rones', value: 'rones' },
  { label: 'Vodka', value: 'vodka' },
  { label: 'Vinos', value: 'vinos' },
  { label: 'Tequila', value: 'tequila' },
  { label: 'Brandies', value: 'brandies' },
  { label: 'Gin', value: 'gin' },
  { label: 'Horario', value: 'horario' },
  { label: 'Bundles', value: 'bundles' },
]

const PRICE_OPTIONS = [
  { label: 'RD$800', value: 800 },
  { label: 'RD$2,000', value: 2000 },
  { label: 'RD$4,000', value: 4000 },
  { label: 'Sin límite', value: 0 },
]

export default function FilterSidebar({
  selectedCategory,
  maxPrice,
  onCategoryChange,
  onMaxPriceChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 space-y-8">
      <h2 className="font-heading text-xl text-text-1">Filtros</h2>

      {/* Categorías */}
      <div>
        <p className="text-text-2 text-xs uppercase tracking-widest mb-3">Categorías</p>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = (selectedCategory ?? '') === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  'text-left text-sm px-3 py-2 border rounded-sm transition-colors',
                  isActive
                    ? 'bg-surface-2 border-accent text-text-1'
                    : 'border-border text-text-2 hover:border-accent/50'
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Precio máximo */}
      <div>
        <p className="text-text-2 text-xs uppercase tracking-widest mb-3">Precio máximo</p>
        <div className="flex flex-col gap-1.5">
          {PRICE_OPTIONS.map((opt) => {
            const isActive = (maxPrice ?? 0) === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onMaxPriceChange(opt.value)}
                className={cn(
                  'text-left text-sm px-3 py-2 border rounded-sm transition-colors',
                  isActive
                    ? 'bg-surface-2 border-accent text-text-1'
                    : 'border-border text-text-2 hover:border-accent/50'
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
