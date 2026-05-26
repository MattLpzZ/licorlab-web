'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

const TABS = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Catálogo', href: '/catalog', icon: LayoutGrid },
] as const

export default function MobileNav() {
  const pathname = usePathname()
  const { getItemCount, openCart } = useCartStore()
  const { customer, isLoggedIn } = useAuthStore()
  const count = getItemCount()

  const accountHref = isLoggedIn() ? '/account' : '/login'
  const isAccountActive = pathname === '/account' || pathname === '/login'

  const initials = customer
    ? customer.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-border">
      <div className="flex items-stretch h-16 safe-area-inset-bottom">
        {TABS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-accent' : 'text-text-3 hover:text-text-2'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-ui uppercase tracking-wide">{label}</span>
            </Link>
          )
        })}

        {/* Cart tab */}
        <button
          onClick={openCart}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-text-3 hover:text-text-2 transition-colors relative"
          aria-label="Abrir carrito"
        >
          <div className="relative">
            <ShoppingCart size={22} strokeWidth={2} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-semibold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </div>
          <span className="text-[9px] font-ui uppercase tracking-wide">Carrito</span>
        </button>

        {/* Account tab */}
        <Link
          href={accountHref}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isAccountActive ? 'text-accent' : 'text-text-3 hover:text-text-2'
          }`}
        >
          {initials ? (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-heading font-bold ${
              isAccountActive ? 'bg-accent text-white' : 'bg-surface-2 text-text-2'
            }`}>
              {initials}
            </div>
          ) : (
            <User size={22} strokeWidth={isAccountActive ? 2.5 : 2} />
          )}
          <span className="text-[9px] font-ui uppercase tracking-wide">
            {isLoggedIn() ? 'Cuenta' : 'Entrar'}
          </span>
        </Link>
      </div>
    </nav>
  )
}
