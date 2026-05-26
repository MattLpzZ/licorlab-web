# LicorLab Web — Design Spec
**Date:** 2026-05-25  
**Stack:** Next.js 15 App Router + Tailwind CSS  
**Deploy target (Phase 1):** Cloudflare Pages  
**Deploy target (Phase 2):** VPS Contabo (leymaken.com) + soymatt-platform backend  

---

## 1. Objetivo

Reemplazar licorlab.com con una tienda digital de alto rendimiento inspirada en la estructura de conversión de BevMo, aplicando una estética "Lujo Silencioso": dark mode extremo, tipografía serif elegante, acento dorado cálido, cero saturación visual.

Fase 1 entrega el frontend completo con datos mock para aprobación del cliente en Cloudflare Pages.  
Fase 2 conecta el service layer al backend Laravel de soymatt-platform sin refactor.

---

## 2. Arquitectura

### Approach elegido: Service Layer + Next.js SSG

Toda interacción con datos pasa por `lib/api/`. Hoy retorna mock JSON. En producción, solo cambia la implementación interna — los componentes no se tocan.

```
licorlab-web/
├── app/
│   ├── page.tsx                        # Homepage
│   ├── catalog/
│   │   └── page.tsx                    # Catálogo con filtros
│   ├── products/
│   │   └── [slug]/page.tsx             # Detalle de producto
│   ├── checkout/
│   │   ├── page.tsx                    # Formulario de orden
│   │   └── success/page.tsx            # Confirmación
│   └── api/
│       └── checkout/route.ts           # Next.js API route → Resend email
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CartDrawer.tsx
│   │   └── AnnouncementBar.tsx
│   ├── home/
│   │   ├── HeroCarousel.tsx
│   │   ├── WaysToSave.tsx
│   │   ├── BundleBanner.tsx
│   │   ├── TrendingCategories.tsx
│   │   ├── ShopByPrice.tsx
│   │   ├── EditorialBanner.tsx
│   │   └── ProductCarousel.tsx         # Reutilizable para todos los carruseles
│   ├── catalog/
│   │   ├── FilterSidebar.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SortBar.tsx
│   ├── product/
│   │   ├── ProductCard.tsx             # Card para grids y carruseles
│   │   ├── ProductDetail.tsx
│   │   └── RelatedProducts.tsx
│   └── checkout/
│       ├── CheckoutForm.tsx
│       └── OrderSummary.tsx
├── lib/
│   ├── api/
│   │   ├── products.ts                 # getProducts, getProductBySlug, getFeatured
│   │   ├── categories.ts               # getCategories
│   │   ├── bundles.ts                  # getBundles
│   │   └── orders.ts                   # submitOrder → POST /api/checkout
│   └── mock/
│       ├── products.json               # ~40 productos de demostración
│       ├── categories.json
│       └── bundles.json
├── store/
│   └── cartStore.ts                    # Zustand — items, add, remove, clear
├── types/
│   └── index.ts                        # Product, Category, Bundle, Order interfaces
└── public/
    ├── LG-WHITE.svg
    └── LG-BLACK.svg
```

---

## 3. Design System

### Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| `bg-primary` | `#0A0A0B` | Fondo base |
| `bg-surface` | `#111113` | Cards, navbar |
| `bg-surface-2` | `#1A1A1D` | Hover, drawers, modales |
| `accent` | `#C9963F` | Precio, CTA principal, badge Premium |
| `accent-light` | `#E4B96A` | Hover del accent |
| `text-1` | `#F5F0E8` | Texto principal (crema, no blanco puro) |
| `text-2` | `#9C9589` | Labels, metadata, categorías |
| `text-3` | `#4A4540` | Placeholders, bordes |
| `border` | `#242220` | Líneas divisoras |

### Tipografía

| Rol | Fuente | Peso |
|-----|--------|------|
| Headings (H1–H3) | Cormorant Garamond | 400, 600 |
| Precios | Cormorant Garamond | 600 |
| Body / UI / Labels | Inter | 400, 500 |
| Botones | Inter | 500 |

### Principios de layout

- Border radius: `rounded-none` o `rounded-sm` (2px) — sin bordes redondeados agresivos
- Spacing entre secciones: `py-20` mínimo, `py-28` en secciones hero
- Gap en grids: `gap-6` cards, `gap-3` dentro de cards
- Imágenes: `object-contain` sobre fondo oscuro, nunca recortadas
- Accent dorado **solo en**: precios, CTA primario, badge "Premium", hover de links de categoría
- Sin gradients llamativos — máximo `bg-gradient-to-b from-black/60 to-transparent` en hero overlay

---

## 4. Tipos de datos

```typescript
// types/index.ts

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: CategorySlug
  subcategory?: string
  price: number                  // DOP
  compare_at_price?: number      // precio tachado para ofertas
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
  stock_quantity?: number        // solo visible con backend real
}

export type CategorySlug =
  | 'rones'
  | 'vodka'
  | 'vinos'
  | 'tequila'
  | 'brandies'
  | 'gin'
  | 'horario'
  | 'bundles'

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
  items: { product_id: string; product_name: string; quantity: number; unit_price: number }[]
  subtotal: number
  total: number
}

export interface OrderConfirmation {
  order_id: string
  created_at: string
}
```

---

## 5. Páginas y comportamiento

### `/` — Homepage

Secciones en orden (replicando patrón BevMo):

1. **AnnouncementBar** — texto rotativo, fondo accent oscuro
2. **Navbar** — logo izq, search central, cuenta + carrito der
3. **HeroCarousel** — "Popular este fin de semana", 4–5 productos con precio + "Agregar", auto-slide cada 5s
4. **WaysToSave** — 3 tiles editoriales: Bundle 6x10%, Ofertas activas, Fine & Lux
5. **BundleBanner** — "Lleva 6, Ahorra 10%" — banner estático con 6 productos predefinidos y descuento calculado. La mecánica de selección libre es Phase 2.
6. **TrendingCategories** — grid 4 cols desktop / 2 cols mobile, imagen representativa por categoría
7. **ShopByPrice** — 4 bloques: Bajo RD$800 · Bajo RD$2,000 · Bajo RD$4,000 · Fine & Lux
8. **EditorialBanner** — promo de temporada, imagen full-width, texto editorial grande
9. **ProductCarousel** × 4 carruseles apilados:
   - Rones Destacados
   - Vinos de la Semana
   - Tequilas Premium
   - Ofertas Bajo RD$1,000
10. **Footer**

### `/catalog` — Catálogo

- Sidebar izquierda: filtros por categoría, rango de precio (slider), marca, en stock
- Header: total de resultados + sort (Relevancia / Precio ↑↓ / Novedades)
- Grid 4 cols desktop / 2 cols mobile
- URL params: `?category=rones&price_max=2000&sort=price_asc`
- Paginación: 24 productos por página

### `/products/[slug]` — Detalle

- Imagen principal grande (60% viewport) + thumbnails
- Nombre (Cormorant), marca, precio (dorado), volumen/grados
- Botón "Añadir al carrito" + selector de cantidad
- Descripción completa
- "También te puede interesar" — 4 productos de la misma categoría

### CartDrawer — Overlay lateral (no página)

- Se abre desde cualquier "Añadir al carrito"
- Lista de items con imagen, nombre, precio, cantidad editable
- Total + CTA "Proceder al checkout"
- Persiste en localStorage via Zustand persist

### `/checkout` — Formulario de orden

Campos:
- Nombre completo (required)
- Teléfono (required, formato RD)
- Email (required)
- Método: Entrega a domicilio / Recoger en tienda
- Dirección (required si delivery)
- Notas opcionales
- Resumen de orden (readonly)
- CTA "Confirmar Pedido"

Al submit: POST a `/api/checkout/route.ts` → email al cliente + email al owner → redirect a `/checkout/success`

### `/checkout/success`

- Número de orden (generado con nanoid)
- Resumen del pedido
- "Recibirás confirmación a tu email"
- CTA "Seguir comprando"

---

## 6. API Route — Checkout

```
POST /api/checkout
Body: OrderPayload
Response: { order_id: string, created_at: string }
```

Implementación (Phase 1): Resend SDK — manda email al cliente y al owner de LicorLab.  
Implementación (Phase 2): POST al endpoint Laravel `POST /api/commerce/web-orders`.

Variables de entorno requeridas:
```env
RESEND_API_KEY=...
LICORLAB_OWNER_EMAIL=...
NEXT_PUBLIC_API_URL=        # vacío en Phase 1, apunta al VPS en Phase 2
```

---

## 7. Service Layer — Contrato de migración

```typescript
// lib/api/products.ts
// Phase 1: lee de mock JSON
// Phase 2: solo cambiar el cuerpo de estas funciones

export async function getProducts(filters?: ProductFilters): Promise<Product[]>
export async function getProductBySlug(slug: string): Promise<Product | null>
export async function getFeaturedProducts(): Promise<Product[]>
export async function getProductsByCategory(category: CategorySlug): Promise<Product[]>
export async function getProductsByPriceRange(max: number): Promise<Product[]>
```

---

## 8. Mock Data

~40 productos distribuidos:
- 8 Rones (Brugal, Barceló, Bermúdez, Macorix, importados)
- 6 Vodkas (Grey Goose, Absolut, Tito's, etc.)
- 7 Vinos (tintos, blancos, rosados)
- 5 Tequilas (blanco, reposado, añejo)
- 4 Brandies
- 4 Gins
- 3 Horario (categoría del cliente — por confirmar contenido exacto)
- 3 Bundles (Ron + mixer, Vino + copa, Fiesta pack)

Todos con precio en DOP, imagen placeholder de Unsplash (licencia libre), `is_featured` en 5, `is_premium` en 8.

---

## 9. Integración futura — Phase 2 (backend soymatt-platform)

### Endpoints nuevos necesarios en Laravel (fuera de scope Phase 1):

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/commerce/store/products` | Catálogo público — sin auth, solo activos y con stock |
| `GET /api/commerce/store/products/{slug}` | Detalle por slug |
| `GET /api/commerce/store/categories` | Lista de categorías activas |
| `POST /api/commerce/web-orders` | Crear orden web — deduce stock con locking atómico |

### Anti-overselling (Phase 2):

El `Inventory::adjustStock()` actual hace `update(['stock_quantity' => $new])` sin locking. En Phase 2 se reemplaza con:

```php
// Deducción atómica — previene race condition POS físico vs web order
DB::transaction(function() use ($inventory, $quantity, ...) {
    $locked = Inventory::where('id', $inventory->id)
        ->lockForUpdate()   // SELECT ... FOR UPDATE
        ->firstOrFail();
    
    if ($locked->stock_quantity < $quantity) {
        throw new InsufficientStockException();
    }
    
    $locked->update(['stock_quantity' => $locked->stock_quantity - $quantity]);
});
```

### Integración de pago real (Phase 3 — agendada):

Candidatos: **Azul** (dominicano, preferido), PayPal, Stripe.  
El checkout form ya tiene la estructura correcta — solo se añade el step de pago entre el form y la confirmación.  
Tabla `web_orders` se extiende con: `payment_status`, `payment_reference`, `payment_gateway`.

---

## 10. Deploy — Phase 1 (Cloudflare Pages)

```toml
# wrangler.toml / Cloudflare Pages config
build_command = "pnpm build"
output_directory = ".next"
node_version = "20"
```

Variables de entorno en Cloudflare Pages dashboard:
- `RESEND_API_KEY`
- `LICORLAB_OWNER_EMAIL`

La API route `/api/checkout` requiere `@cloudflare/next-on-pages` para correr en edge runtime.

---

## 11. Out of scope (Phase 1)

- Autenticación de usuarios / cuentas
- Historial de órdenes del cliente
- Pagos reales
- Integración con backend Laravel
- Panel admin (usa el módulo OS de soymatt-platform)
- Sistema de reseñas
- Wishlist
