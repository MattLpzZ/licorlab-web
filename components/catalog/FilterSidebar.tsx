'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { RotateCcw } from 'lucide-react'

interface FilterSidebarProps {
  selectedCategory?: string
  maxPrice?: number
  minPrice?: number
  inStock?: boolean
  onCategoryChange: (cat: string) => void
  onPriceChange: (min: number, max: number) => void
  onInStockChange: (val: boolean) => void
  onReset: () => void
}

const CATEGORIES = [
  { label: 'Todas', value: '', emoji: '🍸' },
  { label: 'Rones', value: 'rones', emoji: '🥃' },
  { label: 'Vinos', value: 'vinos', emoji: '🍷' },
  { label: 'Whisky', value: 'whisky', emoji: '🥃' },
  { label: 'Cervezas', value: 'cervezas', emoji: '🍺' },
  { label: 'Espumantes', value: 'espumantes', emoji: '🥂' },
  { label: 'Licores', value: 'licores', emoji: '🍹' },
  { label: 'Sin Alcohol', value: 'bebidas-sin-alcohol', emoji: '💧' },
  { label: 'Cocteles', value: 'cocteles-listos', emoji: '🍹' },
  { label: 'Mamajuana', value: 'mamajuana', emoji: '🌿' },
  { label: 'Tequila & Mezcal', value: 'tequila-y-mezcal', emoji: '🌵' },
  { label: 'Vermut', value: 'vermut-y-aperitivos', emoji: '🍊' },
]

const PRICE_PRESETS = [
  { label: 'Bajo $500', min: 0, max: 500 },
  { label: '$500–$1,000', min: 500, max: 1000 },
  { label: '$1,000–$3,000', min: 1000, max: 3000 },
  { label: '$3,000+', min: 3000, max: 0 },
]

const MAX_PRICE = 18000

export default function FilterSidebar({
  selectedCategory,
  maxPrice = 0,
  minPrice = 0,
  inStock = false,
  onCategoryChange,
  onPriceChange,
  onInStockChange,
  onReset,
}: FilterSidebarProps) {
  const [localMax, setLocalMax] = useState(maxPrice || MAX_PRICE)
  const [localMin, setLocalMin] = useState(minPrice || 0)

  const activeCategory = selectedCategory ?? ''
  const hasFilters = !!activeCategory || maxPrice > 0 || minPrice > 0 || inStock

  function commitPrice() {
    onPriceChange(localMin, localMax >= MAX_PRICE ? 0 : localMax)
  }

  function applyPreset(min: number, max: number) {
    setLocalMin(min)
    setLocalMax(max || MAX_PRICE)
    onPriceChange(min, max)
  }

  return (
    <aside className="w-56 flex-shrink-0 sticky top-24 self-start space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg text-text-1">Filtros</h2>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-text-3 hover:text-accent text-xs font-ui transition-colors"
          >
            <RotateCcw size={11} />
            Limpiar
          </button>
        )}
      </div>

      {/* En stock toggle */}
      <div className="flex items-center justify-between py-3 border-y border-border">
        <label htmlFor="in-stock-toggle" className="text-sm font-ui text-text-1 cursor-pointer select-none">
          Solo disponibles
        </label>
        <button
          id="in-stock-toggle"
          role="switch"
          aria-checked={inStock}
          onClick={() => onInStockChange(!inStock)}
          className={cn(
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
            inStock ? 'bg-accent' : 'bg-border'
          )}
        >
          <span
            className={cn(
              'inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform',
              inStock ? 'translate-x-4' : 'translate-x-1'
            )}
          />
        </button>
      </div>

      {/* Categorías */}
      <div>
        <p className="text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-3">
          Categoría
        </p>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  'text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2',
                  isActive
                    ? 'bg-accent/10 text-accent font-ui font-semibold'
                    : 'text-text-2 hover:bg-surface-2 hover:text-text-1'
                )}
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Precio */}
      <div>
        <p className="text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-3">
          Precio (RD$)
        </p>

        {/* Presets */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {PRICE_PRESETS.map((preset) => {
            const isActive = localMin === preset.min && (localMax === (preset.max || MAX_PRICE))
            return (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset.min, preset.max)}
                className={cn(
                  'text-xs font-ui px-2 py-1.5 rounded-lg border transition-colors text-center',
                  isActive
                    ? 'border-accent bg-accent/10 text-accent font-semibold'
                    : 'border-border text-text-2 hover:border-accent/40'
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>

        {/* Range slider */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-text-3 font-ui block mb-1">Mínimo</label>
              <input
                type="number"
                min={0}
                max={localMax}
                step={100}
                value={localMin || ''}
                onChange={(e) => setLocalMin(Number(e.target.value))}
                onBlur={commitPrice}
                placeholder="0"
                className="w-full bg-surface-2 border border-border text-text-1 text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-accent/50"
              />
            </div>
            <span className="text-text-3 text-xs mt-4">—</span>
            <div className="flex-1">
              <label className="text-[10px] text-text-3 font-ui block mb-1">Máximo</label>
              <input
                type="number"
                min={localMin}
                max={MAX_PRICE}
                step={100}
                value={localMax >= MAX_PRICE ? '' : localMax}
                onChange={(e) => setLocalMax(Number(e.target.value) || MAX_PRICE)}
                onBlur={commitPrice}
                placeholder="∞"
                className="w-full bg-surface-2 border border-border text-text-1 text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={100}
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            onMouseUp={commitPrice}
            onTouchEnd={commitPrice}
            className="price-slider w-full"
          />
          <div className="flex justify-between">
            <span className="text-[10px] text-text-3 font-ui">RD$0</span>
            <span className="text-[10px] text-accent font-ui font-semibold">
              {localMax >= MAX_PRICE ? 'Sin límite' : `RD$${localMax.toLocaleString('es-DO')}`}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
