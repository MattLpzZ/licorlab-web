'use client'

import { useState } from 'react'
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

const MAX_PRICE = 4500

export default function FilterSidebar({
  selectedCategory,
  maxPrice,
  onCategoryChange,
  onMaxPriceChange,
}: FilterSidebarProps) {
  const [sliderValue, setSliderValue] = useState(maxPrice || MAX_PRICE)

  const displayPrice = sliderValue >= MAX_PRICE
    ? 'Sin límite'
    : `RD$${sliderValue.toLocaleString()}`

  function commitPrice() {
    onMaxPriceChange(sliderValue >= MAX_PRICE ? 0 : sliderValue)
  }

  return (
    <aside className="w-64 flex-shrink-0 space-y-8">
      <h2 className="font-heading font-bold text-xl text-text-1">Filtros</h2>

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

      {/* Precio máximo — range slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-text-2 text-xs uppercase tracking-widest">Precio máximo</p>
          <span className="text-accent text-xs font-ui font-semibold">{displayPrice}</span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={sliderValue}
          onChange={e => setSliderValue(Number(e.target.value))}
          onMouseUp={commitPrice}
          onTouchEnd={commitPrice}
          className="price-slider w-full"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-text-3 text-[10px] font-ui">RD$0</span>
          <span className="text-text-3 text-[10px] font-ui">Sin límite</span>
        </div>
      </div>
    </aside>
  )
}
