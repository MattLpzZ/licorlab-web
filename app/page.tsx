import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
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
    <main className="min-h-screen bg-primary">
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <HeroCarousel products={featured} />
      <FeaturedDealsSpotlight products={featured} />
      <WaysToSave />
      <BundleBanner bundles={bundles} />
      <TrendingCategories categories={categories} />
      <ShopByPrice />
      <EditorialBanner />

      <ProductCarousel
        title="Rones Destacados"
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

      <Footer />
    </main>
  )
}
