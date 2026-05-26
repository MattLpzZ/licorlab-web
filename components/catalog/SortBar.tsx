'use client'

interface SortBarProps {
  total: number
  sort?: string
  onSortChange: (sort: string) => void
}

const SORT_OPTIONS = [
  { label: 'Relevancia', value: '' },
  { label: 'Precio: Menor a mayor', value: 'price_asc' },
  { label: 'Precio: Mayor a menor', value: 'price_desc' },
  { label: 'Nombre', value: 'name' },
]

export default function SortBar({ total, sort, onSortChange }: SortBarProps) {
  return (
    <div className="flex flex-row justify-between items-center py-4 border-b border-border mb-6">
      <span className="text-text-2 text-sm">
        {total} {total === 1 ? 'producto encontrado' : 'productos encontrados'}
      </span>

      <select
        value={sort ?? ''}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-surface border border-border text-text-1 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-accent"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
