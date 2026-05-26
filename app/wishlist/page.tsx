'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'

export default function WishlistPage() {
  const { items, remove } = useWishlistStore()
  const { addItem } = useCartStore()
  const { add: addToast } = useToastStore()

  function handleAddToCart(product: (typeof items)[0]) {
    addItem(product)
    addToast(`${product.name} agregado al carrito`)
  }

  return (
    <div className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />

      <main className="max-w-site mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={22} className="text-accent fill-accent" />
          <h1 className="font-heading font-extrabold text-3xl text-text-1">Mi Lista de Deseos</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Heart size={48} className="text-border mb-4" />
            <p className="text-text-2 text-lg font-ui mb-2">Tu lista está vacía</p>
            <p className="text-text-3 text-sm mb-6">Guarda tus licores favoritos para comprarlos después.</p>
            <Link
              href="/catalog"
              className="bg-accent text-white font-ui font-semibold text-sm uppercase tracking-[0.15em] px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            <p className="text-text-3 text-sm mb-6">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  <Link href={`/products/${product.slug}`} className="relative block bg-surface-2">
                    <div className="h-52 flex items-center justify-center p-6">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={160}
                        height={200}
                        className="max-h-full w-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </Link>

                  <div className="p-4 flex flex-col flex-1 gap-1">
                    <p className="text-text-3 text-[11px] font-ui uppercase tracking-wider">{product.brand}</p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-text-1 font-ui font-semibold text-sm leading-snug line-clamp-2 hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-accent font-ui font-bold text-xl mt-auto pt-3">
                      RD${product.price.toLocaleString('es-DO')}
                    </p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.in_stock}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-text-1 text-white text-xs font-ui font-semibold rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart size={14} />
                        {product.in_stock ? 'Agregar' : 'Agotado'}
                      </button>
                      <button
                        onClick={() => remove(product.id)}
                        className="p-2.5 border border-border rounded-lg text-text-3 hover:text-red-500 hover:border-red-300 transition-colors"
                        aria-label="Eliminar de favoritos"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
