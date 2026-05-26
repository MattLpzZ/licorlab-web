export type CategorySlug =
  | 'rones'
  | 'vodka'
  | 'vinos'
  | 'tequila'
  | 'brandies'
  | 'gin'
  | 'horario'
  | 'bundles'

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: CategorySlug
  subcategory?: string
  price: number
  compare_at_price?: number
  volume_ml?: number
  alcohol_pct?: number
  image_url: string
  images?: string[]
  description: string
  short_description?: string
  is_featured: boolean
  is_premium: boolean
  is_bundle: boolean
  tags: string[]
  in_stock: boolean
  stock_quantity?: number
}

export interface Category {
  slug: CategorySlug
  name: string
  description?: string
  image_url: string
  product_count?: number
}

export interface Bundle {
  id: string
  slug: string
  name: string
  description: string
  image_url: string
  original_price: number
  bundle_price: number
  savings_pct: number
  products: Pick<Product, 'id' | 'name' | 'image_url'>[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderPayload {
  customer_name: string
  customer_phone: string
  customer_email: string
  delivery_address: string
  delivery_method: 'delivery' | 'pickup'
  notes?: string
  items: {
    product_id: string
    product_name: string
    quantity: number
    unit_price: number
  }[]
  subtotal: number
  total: number
}

export interface OrderConfirmation {
  order_id: string
  created_at: string
}

export interface ProductFilters {
  category?: CategorySlug
  max_price?: number
  min_price?: number
  brand?: string
  in_stock?: boolean
  is_featured?: boolean
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'name' | 'newest'
  page?: number
  per_page?: number
}
