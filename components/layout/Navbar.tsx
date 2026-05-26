'use client'

import { type FormEvent, useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Truck, Store, X, Heart, User, LogOut, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { searchSync, type SearchSuggestion } from '@/lib/searchSync'

const NAV_ITEMS = [
  { label: 'Ofertas', href: '/catalog?sort=price_asc', highlight: true },
  { label: 'Rones', href: '/catalog?category=rones' },
  { label: 'Vinos', href: '/catalog?category=vinos' },
  { label: 'Whisky', href: '/catalog?category=whisky' },
  { label: 'Cervezas', href: '/catalog?category=cervezas' },
  { label: 'Espumantes', href: '/catalog?category=espumantes' },
  { label: 'Licores', href: '/catalog?category=licores' },
  { label: 'Sin Alcohol', href: '/catalog?category=bebidas-sin-alcohol' },
  { label: 'Cocteles', href: '/catalog?category=cocteles-listos' },
  { label: 'Fine & Lux', href: '/catalog?min_price=3000' },
]

export default function Navbar() {
  const router = useRouter()
  const { getItemCount, openCart } = useCartStore()
  const { customer, logout, isLoggedIn } = useAuthStore()
  const itemCount = getItemCount()
  const searchRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const updateSuggestions = useCallback((q: string) => {
    const results = searchSync(q)
    setSuggestions(results)
    setDropdownOpen(results.length > 0 && q.length >= 2)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => updateSuggestions(query), 150)
    return () => clearTimeout(timer)
  }, [query, updateSuggestions])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setDropdownOpen(false)
    router.push(`/catalog?search=${encodeURIComponent(q)}`)
  }

  function handleSuggestionClick(slug: string) {
    setDropdownOpen(false)
    setQuery('')
    router.push(`/products/${slug}`)
  }

  function clearSearch() {
    setQuery('')
    setSuggestions([])
    setDropdownOpen(false)
    searchRef.current?.focus()
  }

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm">
      {/* ── Row 1: Logo · Search · Fulfillment · Actions ── */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/LG-BLACK.svg"
              alt="LicorLab"
              width={88}
              height={22}
              className="h-[22px] w-auto"
              priority
            />
          </Link>

          {/* Search with autocomplete */}
          <div ref={containerRef} className="flex-1 relative min-w-0">
            <form onSubmit={handleSearch} className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setDropdownOpen(suggestions.length > 0)}
                placeholder="Buscar vinos, rones, tequilas..."
                className="w-full bg-surface-2 border border-border text-text-1 placeholder-text-3 text-sm pl-9 pr-8 py-2 rounded-lg focus:outline-none focus:border-accent/50 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-1"
                >
                  <X size={13} />
                </button>
              )}
            </form>

            {/* Suggestions dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSuggestionClick(s.slug)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors text-left"
                  >
                    <div className="w-9 h-9 bg-surface-2 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src={s.image_url}
                        alt=""
                        width={36}
                        height={36}
                        className="w-full h-full object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-1 text-sm font-ui font-medium truncate">{s.name}</p>
                      <p className="text-text-3 text-xs font-ui">{s.brand} · RD${s.price.toLocaleString('es-DO')}</p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => handleSearch({ preventDefault: () => {} } as FormEvent<HTMLFormElement>)}
                  className="w-full px-4 py-2.5 text-xs font-ui text-accent hover:bg-surface-2 transition-colors text-left border-t border-border"
                >
                  Ver todos los resultados para &quot;{query}&quot; →
                </button>
              </div>
            )}
          </div>

          {/* Fulfillment — desktop only */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <Link href="#" className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-colors group">
              <Truck size={15} className="text-accent group-hover:text-text-1 transition-colors" />
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-ui font-semibold text-text-1">Envío Express</span>
                <span className="text-[10px] font-ui text-text-3">~30 minutos</span>
              </div>
            </Link>
            <div className="w-px h-7 bg-border" />
            <Link href="#" className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-colors group">
              <Store size={15} className="text-accent group-hover:text-text-1 transition-colors" />
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-ui font-semibold text-text-1">Pasar a Retirar</span>
                <span className="text-[10px] font-ui text-text-3">Disponible ahora</span>
              </div>
            </Link>
          </div>

          {/* Actions — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/wishlist"
              aria-label="Lista de deseos"
              className="relative text-text-2 hover:text-text-1 transition-colors"
            >
              <Heart size={20} />
            </Link>

            {/* User menu */}
            <div ref={userMenuRef} className="relative">
              {isLoggedIn() && customer ? (
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-label="Mi cuenta"
                  className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-heading font-bold text-xs hover:bg-accent/20 transition-colors"
                >
                  {customer.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                </button>
              ) : (
                <Link
                  href="/login"
                  aria-label="Iniciar sesión"
                  className="flex items-center gap-1.5 text-text-2 hover:text-text-1 transition-colors text-sm font-ui"
                >
                  <User size={20} />
                  <span className="hidden lg:inline">Entrar</span>
                </Link>
              )}

              {/* Dropdown */}
              {userMenuOpen && customer && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-text-1 font-ui font-semibold text-sm truncate">{customer.name}</p>
                    <p className="text-text-3 text-xs font-ui truncate">{customer.email}</p>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors text-text-2 hover:text-text-1"
                  >
                    <User size={14} />
                    <span className="text-sm font-ui">Mi cuenta</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors text-text-2 hover:text-text-1"
                  >
                    <Heart size={14} />
                    <span className="text-sm font-ui">Lista de deseos</span>
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors text-text-2 hover:text-text-1 opacity-50 cursor-default pointer-events-none"
                  >
                    <Package size={14} />
                    <span className="text-sm font-ui">Mis pedidos</span>
                  </Link>
                  <div className="border-t border-border">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); router.push('/') }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-text-3 hover:text-red-500"
                    >
                      <LogOut size={14} />
                      <span className="text-sm font-ui">Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative text-text-2 hover:text-text-1 transition-colors"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-text-1 text-primary text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Category sub-nav — desktop only ── */}
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
    </header>
  )
}
