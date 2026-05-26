import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  has: (id: string) => boolean
  remove: (id: string) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const { items } = get()
        const exists = items.some((p) => p.id === product.id)
        set({ items: exists ? items.filter((p) => p.id !== product.id) : [...items, product] })
      },
      has: (id) => get().items.some((p) => p.id === id),
      remove: (id) => set({ items: get().items.filter((p) => p.id !== id) }),
    }),
    { name: 'licorlab-wishlist' }
  )
)
