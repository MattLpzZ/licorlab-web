'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getTotal } = useCartStore()
  const total = getTotal()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 max-w-full bg-surface z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <h2 className="font-heading text-xl text-text-1 tracking-wide">Tu carrito</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="text-text-3 hover:text-text-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <p className="text-text-2 text-sm text-center">Tu carrito está vacío.</p>
            <Link
              href="/catalog"
              onClick={closeCart}
              className="text-accent text-sm hover:text-accent-light transition-colors underline underline-offset-2"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-3">
                {/* Image */}
                <div className="shrink-0 bg-surface-2 border border-border rounded-sm overflow-hidden">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={60}
                    height={80}
                    className="object-contain w-[60px] h-[80px]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="font-heading text-text-1 text-sm leading-snug line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-text-3 text-xs mt-0.5">{product.brand}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1 border border-border rounded-sm">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Reducir cantidad"
                        className="px-2 py-1 text-text-3 hover:text-text-1 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-text-1 text-xs w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="px-2 py-1 text-text-3 hover:text-text-1 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price + remove */}
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-accent text-sm font-semibold">
                        RD${(product.price * quantity).toLocaleString('es-DO')}
                      </span>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label={`Eliminar ${product.name}`}
                        className="text-text-3 hover:text-text-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-border px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-text-2 text-sm">Total</span>
              <span className="font-heading text-accent text-xl font-semibold">
                RD${total.toLocaleString('es-DO')}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-accent hover:bg-accent-light text-primary text-center text-sm font-semibold py-3 rounded-sm transition-colors"
            >
              Proceder al Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
