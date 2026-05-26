'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MESSAGES = [
  'Envío gratis en pedidos +RD$3,000 · Entrega mismo día en Santo Domingo',
  'Lleva 6 botellas y ahorra 10% · Ver bundles →',
  'Selección premium de rones dominicanos e importados',
]

const INTERVAL_MS = 4000

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + MESSAGES.length) % MESSAGES.length)
  }, [])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % MESSAGES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="bg-surface border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
        <button
          onClick={prev}
          aria-label="Mensaje anterior"
          className="text-text-3 hover:text-text-2 transition-colors shrink-0"
        >
          <ChevronLeft size={14} />
        </button>

        <p className="text-text-2 text-xs text-center tracking-wide leading-none flex-1 truncate">
          {MESSAGES[current]}
        </p>

        <button
          onClick={next}
          aria-label="Mensaje siguiente"
          className="text-text-3 hover:text-text-2 transition-colors shrink-0"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
