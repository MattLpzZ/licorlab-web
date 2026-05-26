import type { Metadata } from 'next'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'
import HeroBanner from '@/components/home/HeroBanner'
import PromoBanner from '@/components/home/PromoBanner'
import WaysToSave from '@/components/home/WaysToSave'
import BundleBanner from '@/components/home/BundleBanner'
import TrendingCategories from '@/components/home/TrendingCategories'
import ShopByPrice from '@/components/home/ShopByPrice'
import EditorialBanner from '@/components/home/EditorialBanner'
import ProductCarousel from '@/components/home/ProductCarousel'
import FeaturedDealsSpotlight from '@/components/home/FeaturedDealsSpotlight'
import { getFeaturedProducts, getProductsByCategory, getProductsByPriceRange } from '@/lib/api/products'
import { getCategories } from '@/lib/api/categories'
import { getBundles } from '@/lib/api/bundles'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Compra rones, vinos, tequilas y licores premium con entrega en 30 minutos en Puerto Plata. Descuentos cada semana, bundles y selección importada.',
}

export default async function HomePage() {
  const [featured, categories, bundles, rones, vinos, tequilas, ofertas] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBundles(),
    getProductsByCategory('rones'),
    getProductsByCategory('vinos'),
    getProductsByCategory('tequila'),
    getProductsByPriceRange(1000),
  ])

  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      {/* Hero — dark, alto impacto */}
      <HeroBanner />

      {/* Promo strip 1 */}
      <PromoBanner
        eyebrow="Sin código requerido"
        headline="LLEVA 6, AHORRA 10%"
        sub="Cualquier combinación de botellas. Descuento automático en el carrito."
        href="/catalog?category=bundles"
        cta="Armar mi pack"
        variant="gold"
      />

      {/* Ofertas destacadas */}
      <FeaturedDealsSpotlight products={featured} />

      {/* Formas de ahorrar */}
      <WaysToSave />

      {/* Categorías */}
      <TrendingCategories categories={categories} />

      {/* Promo strip 2 */}
      <PromoBanner
        eyebrow="Puerto Plata y zonas cercanas"
        headline="ENVÍO EN 30 MINUTOS"
        sub="Pedidos hasta las 10PM. Sin mínimo de compra para zonas selectas."
        href="/catalog"
        cta="Pedir ahora"
        variant="dark"
      />

      {/* Compra por precio */}
      <ShopByPrice />

      {/* Bundles */}
      <BundleBanner bundles={bundles} />

      {/* Carruseles por categoría */}
      <section className="bg-white">
        <ProductCarousel
          title="Popular Esta Semana"
          products={rones}
          viewAllHref="/catalog?category=rones"
        />
        <ProductCarousel
          title="Vinos de la Semana"
          products={vinos}
          viewAllHref="/catalog?category=vinos"
        />
        <ProductCarousel
          title="Tequilas Premium"
          products={tequilas}
          viewAllHref="/catalog?category=tequila"
        />
        <ProductCarousel
          title="Ofertas Bajo RD$1,000"
          products={ofertas}
          viewAllHref="/catalog?max_price=1000"
        />
      </section>

      {/* Promo strip 3 */}
      <PromoBanner
        eyebrow="Ediciones limitadas"
        headline="FINE, RARE & LUX"
        sub="La selección más exclusiva de licores de colección y ediciones especiales."
        href="/catalog?min_price=2000"
        cta="Explorar"
        variant="dark"
      />

      <EditorialBanner />
      <Footer />
    </main>
  )
}
