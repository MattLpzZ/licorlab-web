'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, LogOut, User, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'

export default function AccountPage() {
  const router = useRouter()
  const { customer, logout, isLoggedIn } = useAuthStore()
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    if (!isLoggedIn()) router.replace('/login')
  }, [isLoggedIn, router])

  if (!customer) return null

  const initials = customer.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-primary font-body">
      {/* Header */}
      <header className="border-b border-border bg-surface sticky top-0 z-40">
        <div className="max-w-site mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/LG-BLACK.svg" alt="LicorLab" width={88} height={22} className="h-[22px] w-auto" />
          </Link>
          <Link href="/catalog" className="text-text-3 hover:text-text-1 text-sm font-ui transition-colors">
            Seguir comprando →
          </Link>
        </div>
      </header>

      <main className="max-w-site mx-auto px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center shrink-0">
              <span className="text-accent font-heading font-bold text-xl">{initials}</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl text-text-1">{customer.name}</h1>
              <p className="text-text-3 text-sm font-ui">{customer.email}</p>
              {customer.phone && (
                <p className="text-text-3 text-sm font-ui">{customer.phone}</p>
              )}
            </div>
          </div>

          {/* Menu items */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden divide-y divide-border">
            <Link
              href="/wishlist"
              className="flex items-center gap-4 px-5 py-4 hover:bg-surface-2 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Heart size={17} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-text-1 font-ui font-semibold text-sm">Lista de deseos</p>
                <p className="text-text-3 text-xs font-ui">
                  {wishlistCount === 0 ? 'Sin productos guardados' : `${wishlistCount} producto${wishlistCount !== 1 ? 's' : ''} guardado${wishlistCount !== 1 ? 's' : ''}`}
                </p>
              </div>
              <ChevronRight size={16} className="text-text-3 group-hover:text-text-2 transition-colors" />
            </Link>

            <div className="flex items-center gap-4 px-5 py-4 opacity-60 cursor-default select-none">
              <div className="w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center shrink-0">
                <ShoppingBag size={17} className="text-text-3" />
              </div>
              <div className="flex-1">
                <p className="text-text-1 font-ui font-semibold text-sm">Mis pedidos</p>
                <p className="text-text-3 text-xs font-ui">Disponible próximamente</p>
              </div>
              <ChevronRight size={16} className="text-text-3" />
            </div>

            <div className="flex items-center gap-4 px-5 py-4 opacity-60 cursor-default select-none">
              <div className="w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center shrink-0">
                <User size={17} className="text-text-3" />
              </div>
              <div className="flex-1">
                <p className="text-text-1 font-ui font-semibold text-sm">Editar perfil</p>
                <p className="text-text-3 text-xs font-ui">Disponible próximamente</p>
              </div>
              <ChevronRight size={16} className="text-text-3" />
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-3 hover:text-red-500 transition-colors font-ui text-sm mt-6 mx-auto"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  )
}
