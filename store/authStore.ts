import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Customer {
  name: string
  email: string
  phone?: string
}

interface AuthStore {
  customer: Customer | null
  login: (customer: Customer) => void
  logout: () => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      customer: null,
      login: (customer) => set({ customer }),
      logout: () => set({ customer: null }),
      isLoggedIn: () => get().customer !== null,
    }),
    { name: 'licorlab-auth' }
  )
)
