'use client'

import { useState, useRef, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, Truck, Store } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const NAV_ITEMS = [
  { label: 'Ofertas Especiales', href: '/catalog?sort=price_asc', highlight: true },
  { label: 'Bundles', href: '/catalog?category=bundles' },
  { label: 'Spirits', href: '/catalog' },
  { label: 'Tequila', href: '/catalog?category=tequila' },
  { label: 'Vinos', href: '/catalog?category=vinos' },
  { label: 'Rones', href: '/catalog?category=rones' },
  { label: 'Vodka', href: '/catalog?category=vodka' },
  { label: 'Gin', href: '/catalog?category=gin' },
  { label: 'Brandies', href: '/catalog?category=brandies' },
  { label: 'Horario', href: '/catalog?category=horario' },
  { label: 'Fine & Lux', href: '/catalog?min_price=2000' },
]

export default function Navbar() {
  const router = useRouter()
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = searchRef.current?.value.trim()
    if (!q) return
    router.push(`/catalog?search=${encodeURIComponent(q)}`)
  }

  function handleMobileSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = mobileSearchRef.current?.value.trim()
    if (!q) return
    router.push(`/catalog?search=${encodeURIComponent(q)}`)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm">
      {/* ── Row 1: Logo · Search · Fulfillment · Cart ── */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/LG-WHITE.svg"
              alt="LicorLab"
              width={88}
              height={22}
              className="h-[22px] w-auto"
              priority
            />
          </Link>

          {/* Search bar — takes center */}
          <form onSubmit={handleSearch} className="flex-1 relative min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar vinos, rones, tequilas y más..."
              className="w-full bg-surface-2 border border-border text-text-1 placeholder-text-3 text-sm pl-9 pr-4 py-2 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </form>

          {/* Fulfillment pills — desktop */}
          <div className="hidden md:flex items-stretch gap-1 shrink-0 h-9">
            <Link
              href="#"
              className="flex flex-col items-center justify-center px-3 border border-border hover:border-accent/40 transition-colors min-w-[88px]"
            >
              <Truck size={12} className="text-text-3 mb-0.5" />
              <span className="text-[10px] font-body text-text-3 leading-none">Envío Express</span>
              <span className="text-[10px] font-body text-accent font-medium leading-none mt-0.5">~30 min</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center justify-center px-3 border border-accent/50 bg-accent/10 hover:bg-accent/15 transition-colors min-w-[88px]"
            >
              <Store size={12} className="text-accent mb-0.5" />
              <span className="text-[10px] font-body text-text-2 leading-none">Pasar a Retirar</span>
              <span className="text-[10px] font-body text-accent font-medium leading-none mt-0.5">Disponible</span>
            </Link>
          </div>

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative text-text-2 hover:text-text-1 transition-colors shrink-0"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-text-1 text-primary text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden text-text-2 hover:text-text-1 transition-colors shrink-0"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Row 2: Category sub-nav — desktop ── */}
      <div className="hidden md:block bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {NAV_ITEMS.map(({ label, href, highlight }) => (
              <Link
                key={label}
                href={href}
                className={`
                  whitespace-nowrap px-4 py-2.5 text-[11px] font-body uppercase tracking-[0.12em]
                  border-b-2 border-transparent hover:border-accent hover:text-text-1
                  transition-colors shrink-0
                  ${highlight ? 'text-accent font-semibold' : 'text-text-2'}
                `}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 pb-5">
          <form onSubmit={handleMobileSearch} className="relative mt-3 mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" />
            <input
              ref={mobileSearchRef}
              type="search"
              placeholder="Buscar..."
              className="w-full bg-surface-2 border border-border text-text-1 placeholder-text-3 text-sm pl-9 pr-4 py-2 focus:outline-none focus:border-accent/50"
            />
          </form>

          <div className="flex gap-2 mb-4">
            <div className="flex-1 flex flex-col items-center py-2 border border-border text-center gap-0.5">
              <Truck size={13} className="text-text-3" />
              <span className="text-[10px] font-body text-text-3">Envío Express</span>
              <span className="text-[10px] font-body text-accent font-medium">~30 min</span>
            </div>
            <div className="flex-1 flex flex-col items-center py-2 border border-accent/50 bg-accent/10 text-center gap-0.5">
              <Store size={13} className="text-accent" />
              <span className="text-[10px] font-body text-text-2">Pasar a Retirar</span>
              <span className="text-[10px] font-body text-accent font-medium">Disponible</span>
            </div>
          </div>

          <nav className="flex flex-col">
            {NAV_ITEMS.map(({ label, href, highlight }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 text-sm font-body border-b border-border/50 last:border-0 transition-colors ${
                  highlight ? 'text-accent font-medium' : 'text-text-2 hover:text-text-1'
                }`}
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
