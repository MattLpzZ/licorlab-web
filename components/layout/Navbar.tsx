'use client'

import { useState, useRef, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const CATEGORIES = [
  { label: 'Rones', slug: 'rones' },
  { label: 'Vodka', slug: 'vodka' },
  { label: 'Vinos', slug: 'vinos' },
  { label: 'Tequila', slug: 'tequila' },
  { label: 'Brandies', slug: 'brandies' },
  { label: 'Gin', slug: 'gin' },
  { label: 'Horario', slug: 'horario' },
  { label: 'Ver Todo', slug: '' },
]

export default function Navbar() {
  const router = useRouter()
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = searchRef.current?.value.trim()
    if (!q) return
    router.push(`/catalog?search=${encodeURIComponent(q)}`)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/LG-WHITE.svg" alt="LicorLab" width={120} height={32} className="h-8 w-auto" priority />
        </Link>

        {/* Search — desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto relative">
          <input
            ref={searchRef}
            type="search"
            placeholder="Buscar licores, marcas..."
            className="w-full bg-surface-2 border border-border text-text-1 placeholder-text-3 text-sm px-4 py-2 pr-10 rounded-sm focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-2 transition-colors"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-5 shrink-0">
          {CATEGORIES.map(({ label, slug }) => (
            <Link
              key={label}
              href={slug ? `/catalog?category=${slug}` : '/catalog'}
              className="text-text-2 hover:text-text-1 text-sm transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0 shrink-0">
          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative text-text-2 hover:text-text-1 transition-colors"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="lg:hidden text-text-2 hover:text-text-1 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-border px-4 pb-4">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="relative mt-3 mb-4">
            <input
              type="search"
              placeholder="Buscar licores, marcas..."
              className="w-full bg-surface-2 border border-border text-text-1 placeholder-text-3 text-sm px-4 py-2 pr-10 rounded-sm focus:outline-none focus:border-accent/50 transition-colors"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const q = (e.target as HTMLInputElement).value.trim()
                  if (q) {
                    router.push(`/catalog?search=${encodeURIComponent(q)}`)
                    setMobileOpen(false)
                  }
                }
              }}
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3" />
          </form>

          <nav className="flex flex-col gap-1">
            {CATEGORIES.map(({ label, slug }) => (
              <Link
                key={label}
                href={slug ? `/catalog?category=${slug}` : '/catalog'}
                onClick={() => setMobileOpen(false)}
                className="text-text-2 hover:text-text-1 text-sm py-2 border-b border-border/50 last:border-0 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
